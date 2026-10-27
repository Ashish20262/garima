import { formatCodOrder } from '../models/order.js'
import { calculateOrderPricing, findCodOrder, saveCodOrder } from '../services/orderService.js'
import { validateOrder } from '../validators/orderValidator.js'

export async function createCodOrder(request, response) {
	const idempotencyKey = request.get('Idempotency-Key')
	if (!idempotencyKey || idempotencyKey.length > 100) return response.status(400).json({ error: 'A valid Idempotency-Key header is required.' })

	const validatedOrder = validateOrder(request.body)
	if (validatedOrder.error) return response.status(400).json({ error: validatedOrder.error })
	const order = calculateOrderPricing(validatedOrder)
	try {
		const result = await saveCodOrder(request.app.locals.codOrders, order, idempotencyKey)
		return result.duplicate
			? response.json(formatCodOrder(result.order, true))
			: response.status(201).json(formatCodOrder(result.order))
	} catch (error) {
		if (error?.code === 11000) {
			try {
				const existing = await findCodOrder(request.app.locals.codOrders, idempotencyKey)
				if (existing) return response.json(formatCodOrder(existing, true))
			} catch {
				console.error('MongoDB could not retrieve an existing COD order after an idempotency conflict.')
				return response.status(503).json({ error: 'Your order could not be confirmed because the order database is temporarily unavailable. Please retry.' })
			}
		}
		console.error('MongoDB failed to save a COD order. Check database availability.')
		return response.status(503).json({ error: 'Your order could not be confirmed because it was not saved. Please retry.' })
	}
}
