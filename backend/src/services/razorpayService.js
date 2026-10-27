import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import Razorpay from 'razorpay'

const onlineOrders = new Map()
const onlineIdempotencyKeys = new Map()

export function getRazorpayCredentials() {
	const keyId = process.env.RAZORPAY_KEY_ID
	const keySecret = process.env.RAZORPAY_KEY_SECRET
	if (!keyId || !keySecret || !keyId.startsWith('rzp_test_')) return null
	return { keyId, keySecret, client: new Razorpay({ key_id: keyId, key_secret: keySecret }) }
}

export function findOnlineOrderByIdempotencyKey(idempotencyKey) {
	const previousOrderId = onlineIdempotencyKeys.get(idempotencyKey)
	return previousOrderId ? onlineOrders.get(previousOrderId) : undefined
}

export async function createRazorpayTestOrder(credentials, order, idempotencyKey) {
	const localOrderId = `GR-${randomUUID().slice(0, 8).toUpperCase()}`
	const gatewayOrder = await credentials.client.orders.create({ amount: order.total * 100, currency: 'INR', receipt: localOrderId })
	onlineOrders.set(gatewayOrder.id, { localOrderId, gatewayOrderId: gatewayOrder.id, total: order.total, items: order.items, customer: order.customer, status: 'pending' })
	onlineIdempotencyKeys.set(idempotencyKey, gatewayOrder.id)
	return { keyId: credentials.keyId, orderId: gatewayOrder.id, amount: gatewayOrder.amount, currency: gatewayOrder.currency }
}

export async function verifyRazorpayTestPayment(credentials, { gatewayOrderId, paymentId, signature }) {
	const order = onlineOrders.get(gatewayOrderId)
	if (!order || typeof paymentId !== 'string' || !/^[a-f0-9]{64}$/i.test(signature || '')) {
		return { status: 400, body: { error: 'Payment details are invalid or the order has expired.' } }
	}
	if (order.status === 'paid' && order.paymentId !== paymentId) {
		return { status: 409, body: { error: 'This order has already been paid with a different payment.' } }
	}

	const expectedSignature = createHmac('sha256', credentials.keySecret).update(`${gatewayOrderId}|${paymentId}`).digest()
	const receivedSignature = Buffer.from(signature, 'hex')
	if (receivedSignature.length !== expectedSignature.length || !timingSafeEqual(receivedSignature, expectedSignature)) {
		return { status: 400, body: { error: 'Payment signature verification failed. Your bag is unchanged.' } }
	}

	try {
		const payment = await credentials.client.payments.fetch(paymentId)
		if (payment.order_id !== gatewayOrderId || payment.amount !== order.total * 100 || payment.currency !== 'INR' || payment.status !== 'captured') {
			return { status: 409, body: { error: 'Payment is not confirmed as captured. Your bag is unchanged.' } }
		}
		order.status = 'paid'
		order.paymentId = paymentId
		return {
			status: 200,
			body: { orderId: order.localOrderId, paymentMethod: 'razorpay-test', status: 'paid', amount: order.total, currency: 'INR', persistence: 'memory-only' },
		}
	} catch {
		return { status: 502, body: { error: 'Payment could not be verified with Razorpay. Your bag is unchanged; retry verification.' } }
	}
}
