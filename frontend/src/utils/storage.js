import { products } from '../data/products.js'

export const readStored = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key)) || []
	} catch {
		return []
	}
}

export const readCart = () => Array.isArray(readStored('garima-bag'))
	? readStored('garima-bag')
		.filter((entry) => entry && products.some((product) => product.id === entry.id) && typeof entry.size === 'string')
		.map((entry) => ({ ...entry, quantity: Math.min(10, Math.max(1, Math.floor(Number(entry.quantity) || 1))) }))
	: []
