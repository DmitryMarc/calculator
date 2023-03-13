import { configureStore } from '@reduxjs/toolkit';
import calculatorSlice from './features/calculator/calculatorSlice';
import modeSlice from './features/mode/modeSlice';

export const store = configureStore({
    reducer: {
        calculator: calculatorSlice,
        mode: modeSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch