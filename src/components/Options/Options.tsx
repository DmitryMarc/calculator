import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSign, OperationType } from "../../redux/features/calculator/calculatorSlice"
import { selectIsRuntime } from "../../redux/features/mode/modeSlice"
import styles from './Options.module.css'

const Options: FC = () => {
    const isRuntime = useSelector(selectIsRuntime)
    const dispatch = useDispatch();
    const onClickHandler = (sign: OperationType) => {
        if (isRuntime){
            dispatch(addSign(sign));
        }
    }
    const optionsList = ['/', 'x', '-', '+'].map((item) => (
        <div key={item} className={styles.btn} onClick={() => onClickHandler(item as OperationType)}>
            <span className={styles.action}>{item}</span>
        </div>
    ))
    return (
        <>
            {optionsList}
        </>
    )
}

export default Options
