import { MongoClient } from 'mongodb'
// const mongoose = require("mongoose")
// const dns = require('dns').promises
// dns.setServers(["8.8.8.8","8.8.4.4"])
function safeMongoErrorMessage(error, uri) {
	let message = typeof error?.message === 'string' ? error.message : 'Unknown MongoDB error.'
	const secrets = new Set([uri])
	try {
		const parsed = new URL(uri)
		for (const value of [parsed.username, parsed.password]) {
			if (value) {
				secrets.add(value)
				secrets.add(decodeURIComponent(value))
			}
		}
	} catch {
	}
	for (const secret of secrets) {
		if (secret) message = message.split(secret).join('[redacted]')
	}
	return message.replace(/mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi, '[MongoDB URI redacted]')
}

export async function connectDatabase() {
	const uri = process.env.MONGODB_URI?.trim()
	if (!uri) {
		if (process.env.MONGOOSE_URI) {
			console.error('MongoDB is not configured. Use the variable name MONGODB_URI in backend/.env; MONGOOSE_URI is not read by this backend.')
		} else {
			console.error('MongoDB is not configured. Set MONGODB_URI in backend/.env before starting the backend.')
		}
		process.exitCode = 1
		return null
	}
	if (/<(?:username|password|cluster-host)>|your_(?:username|password|cluster)/i.test(uri)) {
		console.error('MongoDB URI still contains template placeholders. Replace them with your Atlas connection details in backend/.env; do not put credentials in source code.')
		process.exitCode = 1
		return null
	}

	let client
	let stage = 'connection'
	try {
		client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 })
		await client.connect()
		stage = 'database initialization'
		const database = client.db(process.env.MONGODB_DB_NAME || 'garima')
		const codOrders = database.collection('codOrders')
		stage = 'order index initialization'
		await codOrders.createIndex({ orderId: 1 }, { unique: true })
		await codOrders.createIndex({ idempotencyKey: 1 }, { unique: true })
		return { client, codOrders }
	} catch (error) {
		const code = error?.code ?? error?.codeName ?? error?.name ?? 'UNKNOWN'
		console.error(`MongoDB ${stage} failed [${code}]: ${safeMongoErrorMessage(error, uri)}`)
		if (client) await client.close()
		process.exitCode = 1
		return null
	}
}
