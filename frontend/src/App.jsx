import { useEffect, useState } from 'react'
import { products } from './data/products.js'
import { readStored, readCart } from './utils/storage.js'
import HomePage from './pages/HomePage.jsx'
import CollectionPage from './pages/CollectionPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import BagPage from './pages/BagPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import { StoreHeader, StoreFooter } from './layouts/StoreLayout.jsx'

function App() {
  const [view, setView] = useState('home')
  const [data, setData] = useState(null)
  const [wishlist, setWishlist] = useState(() => readStored('garima-wishlist'))
  const [cart, setCart] = useState(readCart)

  useEffect(() => localStorage.setItem('garima-wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => localStorage.setItem('garima-bag', JSON.stringify(cart)), [cart])

  const openView = (next, nextData = null) => { setView(next); setData(nextData); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const onWishlist = (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const addToBag = (product, size) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id && item.size === size)
      return found ? items.map((item) => item === found ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item) : [...items, { id: product.id, size, quantity: 1 }]
    })
    openView('bag')
  }
  const updateCart = (id, size, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return
    setCart((items) => items.map((item) => item.id === id && item.size === size ? { ...item, quantity } : item))
  }
  const removeCart = (id, size) => setCart((items) => items.filter((item) => !(item.id === id && item.size === size)))
  const bagCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const onOrderConfirmed = (order) => { setCart([]); openView('confirmation', order) }
  const shared = { openView, onProduct: (product) => openView('product', product), onWishlist, wishlist }

  let content = <HomePage {...shared} />
  if (view === 'collection') content = <CollectionPage {...shared} gender={data || 'All'} />
  if (view === 'product') content = <ProductPage product={data} openView={openView} addToBag={addToBag} onWishlist={onWishlist} isWishlisted={wishlist.includes(data.id)} />
  if (view === 'search') content = <SearchPage {...shared} />
  if (view === 'account') content = <AccountPage openView={openView} />
  if (view === 'wishlist') content = <WishlistPage {...shared} />
  if (view === 'bag') content = <BagPage openView={openView} cart={cart} updateCart={updateCart} removeCart={removeCart} />
  if (view === 'checkout') content = <CheckoutPage openView={openView} cart={cart} onOrderConfirmed={onOrderConfirmed} />
  if (view === 'confirmation') content = <OrderConfirmationPage order={data} openView={openView} />
  if (view === 'info') content = <InfoPage kind={data} openView={openView} />

  return <><StoreHeader goHome={() => openView('home')} openView={openView} wishlistCount={wishlist.length} bagCount={bagCount} />{content}<StoreFooter openView={openView} /></>
}

export default App

