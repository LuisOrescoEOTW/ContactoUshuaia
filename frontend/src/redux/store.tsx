import { configureStore } from '@reduxjs/toolkit'
import { rubrosSlice } from './slices/rubros/rubrosSlice'
import { contratistasSlice } from './slices/contratistas/contratistasSlice'
import { rubrosXContratistasSlice } from './slices/rubrosXContratistas/rubrosXContratistasSlice'
import { palabrasClavesSlice } from './slices/palabrasClaves/palabrasClavesSlice'
import { preguntasFrecuentesSlice } from './slices/preguntasFrecuentes/preguntasFrecuentesSlice'
import { avisoSlice } from './slices/Aviso/avisoSlice'
import { puntuarSlice } from './slices/Puntuar/puntuarSlice'

export const store = configureStore({
  reducer: {
    rubros: rubrosSlice.reducer,
    contratistas: contratistasSlice.reducer,    
    rubrosXContratistas: rubrosXContratistasSlice.reducer,
    palabrasClaves: palabrasClavesSlice.reducer,
    preguntasFrecuentes: preguntasFrecuentesSlice.reducer,
    avisos: avisoSlice.reducer,
    puntuar: puntuarSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch