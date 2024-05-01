interface AppState {
  busy: boolean
  busyMessage: string

  dialog: string | null
  dialogParams: any | null

  language: string

  loaded: boolean
  started: boolean
}

export default AppState