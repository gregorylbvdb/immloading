'use client'

import { useState } from 'react'
import { COLS, DATA, type Methode, type Dag, type Product, type DeliverySlot } from '@/lib/deliveryData'
import styles from './DeliveryCalculator.module.css'

const METHODES = [
  { value: 'nachtophaling' as Methode, label: 'Afdruk', sub: 'Nachtophaling' },
  { value: 'voor11' as Methode,        label: 'Fotogrammetrie', sub: 'Verstuurd vóór 11u00' },
  { value: 'na11' as Methode,          label: 'Fotogrammetrie', sub: 'Verstuurd na 11u00' },
]

const DAGEN: { value: Dag; label: string }[] = [
  { value: 'maandag',   label: 'Maandag' },
  { value: 'dinsdag',   label: 'Dinsdag' },
  { value: 'woensdag',  label: 'Woensdag' },
  { value: 'donderdag', label: 'Donderdag' },
  { value: 'vrijdag',   label: 'Vrijdag' },
]

const PRODUCTEN: { value: Product; label: string }[] = [
  { value: 'titan',      label: 'Gefreesde brug PMMA — Titanium temp cilinders' },
  { value: 'tempbridge', label: 'Gefreesde brug PMMA — Tempbridge titanium versterking' },
  { value: 'geprint',    label: 'Geprinte brug Nobel Biocare Fastmap' },
]

export default function DeliveryCalculator() {
  const [methode, setMethode] = useState<Methode>('nachtophaling')
  const [dag, setDag] = useState<Dag>('maandag')
  const [product, setProduct] = useState<Product>('titan')
  const [results, setResults] = useState<DeliverySlot[] | null | 'none'>(null)

  function handleMethodeChange(m: Methode) {
    setMethode(m)
    if (m === 'nachtophaling' && product === 'geprint') {
      setProduct('titan')
    }
    setResults(null)
  }

  function calculate() {
    const row = DATA[methode]?.[dag]?.[product]
    if (!row) {
      setResults('none')
      return
    }
    const possible = COLS.filter((_, i) => row[i])
    setResults(possible.length > 0 ? possible : 'none')
  }

  const geprintDisabled = methode === 'nachtophaling'

  return (
    <>
      {/* Top bar */}
      <div className={styles.topbar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logovdbwit.svg" alt="Dental Labo Vanderbeken" style={{ height: 60, width: 'auto', objectFit: 'contain' }} />
        <span className={styles.topbarTitle}>Immediate Loading leveringstermijnen</span>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <h1>Wanneer wordt uw<br /><span>bestelling geleverd?</span></h1>
        <p>Selecteer de aanlevermethode, tijdstip en product om direct te zien wanneer jouw werk vanuit het labo vertrekt.</p>
      </div>

      {/* Main */}
      <div className={styles.main}>

        {/* Input card */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Aanlevering</div>

          {/* Method tabs */}
          <div className={styles.tabs}>
            {METHODES.map(m => (
              <button
                key={m.value}
                className={`${styles.tab} ${methode === m.value ? styles.tabActive : ''}`}
                onClick={() => handleMethodeChange(m.value)}
              >
                {m.label}<br />
                <small>{m.sub}</small>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label>Dag van aanlevering</label>
              <select value={dag} onChange={e => { setDag(e.target.value as Dag); setResults(null) }}>
                {DAGEN.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Product</label>
              <select value={product} onChange={e => { setProduct(e.target.value as Product); setResults(null) }}>
                {PRODUCTEN.map(p => (
                  <option key={p.value} value={p.value} disabled={p.value === 'geprint' && geprintDisabled}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className={styles.btn} onClick={calculate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            Bereken leveringsopties
          </button>
        </div>

        {/* Results card */}
        {results !== null && (
          <div className={styles.card}>
            <div className={styles.cardTitle}>Mogelijke leveringen</div>

            {results === 'none' || !Array.isArray(results) ? (
              <div className={styles.resultEmpty}>
                <strong>Geen leveringen beschikbaar</strong>
                {product === 'geprint' && methode === 'nachtophaling'
                  ? 'Dit product is niet beschikbaar bij nachtophaling via afdruk.'
                  : 'Er zijn geen leveringsopties voor deze combinatie.'}
              </div>
            ) : (
              <div className={styles.deliveriesList}>
                {results.map((col, i) => {
                  const isSpoed = col.type === 'Spoedlevering'
                  return (
                    <div
                      key={col.idx}
                      className={`${styles.delCard} ${isSpoed ? styles.spoed : styles.nacht}`}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className={styles.delIcon}>{isSpoed ? '🚚' : '🌙'}</div>
                      <div className={styles.delInfo}>
                        <div className={styles.delDay}>{col.label}</div>
                        <div className={styles.delSub}>
                          {col.time === 'nacht'
                            ? 'Vertrekt uit labo — nachtlevering'
                            : `Vertrekt uit labo om ${col.time}`}
                        </div>
                      </div>
                      <div className={styles.delBadge}>{col.type}</div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Spoedlevering: <strong style={{ color: 'var(--text-dark)' }}>&euro;1,20/km</strong>&nbsp;heen en terug naar Oostende
              </div>
            </div>
          </div>
        )}

      </div>

      <div className={styles.footer}>
        Dental Labo Vanderbeken · Immediate Loading leveringstermijnen v1.0 · 2026
      </div>

      {/* Fixed logo bottom right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logovdbkleur.svg"
        alt="Dental Labo Vanderbeken"
        style={{ position: 'fixed', bottom: 20, right: 20, height: 80, width: 'auto', objectFit: 'contain', opacity: 0.9, zIndex: 100 }}
      />
    </>
  )
}
