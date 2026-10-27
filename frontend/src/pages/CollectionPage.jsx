import { useEffect, useMemo, useState } from 'react'
import { products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { EmptyState } from '../components/ui.jsx'

export default function CollectionPage({ gender, openView, onProduct, onWishlist, wishlist }) {
  const [sort, setSort] = useState('featured')
  const [filter, setFilter] = useState(gender)
  const [category, setCategory] = useState('All')
  useEffect(() => { setFilter(gender); setCategory('All') }, [gender])
  const categories = useMemo(() => [...new Set(products.filter((p) => filter === 'All' || p.gender === filter).map((p) => p.category))], [filter])
  const shown = useMemo(() => products.filter((p) => (filter === 'All' || p.gender === filter) && (category === 'All' || p.category === category)).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0), [filter, category, sort])
  return <main className="view shell"><button className="back-link" onClick={() => openView('home')}>&larr; Back to home</button><p className="kicker">GARIMA sample collection</p><h1>{filter === 'All' ? 'New arrivals' : `${filter}'s collection`}</h1><p className="view-intro">Demo products only — no live inventory, purchasing, or fulfilment is connected.</p><div className="collection-tools"><fieldset><legend className="sr-only">Filter by collection</legend>{['All', 'Men', 'Women'].map((item) => <button className={filter === item ? 'selected' : ''} onClick={() => { setFilter(item); setCategory('All') }} key={item}>{item}</button>)}</fieldset><fieldset><legend className="sr-only">Filter by product type</legend>{['All', ...categories].map((item) => <button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</fieldset><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><p className="collection-count">{shown.length} demo products</p>{shown.length ? <div className="product-grid">{shown.map((product) => <ProductCard product={product} key={product.id} onOpen={onProduct} onWishlist={onWishlist} isWishlisted={wishlist.includes(product.id)} />)}</div> : <EmptyState title="Nothing matches this edit" copy="Try another collection filter." />}</main>
}