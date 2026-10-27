import { formatPrice } from '../utils/formatPrice.js'
import { Icon } from '../components/ui.jsx'

export default function OrderConfirmationPage({ order, openView }) {
  if (order?.demo) return <main className="view narrow order-confirmation"><p className="kicker">DEMO COD simulation complete</p><h1>Thank you.</h1><p>Simulated cash-on-delivery checkout reference <strong>{order.orderId}</strong> for {formatPrice(order.amount)}.</p><p className="storage-notice">This is a presentation only confirmation. No real order was placed, no payment was taken, and no customer details were sent or saved.</p><button className="button button-dark" onClick={() => openView('home')}>Continue shopping <Icon name="arrow" size={18} /></button></main>
  const paymentLabel = order.paymentMethod === 'cod' ? 'cash-on-delivery' : 'Razorpay test-mode'
  const storageNotice = order.paymentMethod === 'cod' ? 'Your order has been saved to MongoDB.' : 'This Razorpay test confirmation is held in server memory only and can be lost if the server restarts.'
  return <main className="view narrow order-confirmation"><p className="kicker">Order confirmed</p><h1>Thank you.</h1><p>Your {paymentLabel} order <strong>{order.orderId}</strong> has been accepted for {formatPrice(order.amount)}.</p><p className="storage-notice">{storageNotice}</p><button className="button button-dark" onClick={() => openView('home')}>Continue shopping <Icon name="arrow" size={18} /></button></main>
}
