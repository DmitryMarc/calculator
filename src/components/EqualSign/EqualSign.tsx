import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { totalCount } from "../../redux/features/calculator/calculatorSlice"
import { selectIsRuntime } from "../../redux/features/mode/modeSlice"
import styles from './EqualSign.module.css'

const EqualSign: FC = () => {
    const isRuntime = useSelector(selectIsRuntime);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        if (isRuntime) {
            dispatch(totalCount());
        }
    }
    return (
        <div className={styles.equal} onClick={onClickHandler}>
            <span className={styles.sumbol}>=</span>
        </div>
    )
}

export default EqualSign;
