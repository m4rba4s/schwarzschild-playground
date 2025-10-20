import { ChangeEvent, useMemo, useState } from 'react'

const G = 6.6743e-11 // gravitational constant (m^3·kg^-1·s^-2)
const C = 299_792_458 // speed of light (m·s^-1)
const SOLAR_MASS = 1.98847e30 // kg
const AU = 149_597_870_700 // m

type Mode = 'mass' | 'radius'

type Preset = {
  label: string
  massKg: number
}

const PRESETS: Preset[] = [
  { label: 'Human (70 kg)', massKg: 70 },
  { label: 'Earth', massKg: 5.972e24 },
  { label: 'Sun', massKg: SOLAR_MASS },
  { label: 'Sagittarius A*', massKg: 4.3e6 * SOLAR_MASS },
]

const rsFromMass = (massKg: number) => (2 * G * massKg) / (C * C)
const massFromRs = (radiusM: number) => (radiusM * C * C) / (2 * G)

const clampNonNegative = (value: number) => (Number.isFinite(value) && value >= 0 ? value : 0)

const formatScientific = (value: number, unit: string) =>
  Number.isFinite(value) ? `${value.toExponential(6)} ${unit}` : '—'

const formatKilometers = (meters: number) =>
  Number.isFinite(meters) ? `${(meters / 1_000).toLocaleString(undefined, { maximumFractionDigits: 6 })} km` : '—'

const formatAU = (meters: number) =>
  Number.isFinite(meters) ? `${(meters / AU).toExponential(6)} AU` : '—'

const formatSolarMasses = (massKg: number) =>
  Number.isFinite(massKg) ? `${(massKg / SOLAR_MASS).toExponential(6)} M☉` : '—'

const formatSeconds = (seconds: number) =>
  Number.isFinite(seconds) ? `${seconds.toExponential(6)} s` : '—'

export default function App() {
  const defaultMass = PRESETS[1]?.massKg ?? 5.972e24
  const [mode, setMode] = useState<Mode>('mass')
  const [massKg, setMassKg] = useState<number>(defaultMass)
  const [radiusM, setRadiusM] = useState<number>(rsFromMass(defaultMass))

  const derivedRadius = useMemo(() => rsFromMass(massKg), [massKg])
  const derivedMass = useMemo(() => massFromRs(radiusM), [radiusM])

  const handleMassChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = clampNonNegative(Number(event.target.value))
    setMassKg(value)
  }

  const handleMassSolarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = clampNonNegative(Number(event.target.value))
    setMassKg(value * SOLAR_MASS)
  }

  const handleRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = clampNonNegative(Number(event.target.value))
    setRadiusM(value)
  }

  return (
    <main className="app">
      <header>
        <h1>Schwarzschild Radius Playground</h1>
        <p>
          Experiment with the Schwarzschild radius formula (<code>Rs = 2GM / c²</code>) and its inverse. Toggle between
          mass⇢radius and radius⇢mass, and use presets to jump to common astrophysical objects.
        </p>
      </header>

      <section className="card">
        <h2>Presets</h2>
        <div className="preset-grid">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              className="preset-button"
              type="button"
              onClick={() => {
                setMode('mass')
                setMassKg(preset.massKg)
                setRadiusM(rsFromMass(preset.massKg))
              }}
            >
              <span>{preset.label}</span>
              <span>{formatScientific(preset.massKg, 'kg')}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Calculator</h2>
        <div className="toggle" role="group" aria-label="Calculation mode">
          <button
            type="button"
            data-active={mode === 'mass'}
            onClick={() => setMode('mass')}
            aria-pressed={mode === 'mass'}
          >
            Mass → Radius
          </button>
          <button
            type="button"
            data-active={mode === 'radius'}
            onClick={() => setMode('radius')}
            aria-pressed={mode === 'radius'}
          >
            Radius → Mass
          </button>
        </div>

        {mode === 'mass' ? (
          <>
            <div className="form-grid">
              <label className="field-label">
                <span>Mass (kilograms)</span>
                <input
                  className="field-input"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={Number.isFinite(massKg) ? massKg : ''}
                  onChange={handleMassChange}
                />
              </label>
              <label className="field-label">
                <span>Mass (solar masses)</span>
                <input
                  className="field-input"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={Number.isFinite(massKg) ? massKg / SOLAR_MASS : ''}
                  onChange={handleMassSolarChange}
                />
              </label>
            </div>

            <div className="stat-grid" role="list">
              <StatCard title="Schwarzschild radius" value={formatScientific(derivedRadius, 'm')} hint="Rs = 2GM / c²" />
              <StatCard title="Radius in kilometers" value={formatKilometers(derivedRadius)} />
              <StatCard title="Radius in AU" value={formatAU(derivedRadius)} />
            </div>
          </>
        ) : (
          <>
            <div className="form-grid">
              <label className="field-label">
                <span>Radius (meters)</span>
                <input
                  className="field-input"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={Number.isFinite(radiusM) ? radiusM : ''}
                  onChange={handleRadiusChange}
                />
              </label>
              <label className="field-label">
                <span>Light-crossing time (seconds)</span>
                <input className="field-input" type="text" readOnly value={formatSeconds(radiusM / C)} />
              </label>
            </div>

            <div className="stat-grid" role="list">
              <StatCard title="Required mass" value={formatScientific(derivedMass, 'kg')} hint="M = Rs c² / (2G)" />
              <StatCard title="Mass in solar masses" value={formatSolarMasses(derivedMass)} />
              <StatCard title="Equivalent radius in km" value={formatKilometers(radiusM)} />
            </div>
          </>
        )}
      </section>

      <section className="card notes">
        <h2>Physics Notes</h2>
        <ul>
          <li>Compress any object inside its Schwarzschild radius and an event horizon forms (non-rotating case).</li>
          <li>Earth&apos;s radius shrinks to about {formatKilometers(rsFromMass(5.972e24))} at the threshold.</li>
          <li>The Sun needs roughly {formatKilometers(rsFromMass(SOLAR_MASS))} to become a Schwarzschild black hole.</li>
          <li>
            Sagittarius A* (the Milky Way&apos;s central black hole) carries about {formatSolarMasses(4.3e6 * SOLAR_MASS)}.
          </li>
          <li>For rotating (Kerr) black holes, the radius is smaller; this playground sticks to the Schwarzschild case.</li>
        </ul>
      </section>

      <footer className="footer">
        Constants: G = 6.67430×10⁻¹¹ m³·kg⁻¹·s⁻², c = 299,792,458 m·s⁻¹, M☉ = 1.98847×10³⁰ kg, AU = 149,597,870,700 m.
      </footer>
    </main>
  )
}

type StatCardProps = {
  title: string
  value: string
  hint?: string
}

function StatCard({ title, value, hint }: StatCardProps) {
  return (
    <article className="stat-card" role="listitem">
      <h3>{title}</h3>
      <p>{value}</p>
      {hint ? <small>{hint}</small> : null}
    </article>
  )
}
