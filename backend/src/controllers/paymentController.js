import { validateOrder } from '../validators/orderValidator.js'
import { calculateOrderPricing } from '../services/orderService.js'
import {
	createRazorpayTestOrder,
	findOnlineOrderByIdempotencyKey,
	getRazorpayCredentials,
	verifyRazorpayTestPayment,
} from '../services/razorpayService.js'

export async function createRazorpayOrder(request, response) {
	const credentials = getRazorpayCredentials()
	if (!credentials) return response.status(503).json({ error: 'Razorpay test mode is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the backend.' })
	const idempotencyKey = request.get('Idempotency-Key')
	if (!idempotencyKey || idempotencyKey.length > 100) return response.status(400).json({ error: 'A valid Idempotency-Key header is required.' })
	const validatedOrder = validateOrder(request.body)
	if (validatedOrder.error) return response.status(400).json({ error: validatedOrder.error })
	const existing = findOnlineOrderByIdempotencyKey(idempotencyKey)
	if (existing) return response.json({ keyId: credentials.keyId, orderId: existing.gatewayOrderId, amount: existing.total * 100, currency: 'INR', duplicate: true })

	const order = calculateOrderPricing(validatedOrder)
	try {
		const result = await createRazorpayTestOrder(credentials, order, idempotencyKey)
		return response.status(201).json(result)
	} catch {
		return response.status(502).json({ error: 'Razorpay could not create a test order. Your bag is unchanged; please retry.' })
	}
}

export async function verifyRazorpayPayment(request, response) {
	const credentials = getRazorpayCredentials()
	if (!credentials) return response.status(503).json({ error: 'Razorpay test mode is not configured on the backend.' })
	const { razorpay_order_id: gatewayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = request.body || {}
	const result = await verifyRazorpayTestPayment(credentials, { gatewayOrderId, paymentId, signature })
	return response.status(result.status).json(result.body)
}
