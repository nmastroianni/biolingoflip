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

  if (!data || data.length === 0) return null

  const currentCard = data[currentCardIndex]

  const handleFlip = () => setIsFlipped(!isFlipped)

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
        <button
          onClick={onBack}
          // CHANGE: bg-gray-200 -> bg-surface (uses your tinted white/dark)
          // CHANGE: text-gray-800 -> text-text-muted
          className="px-4 py-2 bg-surface border border-border text-text-muted hover:text-text-main rounded-lg shadow-sm hover:bg-bg-main transition duration-300 cursor-pointer font-medium text-sm"
        >
          &larr; Back
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
          {/* --- FRONT OF CARD --- */}
          {/* CHANGE: from-blue-500 to-indigo-600 -> from-brand-light to-brand */}
          <div className="absolute w-full h-full backface-hidden bg-linear-to-br from-brand-light to-brand text-white rounded-2xl shadow-xl flex items-center justify-center p-8 text-center border border-brand">
            <h2 className="text-4xl font-bold tracking-wide drop-shadow-md">
              {currentCard.word}
            </h2>
            {/* <span className="absolute bottom-4 text-xs font-light opacity-80 uppercase tracking-widest">
              Click to flip
            </span> */}
            <span className="absolute bottom-8 px-4 py-1.5 rounded-full bg-black/25 text-white text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm hover:bg-black/40 transition-colors">
              Click to flip
            </span>
          </div>

          {/* --- BACK OF CARD --- */}
          {/* CHANGE: bg-white -> bg-surface */}
          {/* CHANGE: text-gray-800 -> text-text-main */}
          <div className="absolute w-full h-full backface-hidden bg-surface text-text-main border-2 border-border rounded-2xl shadow-xl flex items-center justify-center p-8 text-center rotate-y-180">
            <p className="text-2xl font-medium leading-relaxed">
              {currentCard.definition}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-6 mt-10">
        <Button
          variant="secondary"
          onClick={goToPrevCard}
          // CHANGE: Hardcoded colors -> Semantic surface colors
          className="px-8 py-3 bg-surface border border-border text-text-muted rounded-xl shadow-sm hover:bg-bg-main hover:text-brand transition-all duration-200 text-lg font-medium cursor-pointer"
        >
          Previous
        </Button>

        <Button
          onClick={goToNextCard}
          // CHANGE: bg-indigo-600 -> bg-brand
          // CHANGE: shadow-indigo-200 -> shadow-md (let's keep shadow neutral to avoid clash)
          className="px-8 py-3 bg-brand text-white rounded-xl shadow-lg hover:bg-brand-hover transition-all duration-200 text-lg font-medium cursor-pointer"
        >
          Next Card
        </Button>
      </div>
    </div>
  )
}
