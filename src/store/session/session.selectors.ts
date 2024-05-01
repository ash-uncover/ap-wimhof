import { RootState } from 'store/state'

export const base = (state: RootState) => state.session

export const preset = (state: RootState) => base(state).preset
export const rounds = (state: RootState) => base(state).rounds
export const round = (index: number) => (state: RootState) => rounds(state)[index]

export const date = (state: RootState) => base(state).date

export const SessionSelectors = {
  preset,
  rounds,
  round,
  date,
}
