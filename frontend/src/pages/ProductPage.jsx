import { useEffect, useState } from 'react'
import { formatPrice } from '../utils/formatPrice.js'
import { ProductVisual } from '../components/ProductCard.jsx'
import { Icon } from '../components/ui.jsx'

export default function ProductPage({ product, openView, addToBag, onWishlist, isWishlisted }) {
  const [size, setSize] = useState(product.sizes[0])
  useEffect(() => setSize(product.sizes[0]), [product.id])
  return <main className="view shell"><button className="back-link" onClick={() => openView('collection', product.gender)}>&larr; Back to collection</button><div className="detail-grid"><ProductVisual product={product} /><section className="detail-copy"><p className="kicker">{product.gender} · {product.category} · AI-generated demo sample</p><h1>{product.name}</h1><strong className="detail-price">{formatPrice(product.price)}</strong><p>{product.description}</p><fieldset className="sizes"><legend>Choose a demo size</legend><div>{product.sizes.map((item) => <button className={size === item ? 'selected' : ''} onClick={() => setSize(item)} key={item} aria-pressed={size === item}>{item}</button>)}</div></fieldset><button className="button button-dark" onClick={() => addToBag(product, size)}>Add to bag <Icon name="bag" size={18} /></button><button className="detail-wishlist" onClick={() => onWishlist(product.id)}><Icon name="heart" size={18} /> {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</button><p className="demo-note">AI-generated demo image; this sample is not verified inventory. Bag interactions are for preview only, and checkout cannot place orders or take payments.</p></section></div></main>
}