import { useState, useEffect } from 'react'
import FlashCardGame, { type VocabCard } from './components/FlashCardGame'

interface VocabSet {
  id: string
  title: string
  count: number
  description?: string
}

function App() {
  const baseUrl = import.meta.env.BASE_URL
  const [menu, setMenu] = useState<VocabSet[]>([])
  const [activeSet, setActiveSet] = useState<VocabCard[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${baseUrl}data/index.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load menu')
        return res.json()
      })
      .then((data) => setMenu(data))
      .catch((err) => setError(err.message))
  }, [baseUrl])

  const loadSet = async (setId: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${baseUrl}data/${setId}.json`)
      if (!res.ok) throw new Error(`Could not load set: ${setId}`)
      const data: VocabCard[] = await res.json()
      setActiveSet(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load flashcards.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // CHANGE: Global background uses semantic colors (tints based on hue)
    <div className="min-h-screen bg-bg-main flex flex-col items-center py-10 px-4 font-sans text-text-main transition-colors duration-300">
      <header className="mb-8 text-center">
        {/* CHANGE: text-brand makes the title match the Maroon/Hue */}
        <h1 className="text-4xl font-extrabold text-brand tracking-tight">
          BioLingoFlip
        </h1>
        <p className="text-text-muted mt-2">
          Master your vocabulary, one card at a time.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* CHANGE: Spinner now uses brand color */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : activeSet ? (
          <FlashCardGame
            key={activeSet[0]?.word || 'init'}
            data={activeSet}
            onBack={() => setActiveSet(null)}
          />
        ) : (
          /* --- MENU GRID --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => loadSet(item.id)}
                // CHANGE:
                // 1. bg-surface: Adapts to white (light) or dark gray (dark mode)
                // 2. border-border: Subtle border based on brand hue
                // 3. hover:border-brand: Highlights in Maroon when hovered
                className="group relative bg-surface p-6 rounded-2xl shadow-sm hover:shadow-xl border border-border hover:border-brand transition-all duration-300 text-left flex flex-col h-full cursor-pointer"
              >
                {/* CHANGE: Title turns Maroon on hover */}
                <h3 className="text-xl font-bold text-text-main group-hover:text-brand transition-colors">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-sm text-text-muted mt-2 mb-4 grow">
                    {item.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center text-sm text-brand font-medium">
                  <span>{item.count} cards</span>
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300">
                    Start &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
