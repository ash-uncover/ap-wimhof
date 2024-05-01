import { configureStore } from '@reduxjs/toolkit'

import AppSlice from 'store/app/app.slice'
import { SessionSlice } from 'store/session/session.slice'

export default configureStore({
  reducer: {
    app: AppSlice.reducer,
    session: SessionSlice.reducer,
  }
})
