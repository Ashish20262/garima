const productImages = import.meta.glob('../assets/products/*.jpg', { eager: true, import: 'default' })

const demoProduct = (id, name, gender, category, price, sizes, description, tone) => ({
	id, name, gender, category, price, sizes, description, tone, demo: true,
	image: productImages[`../assets/products/${id}.jpg`],
})

export const products = [
	demoProduct('men-jeans-01', 'Indigo Straight Jeans', 'Men', 'Jeans', 3290, ['30', '32', '34', '36'], 'A clean straight-leg denim shape, shown here as a GARIMA sample concept.', 'navy'),
	demoProduct('men-jeans-02', 'Deep Rinse Slim Jeans', 'Men', 'Jeans', 3490, ['30', '32', '34', '36'], 'A dark rinse and streamlined cut for a polished everyday denim concept.', 'midnight'),
	demoProduct('men-jeans-03', 'Classic Tapered Jeans', 'Men', 'Jeans', 3190, ['30', '32', '34', '36'], 'A tapered silhouette with a versatile mid-indigo sample wash.', 'gold'),
	demoProduct('men-jeans-04', 'Washed Blue Relaxed Jeans', 'Men', 'Jeans', 3390, ['30', '32', '34', '36'], 'An easy relaxed fit in a softly washed blue demo finish.', 'ivory'),
	demoProduct('men-jeans-05', 'Midnight Black Jeans', 'Men', 'Jeans', 3590, ['30', '32', '34', '36'], 'A dark, understated denim concept with a straight profile.', 'midnight'),
	demoProduct('men-tee-01', 'Navy Essential T-shirt', 'Men', 'T-shirts', 1290, ['S', 'M', 'L', 'XL'], 'A minimal crew-neck tee concept in GARIMA navy.', 'navy'),
	demoProduct('men-tee-02', 'Ivory Cotton T-shirt', 'Men', 'T-shirts', 1190, ['S', 'M', 'L', 'XL'], 'A clean ivory crew-neck sample, styled for everyday layering.', 'ivory'),
	demoProduct('men-tee-03', 'Antique Gold Graphic T-shirt', 'Men', 'T-shirts', 1490, ['S', 'M', 'L', 'XL'], 'A muted gold-toned graphic tee concept with a restrained finish.', 'gold'),
	demoProduct('men-shirt-01', 'Navy Oxford Shirt', 'Men', 'Shirts', 2790, ['S', 'M', 'L', 'XL'], 'A crisp button-front shirt concept in deep navy.', 'navy'),
	demoProduct('men-shirt-02', 'Ivory Linen-Blend Shirt', 'Men', 'Shirts', 2990, ['S', 'M', 'L', 'XL'], 'An airy ivory button-front sample with a relaxed smart-casual feel.', 'ivory'),
	demoProduct('women-jeans-01', 'High-Rise Indigo Straight Jeans', 'Women', 'Jeans', 3290, ['26', '28', '30', '32'], 'A high-rise straight-leg denim concept in classic indigo.', 'navy'),
	demoProduct('women-jeans-02', 'Dark Wash Slim Jeans', 'Women', 'Jeans', 3490, ['26', '28', '30', '32'], 'A streamlined dark-wash sample with a clean ankle line.', 'midnight'),
	demoProduct('women-jeans-03', 'Vintage Blue Mom Jeans', 'Women', 'Jeans', 3390, ['26', '28', '30', '32'], 'A vintage-inspired relaxed denim concept in washed blue.', 'gold'),
	demoProduct('women-jeans-04', 'Ecru Straight Jeans', 'Women', 'Jeans', 3590, ['26', '28', '30', '32'], 'A warm ecru denim sample with a versatile straight leg.', 'ivory'),
	demoProduct('women-jeans-05', 'Black Wide-Leg Jeans', 'Women', 'Jeans', 3690, ['26', '28', '30', '32'], 'A wide-leg dark denim concept with a refined drape.', 'midnight'),
	demoProduct('women-tee-01', 'Ivory Everyday T-shirt', 'Women', 'T-shirts', 1190, ['XS', 'S', 'M', 'L'], 'A soft-looking ivory crew-neck sample for effortless layering.', 'ivory'),
	demoProduct('women-tee-02', 'Navy Rib T-shirt', 'Women', 'T-shirts', 1390, ['XS', 'S', 'M', 'L'], 'A neat rib-texture tee concept in deep GARIMA navy.', 'navy'),
	demoProduct('women-tee-03', 'Muted Gold Scoop-Neck T-shirt', 'Women', 'T-shirts', 1290, ['XS', 'S', 'M', 'L'], 'A warm neutral scoop-neck sample with a simple finish.', 'gold'),
	demoProduct('women-oversized-tee-01', 'Ivory Oversized T-shirt', 'Women', 'Oversized T-shirts', 1590, ['S', 'M', 'L', 'XL'], 'A roomy ivory tee concept with an easy dropped-shoulder shape.', 'ivory'),
	demoProduct('women-oversized-tee-02', 'Navy Oversized T-shirt', 'Women', 'Oversized T-shirts', 1690, ['S', 'M', 'L', 'XL'], 'A relaxed navy oversized tee sample with a clean crew neck.', 'navy'),
]
