import { Draft } from 'immer'

// Generic type representing the state
export type Set<State> = (
  nextStateOrUpdater: State | Partial<State> | ((draft: Draft<State>) => void),
  shouldReplace?: false | undefined // Changed to allow true or false
) => void
