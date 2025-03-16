import { Container, Row, Tab, Tabs } from "react-bootstrap";

import style from './styles.module.css';
import { LoginForm } from "./login-form/login-form";
import { RegisterForm } from "./register-form/register-form";

export const StartPage = () => {
    return (
        <Container fluid className={style.container}>
            <Row>
                <Tabs
                    defaultActiveKey="login"
                    className={style.customNavtab}
                    fill
                >
                    <Tab eventKey="login" title="Login">
                        <LoginForm />
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <RegisterForm />
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    )
}