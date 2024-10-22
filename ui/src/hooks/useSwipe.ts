import { TouchEvent, useState } from 'react'

interface SwipeInput {
  onSwipedLeft: () => void
  onSwipedRight: () => void
  onSwipedEnd?: () => void
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
  swipeDirection: 'left' | 'right' | null // New property to indicate swipe direction
  resetSwipeDirection: () => void
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  ) // State for swipe direction

  const minSwipeDistance = 50 // Minimum distance to be considered a swipe

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0) // Reset the touch end to prevent false swipe detection
    setTouchStart(e.targetTouches[0].clientX) // Capture the initial touch position
    setSwipeDirection(null) // Reset swipe direction
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX) // Update touch end position

    // Immediately determine swipe direction
    const distance = touchStart - e.targetTouches[0].clientX // Calculate distance swiped
    if (distance > minSwipeDistance) {
      input.onSwipedLeft() // Trigger left swipe callback
      setSwipeDirection('left') // Set swipe direction
    } else if (distance < -minSwipeDistance) {
      input.onSwipedRight() // Trigger right swipe callback
      setSwipeDirection('right') // Set swipe direction
    }
  }

  const onTouchEnd = () => {
    // Ensure both start and end positions are set
    if (touchStart === 0 || touchEnd === 0) return

    // Final check (can be optional)
    const distance = touchStart - touchEnd // Calculate distance swiped
    if (distance > minSwipeDistance) {
      input.onSwipedLeft() // Trigger left swipe callback if not already triggered
      setSwipeDirection('left') // Set swipe direction
    } else if (distance < -minSwipeDistance) {
      input.onSwipedRight() // Trigger right swipe callback if not already triggered
      setSwipeDirection('right') // Set swipe direction
    }
    // Reset swipe states
    resetSwipe()
  }

  const resetSwipe = () => {
    setTouchStart(0)
    setTouchEnd(0)
  }
  const resetSwipeDirection = () => {
    setSwipeDirection(null)
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    swipeDirection,
    resetSwipeDirection
  }
}
