import { FC, useState } from "react"
import styles from './Modes.module.css';

import runtime from '../../assets/icons/runtime.svg';
import constructor from '../../assets/icons/constructor.svg';
// import { ColumnsType } from "../Calculator/Calculator";

type PropsType = {
    isRuntime: boolean,
    setIsRuntime: (isRuntime: boolean) => void,
    columns: {
        'list-1': {
            id: string;
            list: {
                id: string;
                component: JSX.Element;
            }[];
        };
        'list-2': {
            id: string;
            list: never[];
        };
    }
}

const Modes: FC<PropsType> = ({isRuntime, setIsRuntime, columns}) => {
    const onClickRuntime = () => {
        if (columns["list-2"].list.length < 4){
            alert('Калькулятор собран не полностью!')
        } else {
            setIsRuntime(true)
        }
    }
    return (
        <div className={styles.modes}>
            <button className={`${styles.btn} ${isRuntime && styles.active}`} onClick={onClickRuntime}>
                <span className={styles.content}>
                    <img src={runtime} alt="runtime" />
                    <span className={styles.title}>Runtime</span>
                </span>
            </button>
            <button className={`${styles.btn} ${!isRuntime && styles.active}`} onClick={() => setIsRuntime(false)}>
                <span className={styles.content}>
                    <img src={constructor} alt="constructor" />
                    <span className={styles.title}>Constructor</span>
                </span>
            </button>
        </div>
    )
}

export default Modes
