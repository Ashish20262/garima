import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { connectDatabase } from './src/config/db.js'
import { createApp } from './src/app.js'

dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })

const port = process.env.PORT || 5000

async function startServer() {
	const database = await connectDatabase()
	if (!database) return

	const app = createApp(database.codOrders)
	const server = app.listen(port, () => console.log(`GARIMA backend listening on http://localhost:${port}`))
	const shutdown = () => server.close(() => { void database.client.close() })
	process.once('SIGINT', shutdown)
	process.once('SIGTERM', shutdown)
}

void startServer()
