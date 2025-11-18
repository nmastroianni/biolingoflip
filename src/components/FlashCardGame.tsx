import { useState } from 'react'
import Button from './Button'
import { shuffleArray } from '../utils' // Import the helper

export interface VocabCard {
  word: string
  definition: string
}

interface FlashCardGameProps {
  data: VocabCard[]
  onBack: () => void
}

export default function FlashCardGame({ data, onBack }: FlashCardGameProps) {
  // STATE 1: The "Active Deck" (allows us to shuffle)
  const [activeDeck, setActiveDeck] = useState<VocabCard[]>(data)

  // STATE 2: Navigation & View
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [showDefFirst, setShowDefFirst] = useState<boolean>(false)

  if (!activeDeck || activeDeck.length === 0) return null

  const currentCard = activeDeck[currentCardIndex]

  // --- CONTENT LOGIC ---
  const frontText = showDefFirst ? currentCard.definition : currentCard.word
  const frontSize = showDefFirst ? 'text-xl font-medium' : 'text-4xl font-bold'
  const backText = showDefFirst ? currentCard.word : currentCard.definition
  const backSize = showDefFirst ? 'text-4xl font-bold' : 'text-2xl font-medium'

  // --- ACTIONS ---

  const handleFlip = () => setIsFlipped(!isFlipped)

  const toggleMode = () => {
    setIsFlipped(false)
    setShowDefFirst(!showDefFirst)
  }

  const goToNextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev + 1) % activeDeck.length)
  }

  const goToPrevCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex(
      (prev) => (prev - 1 + activeDeck.length) % activeDeck.length
    )
  }

  // NEW: Shuffle Logic
  const handleShuffle = () => {
    setIsFlipped(false)
    const shuffled = shuffleArray(activeDeck)
    setActiveDeck(shuffled)
    setCurrentCardIndex(0) // Always start from beginning after shuffle
  }

  // NEW: Reset Logic
  const handleReset = () => {
    setIsFlipped(false)
    setActiveDeck(data) // Revert to original props data
    setCurrentCardIndex(0)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-4">
      {/* Header Controls */}
      <div className="flex flex-wrap justify-between w-full max-w-md mb-6 items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={onBack}
            className="px-3 py-1.5 text-xs"
          >
            &larr; Back
          </Button>

          {/* Mode Toggle */}
          <button
            onClick={toggleMode}
            className="text-[10px] font-bold text-brand uppercase tracking-widest border border-brand/30 px-2 py-1 rounded-full hover:bg-brand hover:text-white transition-all"
          >
            {showDefFirst ? 'Def ➔ Term' : 'Term ➔ Def'}
          </button>
        </div>

        {/* Shuffle Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="text-xs font-medium text-text-muted hover:text-brand transition-colors"
            title="Reset to original order"
          >
            Reset
          </button>
          <button
            onClick={handleShuffle}
            className="text-xs font-bold text-brand hover:text-brand-hover uppercase tracking-wide transition-colors flex items-center gap-1"
            title="Randomize Card Order"
          >
            Shuffle 🔀
          </button>
        </div>
      </div>

      {/* Progress Counter (Moved below header for cleaner layout) */}
      <div className="w-full max-w-md text-right mb-2">
        <span className="text-sm font-medium text-text-muted">
          Card {currentCardIndex + 1} / {activeDeck.length}
        </span>
      </div>

      {/* Card Container */}
      <div
        className="relative w-full max-w-md h-80 perspective cursor-pointer group"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full preserve-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-linear-to-br from-brand-light to-brand text-white rounded-2xl shadow-xl flex items-center justify-center p-8 text-center border border-brand">
            <h2
              className={`${frontSize} tracking-wide drop-shadow-md ${
                showDefFirst && 'text-left'
              }`}
            >
              {frontText}
            </h2>
            <span className="absolute bottom-8 px-4 py-1.5 rounded-full bg-black/25 text-white text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
              Click to flip
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-surface text-text-main border-2 border-border rounded-2xl shadow-xl flex items-center justify-center p-8 text-center rotate-y-180">
            <p className={`${backSize} leading-relaxed text-left`}>
              {backText}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex space-x-6 mt-10">
        <Button variant="secondary" onClick={goToPrevCard}>
          Previous
        </Button>
        <Button variant="primary" onClick={goToNextCard}>
          Next Card
        </Button>
      </div>
    </div>
  )
}
