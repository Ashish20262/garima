import { useState } from 'react'
import { Icon } from '../components/ui.jsx'

export default function AccountPage({ openView }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const submit = (event) => {
    event.preventDefault()
    if (!validEmail || !password) { setMessage(!validEmail ? 'Enter a valid email address.' : 'Enter a password to continue.'); return }
    setPassword('')
    setMessage('Your details are valid. This demo does not sign you in or create an account.')
  }
  const switchMode = () => { setMode((current) => current === 'login' ? 'register' : 'login'); setMessage(''); setPassword('') }
  return <main className="view narrow"><button className="back-link" onClick={() => openView('home')}>← Back to home</button><p className="kicker">Demo account</p><h1>{mode === 'login' ? 'Welcome to GARIMA' : 'Create a demo account'}</h1><p className="view-intro">This is a visual-only account screen. Email and password inputs are validated only in this form and are never sent, logged, or stored.</p><form className="demo-form" noValidate onSubmit={submit}><label htmlFor="account-email">Email<input id="account-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(message && !validEmail)} /></label><label htmlFor="account-password">Password<input id="account-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} aria-invalid={Boolean(message && !password)} /></label>{message && <p className="account-message" role="status">{message}</p>}<button className="button button-dark" type="submit">{mode === 'login' ? 'Validate demo sign-in fields' : 'Validate demo registration fields'} <Icon name="arrow" /></button></form>{message.startsWith('Your details are valid.') ? <button className="text-link" onClick={() => openView('home')}>Return to store <Icon name="arrow" size={17} /></button> : <button className="text-link" onClick={switchMode}>{mode === 'login' ? 'Create a demo account' : 'Back to demo login'} <Icon name="arrow" size={17} /></button>}</main>
}
