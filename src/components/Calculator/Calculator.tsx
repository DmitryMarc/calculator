import { FC } from "react";
import Constructor from "../Constructor/Constructor";
import Dashboard from "../Dashboard/Dashboard";
import Modes from "../Modes/Modes";

import styles from "./Calculator.module.css"

const Calculator: FC = () => {
    return (
        <div className={styles.calculator}>
            <Modes />
            <Dashboard />
            <Constructor />
        </div>
    )
}

export default Calculator;