import { products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { EmptyState } from '../components/ui.jsx'

export default function WishlistPage({ openView, onProduct, onWishlist, wishlist }) { const items = products.filter((p) => wishlist.includes(p.id)); return <main className="view shell"><button className="back-link" onClick={() => openView('home')}>← Back to home</button><h1>Wishlist</h1>{items.length ? <div className="product-grid">{items.map((product) => <ProductCard product={product} key={product.id} onOpen={onProduct} onWishlist={onWishlist} isWishlisted />)}</div> : <EmptyState title="Your wishlist is waiting" copy="Save a demo piece to see it here." action={{ label: 'Explore new arrivals', onClick: () => openView('collection', 'All') }} />}</main> }
