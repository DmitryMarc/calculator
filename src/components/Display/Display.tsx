import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectEnteredNumber, selectError, selectExpression } from '../../redux/features/calculator/calculatorSlice';
import { selectIsRuntime } from '../../redux/features/mode/modeSlice';
import styles from './Display.module.css';

const getDisplayStyle = (value: boolean) => ({
    fontSize: value ? '19px' : '36px'
})

const Display: FC = () => {
    const isRuntime = useSelector(selectIsRuntime);
    const enteredNumber = useSelector(selectEnteredNumber);
    const expression = useSelector(selectExpression);
    const error = useSelector(selectError);
    let visibility = '0'
    if (isRuntime && !error) {
        if (enteredNumber) {
            visibility = enteredNumber;
        } else if (expression.length > 1) {
            visibility = expression[expression.length - 2];
        }
    } else if (isRuntime && error) {
        visibility = error;
    }
    return (
        <div className={styles.display}>
            <div className={styles.value} style={getDisplayStyle(visibility === error)}>
                {visibility}
            </div>
        </div>
    )
}

export default Display
