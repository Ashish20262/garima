import { infoContent } from '../data/infoContent.js'

export default function InfoPage({ kind, openView }) { const [title, copy] = infoContent[kind] || infoContent.story; return <main className="view narrow"><button className="back-link" onClick={() => openView('home')}>← Back to home</button><p className="kicker">GARIMA information</p><h1>{title}</h1><p className="view-intro">{copy}</p></main> }
