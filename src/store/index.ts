import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import botMiddleware from './middlewares/bot'
import gameMiddleware from './middlewares/game'

const store = configureStore({
  reducer: rootReducer,
  middleware: [botMiddleware, gameMiddleware],
  devTools: true,
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootState = ReturnType<typeof rootReducer>


export default store;