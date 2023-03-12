import { FC, useState } from "react"
import styles from './Modes.module.css';

import runtime from '../../assets/icons/runtime.svg';
import constructor from '../../assets/icons/constructor.svg';

const Modes: FC = () => {
    const [isRuntime, setIsRuntime] = useState(false);
    return (
        <div className={styles.modes}>
            <button className={`${styles.btn} ${isRuntime && styles.active}`} onClick={() => setIsRuntime(true)}>
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
