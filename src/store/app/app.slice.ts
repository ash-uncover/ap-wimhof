import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import Language from 'lib/utils/language'

import AppState from 'store/app/app.state'

// STATE //

const initialState: AppState = {
  busy: false,
  busyMessage: '',

  dialog: null,
  dialogParams: null,

  language: Language.FRENCH.id,

  loaded: false,
  started: false,
}

// REDUCERS //

const startApp: CaseReducer<AppState, PayloadAction<PayloadBusy>> = (state, action) => {
  state.started = true
}

type PayloadBusy = {
  busy: boolean,
  busyMessage?: string
}
const setBusy: CaseReducer<AppState, PayloadAction<PayloadBusy>> = (state, action) => {
  const {
    busy,
    busyMessage
  } = action.payload
  state.busy = busy
  state.busyMessage = busy ? busyMessage || '' : ''
}

const setLanguage: CaseReducer<AppState, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}

const setLoaded: CaseReducer<AppState, PayloadAction<boolean>> = (state, action) => {
  state.loaded = action.payload
}

type PayloadDialog = {
  dialog: string | null,
  params?: any,
}
const openDialog: CaseReducer<AppState, PayloadAction<PayloadDialog>> = (state, action) => {
  const {
    dialog,
    params,
  } = action.payload
  state.dialog = dialog
  state.dialogParams = params
}
const closeDialog: CaseReducer<AppState, PayloadAction<void>> = (state, action) => {
  state.dialog = null
  state.dialogParams = null
}

// SLICE //

const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    startApp,
    setBusy,
    setLanguage,
    setLoaded,
    openDialog,
    closeDialog,
  }
})

export default AppSlice
