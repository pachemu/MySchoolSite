import React, {useState} from "react";
import {Layout, Menu, MenuProps, theme} from "antd";
import {useNavigate} from 'react-router-dom'
import {useTypedSelector} from "../../../features/user/model/useTypedSelector";
import {useActions} from "../../../app/store/reducers/auth/hooks/useActions";
import Joyride, {Step} from "react-joyride";

interface LayoutProps {
    children: React.ReactNode;
    items: {
        name: string;
        link?: string;
        logout?: () => {};
    }[]
}

interface State {
    run: boolean;
    steps: Step[];
}

export const BaseLayout = ({children, items}: LayoutProps) => {
    const height = window.innerHeight
    const {Header, Content, Footer, Sider} = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate()
    const {auth} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions();
    const basicItems: MenuProps['items'] = items.map((item, i: number) => {
        return {
            key: `item-${i}`,
            label: item.name,
            onClick: () => item.link && navigate(item.link),
            id: `${item.name}`,
        };
    });
    const loginItems = [
        auth ?
            {
                key: `logout`,
                label: `Выйти из учетной записи`,
                onClick: logout,
            } :
            {
                key: `login`,
                id: `Авторизоваться`

            }
    ]
    const menuItems: MenuProps['items'] = [
        ...basicItems,
        ...loginItems
    ];
    const baseLocale = {
        skip: <strong aria-label="skip">Пропустить</strong>,
        next: <strong aria-label='next'>Продолжить</strong>,
        back: <strong aria-label='back'>Назад</strong>,
        last: <strong aria-label='last'>Закончить</strong>
    }

    const [{steps, run}, setState] = useState<State>({
        run: true,
        steps: [
            {
                target: '#Конспекты',
                content: 'Все тезисы и правила по физике!',
                placement: "bottom-start",
                locale: baseLocale
            },
            {
                target: '#Конструктор',
                content: 'Приложение позволяющее строить электросхемы',
                placement: "bottom-start",
                locale: baseLocale
            },
            {
                target: '#Тест',
                content: 'Задания по пройденному материалу',
                placement: "bottom-start",
                locale: baseLocale
            },
            {
                target: '#Авторизоваться',
                content: 'Вход для учителя',
                placement: "bottom-start",
                locale: baseLocale
            },
        ]
    })


    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={menuItems}/>

            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '0 16px'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: (height - 180),
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Deb Kofe ©{new Date().getFullYear()} Создан "Ионин Д.А"
                </Footer>
            </Layout>
            <Joyride
                steps={steps}
                run={run}
                showSkipButton
                continuous
            />
        </Layout>
    );
};
