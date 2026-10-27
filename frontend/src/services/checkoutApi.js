export async function createCheckoutOrder({ online, cart, customer, idempotencyKey }) {
	const response = await fetch(online ? '/api/payments/razorpay/order' : '/api/orders/cod', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
		body: JSON.stringify({ items: cart.map(({ id, size, quantity }) => ({ id, size, quantity })), customer }),
	})
	const result = await response.json()
	if (!response.ok) throw new Error(result.error || 'We could not create your order. Please try again.')
	return result
}

export async function verifyRazorpayPayment(payment) {
	const response = await fetch('/api/payments/razorpay/verify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payment),
	})
	const verifiedOrder = await response.json()
	if (!response.ok) throw new Error(verifiedOrder.error || 'Payment is not verified. Your bag is unchanged.')
	return verifiedOrder
}
