import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type OperationType = '+' | '-' | 'x' | '/';

type InitialState = {
    result: number,
    enteredNumber: null | string,
    сurrentOperation: null | OperationType,
    expression: string[],
    error: null | string
}

const initialState: InitialState = {
    result: 0,
    enteredNumber: null,
    сurrentOperation: null,
    expression: [],
    error: null
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        createNumber: (state, action: PayloadAction<string>) => {
            if (state.enteredNumber) {
                const findDot = state.enteredNumber.includes('.')
                if (action.payload === ',' && !findDot) {
                    state.enteredNumber += '.';
                } else if (action.payload !== ',') {
                    state.enteredNumber += action.payload;
                }
            } else if (state.enteredNumber !== ',') {
                state.enteredNumber = action.payload;
            } else {
                state.enteredNumber = '0.';
            }
            state.сurrentOperation = null;
        },
        addSign: (state, action: PayloadAction<OperationType>) => {
            if (state.enteredNumber && state.enteredNumber[state.enteredNumber.length - 1] !== '.') {
                state.сurrentOperation = action.payload;
                state.expression.push(state.enteredNumber);
                state.expression.push(action.payload);
                state.enteredNumber = null;
            }
        },
        totalCount: (state) => {
            let result;
            if (state.enteredNumber) {
                state.expression.push(state.enteredNumber);
            }
            if (state.expression.length >= 3) {
                result = state.expression.reduce((sum, item, index, array) => {
                    if (index >= 1) {
                        switch (array[index - 1]) {
                            case '+': {
                                sum += +item;
                                break;
                            }
                            case '-': {
                                sum -= +item;
                                break;
                            }
                            case 'x': {
                                sum *= +item;
                                break;
                            }
                            case '/': {
                                if (+item !== 0) {
                                    sum /= +item
                                } else {
                                    state.error = 'Не определено';
                                }
                                break;
                            }
                        }
                    } else {
                        sum += +item;
                    }

                    return sum;
                }, 0)
                state.result = +result.toString().slice(0, 11);
                state.enteredNumber = state.result.toString();
                state.expression = [];
                state.сurrentOperation = null;
            }
        },
        resetData: (state) => {
            state.result = 0;
            state.enteredNumber = null;
            state.сurrentOperation = null;
            state.expression = [];
            state.error = null;
        },
    },
})

export const selectResult = (state: RootState) => state.calculator.result;
export const selectEnteredNumber = (state: RootState) => state.calculator.enteredNumber;
export const selectExpression = (state: RootState) => state.calculator.expression;
export const selectError = (state: RootState) => state.calculator.error;

export const { createNumber, addSign, totalCount, resetData } = calculatorSlice.actions;

export default calculatorSlice.reducer;