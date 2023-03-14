import { FC } from "react";
import styles from './Modes.module.css';

import { useDispatch, useSelector } from "react-redux";
import constructor from '../../assets/icons/constructor.svg';
import runtime from '../../assets/icons/runtime.svg';
import { resetData } from "../../redux/features/calculator/calculatorSlice";
import { changeMode, selectIsRuntime } from "../../redux/features/mode/modeSlice";
import { InitialState } from "../Calculator/Calculator";

type PropsType = {
    columns: InitialState
}

const Modes: FC<PropsType> = ({ columns }) => {
    const isRuntime = useSelector(selectIsRuntime);
    const dispatch = useDispatch();
    const onClickRuntime = () => {
        if (columns["list-2"].list.length < 4) {
            alert('Калькулятор собран не полностью!');
        } else {
            dispatch(changeMode(true));
        }
    }
    const onClickConstructor = () => {
        dispatch(resetData());
        dispatch(changeMode(false));
    }
    return (
        <div className={styles.modes}>
            <button className={`${styles.btn} ${isRuntime && styles.active}`} onClick={onClickRuntime}>
                <span className={styles.content}>
                    <img src={runtime} alt="runtime" />
                    <span className={styles.title}>Runtime</span>
                </span>
            </button>
            <button className={`${styles.btn} ${!isRuntime && styles.active}`} onClick={onClickConstructor}>
                <span className={styles.content}>
                    <img src={constructor} alt="constructor" />
                    <span className={styles.title}>Constructor</span>
                </span>
            </button>
        </div>
    )
}

export default Modes;
