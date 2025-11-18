import { useState } from 'react'
import Button from './Button'

export interface VocabCard {
  word: string
  definition: string
}

interface FlashCardGameProps {
  data: VocabCard[]
  onBack: () => void
}

export default function FlashCardGame({ data, onBack }: FlashCardGameProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  // NEW STATE: Defaults to false (Term on front)
  const [showDefFirst, setShowDefFirst] = useState<boolean>(false)

  if (!data || data.length === 0) return null

  const currentCard = data[currentCardIndex]

  // --- LOGIC FOR CONTENT SWAPPING ---

  // 1. Determine what text goes on the Front (Gradient Side)
  const frontText = showDefFirst ? currentCard.definition : currentCard.word
  // Adjust font size: Definitions need to be smaller to fit
  const frontSize = showDefFirst ? 'text-xl font-medium' : 'text-4xl font-bold'

  // 2. Determine what text goes on the Back (White Side)
  const backText = showDefFirst ? currentCard.word : currentCard.definition
  const backSize = showDefFirst ? 'text-4xl font-bold' : 'text-2xl font-medium'

  // --- ACTIONS ---

  const handleFlip = () => setIsFlipped(!isFlipped)

  const toggleMode = () => {
    setIsFlipped(false) // Reset flip to avoid confusion
    setShowDefFirst(!showDefFirst)
  }

  const goToNextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev + 1) % data.length)
  }

  const goToPrevCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-4">
      {/* Header */}
      <div className="flex justify-between w-full max-w-md mb-6 items-center">
        <Button
          variant="secondary"
          onClick={onBack}
          className="px-4 py-2 text-sm"
        >
          &larr; Back
        </Button>

        {/* NEW: Mode Toggle Button */}
        <button
          onClick={toggleMode}
          className="text-xs font-bold text-brand uppercase tracking-widest border border-brand/30 px-3 py-1 rounded-full hover:bg-brand hover:text-white transition-all"
        >
          {showDefFirst ? 'Mode: Def ➔ Term' : 'Mode: Term ➔ Def'}
        </button>

        <span className="text-lg font-medium text-text-muted">
          {currentCardIndex + 1} / {data.length}
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
          {/* --- FRONT (Gradient) --- */}
          <div className="absolute w-full h-full backface-hidden bg-linear-to-br from-brand-light to-brand text-white rounded-2xl shadow-xl flex items-center justify-center p-8 text-center border border-brand">
            {/* Dynamic Text and Size */}
            <h2 className={`${frontSize} tracking-wide drop-shadow-md`}>
              {frontText}
            </h2>

            <span className="absolute bottom-8 px-4 py-1.5 rounded-full bg-black/25 text-white text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
              Click to flip
            </span>
          </div>

          {/* --- BACK (Surface) --- */}
          <div className="absolute w-full h-full backface-hidden bg-surface text-text-main border-2 border-border rounded-2xl shadow-xl flex items-center justify-center p-8 text-center rotate-y-180">
            {/* Dynamic Text and Size */}
            <p className={`${backSize} leading-relaxed`}>{backText}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
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
