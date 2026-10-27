import heroImage from '../assets/garima-casualwear-hero.png'
import { Icon } from './ui.jsx'

export function Hero({ onShop }) { return <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}><div className="hero-content shell"><p className="kicker">Modern casualwear · 2026</p><h1>Made for the<br />moment.</h1><p className="hero-copy">Modern jeans, premium T-shirts and relaxed layers for every day.</p><button className="button button-light" onClick={() => onShop('All')}>Shop now <Icon name="arrow" size={18} /></button></div></section> }
export function CategoryCard({ title, copy, className, onOpen }) { return <button className={`category-card ${className}`} onClick={onOpen}><div><p className="kicker">The collection</p><h2>{title}</h2><span>Explore the edit <Icon name="arrow" size={17} /></span></div><p className="category-copy">{copy}</p></button> }
