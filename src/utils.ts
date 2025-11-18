// src/utils.ts

export function shuffleArray<T>(array: T[]): T[] {
  // Create a shallow copy so we don't mutate the original
  const newArray = [...array]

  // Fisher-Yates Shuffle Algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}
