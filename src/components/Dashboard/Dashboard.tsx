import { FC } from "react"
import Display from "../Display/Display"
import EqualSign from "../EqualSign/EqualSign"
import Numbers from "../Numbers/Numbers"
import Options from "../Options/Options"

const Dashboard: FC = () => {
    return (
        <>
            <Display />
            <Options />
            <Numbers />
            <EqualSign />
        </>
    )
}

export default Dashboard
