import React, {FC, useState} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../app/store/StoreProvider";
import {useTypedSelector} from "../../model/useTypedSelector";
import {useActions} from "../../../../app/store/reducers/auth/hooks/useActions";

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
}
export const LoginForm = (className) => {
    const dispatch = useDispatch<AppDispatch>(); // Правильная типизация dispatch
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {error, isLoading} = useTypedSelector(state => state.authReducer);
    const {login} = useActions()
    const submit = () => {
        login(username, password);
    };

    return (
        <div className={className}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                autoComplete="off"
                onFinish={submit}
            >
                {error && <div
                    style={{color: 'red'}
                    }>
                    {error}
                </div>}
                <Form.Item<FieldType>
                    label="Имя"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите свое имя!'}]}
                >
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста, введите свой пароль!'}]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}