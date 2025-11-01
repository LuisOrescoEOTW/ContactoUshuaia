import { createSlice } from '@reduxjs/toolkit'
import type { IpalabrasClaves } from '../../../app/models/IpalabrasClaves';

export const palabrasClavesSlice = createSlice({
  name: 'palabrasClaves',
  initialState: {
    palabrasClaves: Array<IpalabrasClaves>(),
  },
  reducers: {
    setPalabrasClaves: (state, action) => {
      state.palabrasClaves = action.payload.palabrasClaves;
    },
  },
})
export const { setPalabrasClaves } = palabrasClavesSlice.actions
