import { products } from '../models/productCatalog.js'

export function validateOrder(requestBody) {
	const { items, customer } = requestBody || {}
	if (!Array.isArray(items) || items.length < 1 || items.length > 20) return { error: 'Your bag is empty or contains too many items.' }
	if (items.some((item) => typeof item?.id === 'string' && products[item.id]?.demo)) return { error: 'Checkout is a demo. These sample products cannot be ordered or paid for until the real catalog is verified.' }
	if (!customer || typeof customer !== 'object' || Array.isArray(customer)) return { error: 'Enter your delivery details.' }

	const fieldLimits = { name: 120, email: 254, phone: 16, address: 200, city: 100, state: 100, pincode: 6 }
	const cleanCustomer = Object.fromEntries(Object.entries(fieldLimits).map(([field]) => [field, typeof customer[field] === 'string' ? customer[field].trim() : '']))
	if (Object.entries(fieldLimits).some(([field, maxLength]) => !cleanCustomer[field] || cleanCustomer[field].length > maxLength)) return { error: 'Complete all delivery details using valid values.' }
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanCustomer.email) || cleanCustomer.email.length > 254) return { error: 'Enter a valid email address.' }
	if (!/^(?:\+91[- ]?)?[6-9]\d{9}$/.test(cleanCustomer.phone.replace(/\s/g, ''))) return { error: 'Enter a valid Indian mobile number.' }
	if (!/^\d{6}$/.test(cleanCustomer.pincode)) return { error: 'Enter a valid six-digit PIN code.' }

	const validatedItems = []
	for (const item of items) {
		const product = typeof item?.id === 'string' && Object.hasOwn(products, item.id) ? products[item.id] : undefined
		const quantity = item?.quantity
		if (!product || !product.sizes.includes(item?.size) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
			return { error: 'Your bag contains an invalid product, size, or quantity. Please review it and try again.' }
		}
		validatedItems.push({ id: item.id, name: product.name, size: item.size, quantity, unitPrice: product.price })
	}
	return { customer: cleanCustomer, items: validatedItems }
}
