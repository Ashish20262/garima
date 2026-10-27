import { createCodOrder } from '../models/order.js'

export function calculateOrderPricing(order) {
	const subtotal = order.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
	const shipping = subtotal >= 5000 ? 0 : 199
	return { ...order, subtotal, shipping, total: subtotal + shipping }
}

export async function saveCodOrder(codOrders, order, idempotencyKey) {
	const existing = await codOrders.findOne({ idempotencyKey })
	if (existing) return { order: existing, duplicate: true }

	const created = createCodOrder(order, idempotencyKey)
	await codOrders.insertOne(created)
	return { order: created, duplicate: false }
}

export async function findCodOrder(codOrders, idempotencyKey) {
	return codOrders.findOne({ idempotencyKey })
}
