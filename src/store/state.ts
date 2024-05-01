import AppState from 'store/app/app.state'
import { SessionState } from './session/session.state'

export type RootState = {
  app: AppState,
  session: SessionState,
}