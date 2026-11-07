import React, { createContext, useContext, useMemo, useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown, Clock3, Heart,
  Leaf, MapPin, Menu, PackageCheck, Plus, Search, ShieldCheck, Sparkles,
  Truck, Users, Utensils, X, LayoutDashboard, LogOut, Bell, HandHeart,
  CalendarDays, Filter, CircleHelp, Sprout, Recycle, Building2
} from 'lucide-react'
import { initialDonations, impactStats } from './data'

const DonationContext = createContext(null)
const useDonations = () => useContext(DonationContext)

function App() {
  const [donations, setDonations] = useState(initialDonations)
  const [requests, setRequests] = useState([])
  const [toast, setToast] = useState('')
  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__toastTimer)
    window.__toastTimer = window.setTimeout(() => setToast(''), 2800)
  }
  const value = useMemo(() => ({ donations, setDonations, requests, setRequests, notify }), [donations, requests])
  return (
    <DonationContext.Provider value={value}>
      <div className="app-shell">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food" element={<FoodListings />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/ngo" element={<NgoDashboard />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <AnimatePresence>
          {toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}><CheckCircle2 size={18} />{toast}</motion.div>}
        </AnimatePresence>
      </div>
    </DonationContext.Provider>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  React.useEffect(() => setOpen(false), [location.pathname])
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark"><Sprout size={22} /></span>
          <span><strong>zero waste</strong><small>WARRIORS</small></span>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/food">Find food</NavLink>
          <a href="/#how-it-works">How it works</a>
          <a href="/#impact">Our impact</a>
        </nav>
        <div className="nav-actions">
          <Link className="login-link" to="/login">Log in</Link>
          <Link className="btn btn-dark btn-small" to="/signup">Join the movement <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </header>
  )
}

function Page({ children, className = '' }) {
  return <motion.main className={className} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}>{children}</motion.main>
}

function Home() {
  return (
    <Page>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> LESS WASTE. MORE GOOD.</div>
            <h1>Good food deserves<br /><em>a second chance.</em></h1>
            <p className="hero-lede">We connect food businesses with local NGOs so perfectly good surplus food reaches people who need it — not the bin.</p>
            <div className="hero-actions">
              <Link to="/food" className="btn btn-primary">Find available food <ArrowRight size={17} /></Link>
              <Link to="/signup" className="btn btn-outline">Become a food partner</Link>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span>R</span><span>A</span><span>M</span><span>+</span></div><div><strong>Growing together</strong><small>Join donors and NGOs making a difference</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90" alt="Fresh healthy food in bowls" /></div>
            <div className="floating-note note-top"><span className="note-icon"><Heart size={17} fill="currentColor" /></span><span><strong>35 meals rescued</strong><small>from one local partner</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon green"><MapPin size={17} /></span><span><strong>Nearby, ready to share</strong><small>Food is waiting for you</small></span></div>
            <div className="hero-stamp"><Leaf size={18} /><span>Share more.<br />Waste less.</span></div>
          </div>
        </div>
        <div className="hero-bottom container"><span>BUILT FOR COMMUNITIES</span><div><span><Utensils size={15} /> Restaurants</span><span><Building2 size={15} /> Hostels & hotels</span><span><HandHeart size={15} /> NGOs</span><span><Users size={15} /> Volunteers</span></div></div>
      </section>

      <section className="impact-strip" id="impact">
        <div className="container impact-grid">
          {impactStats.map((s) => <div className="impact-item" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          <div className="impact-message"><span className="mini-leaf"><Leaf size={18} /></span><span>Every meal shared<br /><strong>creates a ripple.</strong></span></div>
        </div>
      </section>

      <section className="section container" id="how-it-works">
        <div className="section-heading"><div><div className="eyebrow">SIMPLE. LOCAL. IMPACTFUL.</div><h2>Small actions.<br /><em>Big difference.</em></h2></div><p>Turning surplus into support should be easy. Here's how our community makes it happen.</p></div>
        <div className="steps-grid">
          <Step number="01" icon={<PackageCheck />} title="List surplus food" text="Food partners add available meals, quantity and a safe pickup window." />
          <Step number="02" icon={<Search />} title="Connect with an NGO" text="Nearby NGOs discover available donations and request what they need." />
          <Step number="03" icon={<Truck />} title="Pick up & share" text="Coordinate collection and get food to the community while it's fresh." />
        </div>
      </section>

      <section className="feature-band">
        <div className="container feature-grid">
          <div className="feature-photo"><img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85" alt="Volunteers preparing food donations" /></div>
          <div className="feature-copy"><div className="eyebrow">A BETTER WAY TO SHARE</div><h2>Food connects us.<br /><em>Let's make it count.</em></h2><p>From a restaurant's extra servings to an NGO's community meal, we make it easier for good food to find the right place.</p><ul className="check-list"><li><CheckCircle2 /> Easy donation listings</li><li><CheckCircle2 /> Local NGO connections</li><li><CheckCircle2 /> Clear pickup coordination</li><li><CheckCircle2 /> Measurable community impact</li></ul><Link to="/signup" className="text-link">Get involved <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="cta-section container">
        <div className="cta-card"><div className="cta-decor"><Sprout size={100} /></div><div className="eyebrow light">YOUR NEXT MEAL CAN MAKE A DIFFERENCE</div><h2>Let's turn extra into<br /><em>enough for everyone.</em></h2><p>Whether you have food to share or people to feed, there's a place for you here.</p><div className="cta-actions"><Link to="/signup" className="btn btn-white">Join as a partner <ArrowRight size={16} /></Link><Link to="/food" className="btn btn-ghost-white">Explore donations</Link></div></div>
      </section>
    </Page>
  )
}

function Step({ number, icon, title, text }) {
  return <article className="step-card"><div className="step-top"><span>{number}</span><div className="step-icon">{icon}</div></div><h3>{title}</h3><p>{text}</p></article>
}

function FoodListings() {
  const { donations, requests, setRequests, notify } = useDonations()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = donations.filter(d => d.status === 'Available' && (d.title + d.donor + d.location).toLowerCase().includes(search.toLowerCase()) && (category === 'All' || d.category === category))
  const requestFood = (id) => {
    if (requests.includes(id)) return notify('You have already requested this donation.')
    setRequests([...requests, id])
    notify('Request sent! The donor can now coordinate pickup.')
  }
  return <Page>
    <section className="page-hero"><div className="container"><div className="eyebrow">FRESH FOOD, NEARBY</div><h1>Find food worth<br /><em>sharing.</em></h1><p>Explore surplus food listings from local food partners and request a pickup.</p></div></section>
    <section className="container listing-section">
      <div className="listing-toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food, donor or location..." /></div><div className="filter-wrap"><Filter size={17} /><select value={category} onChange={e => setCategory(e.target.value)}><option>All</option><option>Cooked meals</option><option>Bakery</option><option>Fruits</option></select><ChevronDown size={14} /></div></div>
      <div className="results-line"><span><strong>{filtered.length} donations</strong> available near you</span><span className="live-label"><span /> Updated just now</span></div>
      <div className="food-grid">{filtered.map(d => <FoodCard key={d.id} donation={d} onRequest={() => requestFood(d.id)} requested={requests.includes(d.id)} />)}</div>
      {filtered.length === 0 && <div className="empty-state"><Search size={30} /><h3>No matching food found</h3><p>Try a different keyword or category.</p></div>}
      <div className="safety-note"><ShieldCheck size={20} /><div><strong>Food safety matters</strong><p>Always confirm preparation time, storage conditions and safe consumption window with the donor before collection.</p></div></div>
    </section>
  </Page>
}


function FoodCard({ donation, onRequest, requested }) {
  return (
    <article className="food-card">
      <div className="food-image">
        <img src={donation.image} alt={donation.title} />
        <span className="available-pill">
          <span /> Available
        </span>
      </div>

      <div className="food-card-body">
        <div className="food-category">{donation.category}</div>
        <h3>{donation.title}</h3>

        <div className="donor-name">
          <Building2 size={14} /> {donation.donor}
        </div>

        <div className="food-meta">
          <span><PackageCheck size={15} /> {donation.quantity}</span>
          <span><MapPin size={15} /> {donation.distance}</span>
        </div>

        <div className="pickup-time">
          <Clock3 size={15} /> {donation.pickup}
        </div>

        <p className="food-notes">{donation.notes}</p>

        <button
          className={requested ? "btn btn-requested" : "btn btn-primary btn-full"}
          onClick={onRequest}
          disabled={requested}
        >
          {requested ? (
            <><Check size={16} /> Requested</>
          ) : (
            <>Request pickup <ArrowRight size={16} /></>
          )}
        </button>
      </div>
    </article>
  );
}


function AuthPage({ mode }) {
  const signup = mode === 'signup'
  const [role, setRole] = useState('Donor')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { notify } = useDonations()
  const navigate = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    if (!email || !password || (signup && !name)) return
    notify(signup ? `Welcome, ${name}! Demo account created.` : 'Demo login successful!')
    navigate(role === 'NGO' ? '/ngo' : '/donor')
  }
  return <Page className="auth-page"><div className="auth-layout"><div className="auth-aside"><div className="eyebrow light">BE PART OF THE CHANGE</div><h2>One community.<br /><em>Zero waste.</em></h2><p>Every rescued meal is a step towards a kinder, less wasteful world.</p><div className="auth-aside-stat"><Heart size={20} /><span><strong>Share food, share hope.</strong><small>Good things happen when we work together.</small></span></div></div><div className="auth-panel"><div className="auth-panel-head"><span className="mini-leaf"><Sprout size={18} /></span><span>{signup ? 'Create your account' : 'Welcome back'}</span></div><h1>{signup ? 'Join the movement' : 'Let’s get you in.'}</h1><p>{signup ? 'Start making a difference in your community.' : 'Log in to continue your good work.'}</p><form onSubmit={submit} className="auth-form">{signup && <label>Your name<input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required /></label>}<label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required minLength="6" /></label><label>I am joining as<select value={role} onChange={e => setRole(e.target.value)}><option>Donor</option><option>NGO</option></select></label><button className="btn btn-primary btn-full" type="submit">{signup ? 'Create account' : 'Log in'} <ArrowRight size={16} /></button></form><div className="auth-switch">{signup ? 'Already have an account?' : 'New to Zero Waste Warriors?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link></div><div className="demo-hint"><Sparkles size={15} /> Demo mode: form submissions are local only; authentication will be connected to the backend later.</div></div></div></Page>
}

function DonorDashboard() {
  const { donations, setDonations, notify } = useDonations()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', donor: 'My food business', category: 'Cooked meals', quantity: '', pickup: '', location: '', notes: '' })
  const mine = donations.filter(d => d.donor === 'My food business')
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const next = { ...form, id: Date.now(), servings: Number.parseInt(form.quantity) || 0, distance: 'New listing', status: 'Available', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85' }
    setDonations([next, ...donations])
    setForm({ title: '', donor: 'My food business', category: 'Cooked meals', quantity: '', pickup: '', location: '', notes: '' })
    setShowForm(false)
    notify('Your food donation is now listed!')
  }
  return <Page><section className="dashboard-page container"><div className="dashboard-heading"><div><div className="eyebrow">DONOR WORKSPACE</div><h1>Your impact starts <em>here.</em></h1><p>Manage surplus food listings and connect with nearby NGOs.</p></div><button className="btn btn-primary" onClick={() => setShowForm(!showForm)}><Plus size={17} /> Add food donation</button></div>
    <div className="dash-stats"><DashStat icon={<PackageCheck />} value={mine.length} label="Your active listings" /><DashStat icon={<Heart />} value={mine.reduce((a, b) => a + (b.servings || 0), 0)} label="Meals listed" /><DashStat icon={<Users />} value="—" label="NGO requests" /></div>
    {showForm && <form className="donation-form panel" onSubmit={submit}><div className="panel-title"><div><h2>List surplus food</h2><p>Share clear details so an NGO can arrange a safe pickup.</p></div><button type="button" className="icon-button" onClick={() => setShowForm(false)}><X /></button></div><div className="form-grid"><label>Food name<input name="title" value={form.title} onChange={update} placeholder="e.g. Vegetable rice" required /></label><label>Category<select name="category" value={form.category} onChange={update}><option>Cooked meals</option><option>Bakery</option><option>Fruits</option><option>Packaged food</option></select></label><label>Quantity / servings<input name="quantity" value={form.quantity} onChange={update} placeholder="e.g. 25 meals" required /></label><label>Pickup window<input name="pickup" value={form.pickup} onChange={update} placeholder="Today, 7 PM – 8 PM" required /></label><label>Pickup location<input name="location" value={form.location} onChange={update} placeholder="Area, city" required /></label><label>Donor name<input name="donor" value={form.donor} onChange={update} required /></label><label className="full-field">Food details & storage notes<textarea name="notes" value={form.notes} onChange={update} placeholder="Preparation time, packaging and storage conditions..." /></label></div><button className="btn btn-primary" type="submit">Publish donation <ArrowRight size={16} /></button></form>}
    <div className="panel"><div className="panel-title"><div><h2>Your food listings</h2><p>Keep your availability and pickup details up to date.</p></div><span className="soft-tag">{mine.length} listings</span></div>{mine.length ? <div className="table-wrap"><table><thead><tr><th>Food</th><th>Quantity</th><th>Pickup window</th><th>Status</th></tr></thead><tbody>{mine.map(d => <tr key={d.id}><td><strong>{d.title}</strong><small>{d.location}</small></td><td>{d.quantity}</td><td>{d.pickup}</td><td><span className="status-pill">{d.status}</span></td></tr>)}</tbody></table></div> : <div className="empty-inline"><PackageCheck size={25} /><span>No listings yet. Add your first surplus food donation to get started.</span></div>}</div>
  </section></Page>
}

function DashStat({ icon, value, label }) { return <div className="dash-stat"><span className="dash-stat-icon">{icon}</span><strong>{value}</strong><small>{label}</small></div> }

function NgoDashboard() {
  const { donations, requests, setRequests, notify } = useDonations()
  const available = donations.filter(d => d.status === 'Available')
  const request = (id) => { if (!requests.includes(id)) { setRequests([...requests, id]); notify('Pickup request submitted successfully.') } }
  return <Page><section className="dashboard-page container"><div className="dashboard-heading"><div><div className="eyebrow">NGO WORKSPACE</div><h1>Find food. <em>Feed hope.</em></h1><p>Discover surplus food near your organization and coordinate a pickup.</p></div><Link to="/food" className="btn btn-outline">View all listings <ArrowRight size={16} /></Link></div><div className="dash-stats"><DashStat icon={<Search />} value={available.length} label="Available donations" /><DashStat icon={<HandHeart />} value={requests.length} label="Your requests" /><DashStat icon={<Heart />} value="—" label="Meals distributed" /></div><div className="panel"><div className="panel-title"><div><h2>Available near your community</h2><p>Review food details and request a collection.</p></div><span className="live-label"><span /> Live demo data</span></div><div className="ngo-list">{available.map(d => <div className="ngo-row" key={d.id}><img src={d.image} alt="" /><div className="ngo-row-info"><strong>{d.title}</strong><span>{d.donor} · {d.quantity}</span><small><MapPin size={13} /> {d.location} &nbsp; · &nbsp; <Clock3 size={13} /> {d.pickup}</small></div><button className={requests.includes(d.id) ? 'btn btn-requested' : 'btn btn-primary btn-small'} disabled={requests.includes(d.id)} onClick={() => request(d.id)}>{requests.includes(d.id) ? 'Requested' : 'Request pickup'}</button></div>)}</div></div></section></Page>
}

function TrackPage() {
  const { requests, donations } = useDonations()
  const requested = donations.filter(d => requests.includes(d.id))
  return <Page><section className="dashboard-page container"><div className="eyebrow">DONATION ACTIVITY</div><h1>Every request moves<br /><em>good food forward.</em></h1><p className="track-intro">Track the donation requests made in this demo session.</p><div className="panel track-panel"><div className="panel-title"><div><h2>Your pickup requests</h2><p>Request status and collection information.</p></div></div>{requested.length ? requested.map(d => <div className="track-row" key={d.id}><div className="track-check"><Check size={18} /></div><div><strong>{d.title}</strong><span>{d.donor} · {d.quantity}</span><small>{d.pickup} · {d.location}</small></div><span className="status-pill">Requested</span></div>) : <div className="empty-state"><Truck size={30} /><h3>No requests yet</h3><p>Explore available food and request a pickup to see it here.</p><Link to="/food" className="btn btn-primary">Find food <ArrowRight size={16} /></Link></div>}</div></section></Page>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark"><Sprout size={22} /></span><span><strong>zero waste</strong><small>WARRIORS</small></span></Link><p>Rescuing food. Restoring hope.<br />Building a community where nothing good goes to waste.</p></div><div className="footer-links"><div><strong>Explore</strong><Link to="/food">Find food</Link><a href="/#how-it-works">How it works</a><a href="/#impact">Our impact</a></div><div><strong>Get involved</strong><Link to="/signup">Become a donor</Link><Link to="/signup">Join as an NGO</Link><Link to="/login">Log in</Link></div><div><strong>Workspace</strong><Link to="/donor">Donor dashboard</Link><Link to="/ngo">NGO dashboard</Link><Link to="/track">Track requests</Link></div></div></div><div className="container footer-bottom"><span>© 2026 Zero Waste Warriors. Built with purpose.</span><span><Leaf size={14} /> Share more. Waste less.</span></div></footer>
}

export default App