import express from 'express'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

export function createApp(codOrders) {
	const app = express()
	app.locals.codOrders = codOrders
	app.use(express.json())
	app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'garima-clothing-backend' }))
	app.use('/api/orders', orderRoutes)
	app.use('/api/payments', paymentRoutes)
	return app
}
