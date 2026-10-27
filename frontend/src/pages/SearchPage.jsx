import { useState } from 'react'
import { products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { EmptyState, Icon } from '../components/ui.jsx'

export default function SearchPage({ openView, onProduct, onWishlist, wishlist }) {
  const [query, setQuery] = useState('')
  const term = query.trim().toLowerCase()
  const found = products.filter((p) => [p.name, p.gender, p.category, p.description].some((value) => value.toLowerCase().includes(term)))
  return <main className="view shell"><button className="back-link" onClick={() => openView('home')}>&larr; Back to home</button><h1>Search</h1><label className="search-field"><span className="sr-only">Search demo products by name, collection, or type</span><Icon name="search" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the demo collection" /></label>{query && <p className="collection-count">{found.length} matching demo products</p>}{query && (found.length ? <div className="product-grid">{found.map((product) => <ProductCard product={product} key={product.id} onOpen={onProduct} onWishlist={onWishlist} isWishlisted={wishlist.includes(product.id)} />)}</div> : <EmptyState title="No matching products" copy="Try a product name, collection, or type such as “Jeans” or “Women” ." />)}</main>
}