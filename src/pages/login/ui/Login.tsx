import React from "react";
import {LoginForm} from "../../../features/user/ui/LoginForm/LoginForm";
import {Card} from "antd";
import * as styles from './Login.module.scss'

export const Login = () => {
    return (
        <div className={styles.block}>
            <Card>
                <LoginForm className={styles.block_login}/>
            </Card>

        </div>
    )
}
export default Login