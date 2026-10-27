import express from 'express'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

function getAllowedOrigins() {
	const configured = process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim().replace(/\/+$/, '')).filter(Boolean)
	if (configured?.length) return new Set(configured)
	return process.env.NODE_ENV === 'production' ? new Set() : new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])
}

export function createApp(codOrders) {
	const app = express()
	const allowedOrigins = getAllowedOrigins()
	app.locals.codOrders = codOrders
	app.use((request, response, next) => {
		const origin = request.get('Origin')
		if (origin && allowedOrigins.has(origin)) {
			response.setHeader('Access-Control-Allow-Origin', origin)
			response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
			response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key')
			response.vary('Origin')
		}
		if (request.method === 'OPTIONS') return response.sendStatus(!origin || allowedOrigins.has(origin) ? 204 : 403)
		next()
	})
	app.use(express.json({ limit: '16kb' }))
	app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'garima-clothing-backend' }))
	app.use('/api/orders', orderRoutes)
	app.use('/api/payments', paymentRoutes)
	return app
}
