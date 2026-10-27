import { randomUUID } from 'node:crypto'

export function createCodOrder(order, idempotencyKey) {
	const now = new Date()
	return {
		orderId: `GR-${randomUUID().toUpperCase()}`,
		idempotencyKey,
		paymentMethod: 'cod',
		status: 'confirmed',
		amount: order.total,
		total: order.total,
		subtotal: order.subtotal,
		shipping: order.shipping,
		currency: 'INR',
		items: order.items,
		customer: order.customer,
		persistence: 'mongodb',
		createdAt: now,
		updatedAt: now,
	}
}

export function formatCodOrder(order, duplicate = false) {
	const { _id, idempotencyKey, ...publicOrder } = order
	return duplicate ? { ...publicOrder, duplicate: true } : publicOrder
}
