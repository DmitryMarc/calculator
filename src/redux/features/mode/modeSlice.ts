import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type InitialState = {
    isRuntime: boolean
}

const initialState: InitialState = {
    isRuntime: false
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeMode: (state, action: PayloadAction<boolean>) => {
            state.isRuntime = action.payload;
        }
    },
})

export const selectIsRuntime = (state: RootState) => state.mode.isRuntime;

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;