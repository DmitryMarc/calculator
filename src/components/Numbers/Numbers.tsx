import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNumber, selectEnteredNumber } from "../../redux/features/calculator/calculatorSlice";
import { selectIsRuntime } from "../../redux/features/mode/modeSlice";
import styles from './Numbers.module.css';

const Numbers: FC = () => {
    const isRuntime = useSelector(selectIsRuntime);
    const numberLength = useSelector(selectEnteredNumber)?.length;

    const dispatch = useDispatch();
    const onClickHandler = (value: number | ',') => {
        if ((isRuntime && numberLength && numberLength < 12) || (isRuntime && !numberLength)) {
            dispatch(createNumber(value.toString()));
        }
    }
    const numbersList = [...Array(11)].map((_, index, array) => {
        const value = index !== array.length - 1 ? array.length - 2 - index : ',';
        return (
            <div key={value} className={styles.number} onClick={() => onClickHandler(value)}>
                <span className={styles.sumbol}>{value}</span>
            </div>
        )
    })
    return (
        <>
            {numbersList}
        </>
    )
}

export default Numbers
