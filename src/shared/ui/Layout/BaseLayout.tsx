import React, {useState} from "react";
import {Layout, Menu, theme} from "antd";
import {useNavigate} from 'react-router-dom'
import {useTypedSelector} from "../../../features/user/model/useTypedSelector";
import {useActions} from "../../../app/store/reducers/auth/hooks/useActions";

interface LayoutProps {
    children: React.ReactNode;
    items: {
        name: string;
        link?: string;
        logout?: () => {};
    }[]
}

export const BaseLayout = ({children, items}: LayoutProps) => {
    const height = window.innerHeight
    const {Header, Content, Footer, Sider} = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate()
    const {auth} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions()
    return (
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {items.map((link) =>
                            <Menu.Item key={link.name} onClick={() => navigate(link.link)}>{link.name}</Menu.Item>)
                    }
                    {auth && (
                        <Menu.Item onClick={logout}>Выйти из учетной записи</Menu.Item>
                    )}
                </Menu>
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
                    Deb Kofe ©{new Date().getFullYear()} Создан Deb Kofe IDA
                </Footer>
            </Layout>
        </Layout>

    );
}
