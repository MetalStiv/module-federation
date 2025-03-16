import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";

import style from './style.module.css';
import { loginFormScheme } from "../../../constants/form-validations-schemes";
import { login } from "../../../helpers/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../../stores/root-store";

export const LoginForm = observer(() => {
    const navigate = useNavigate();
    const [isInvalidUserError, setIsInvalidUserError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    
    const form = useFormik({
        initialValues: {
            email: '',
            password: ''
          },
          onSubmit: async (values) => {
            setIsInvalidUserError(false);
            setIsPasswordError(false);
            try{
                await login(values, () => rootStore.userStore.setLoginStatus(true));
                
                navigate('/home');
            }
            catch(errorCode){
                if (errorCode === 520){
                    setIsInvalidUserError(true)
                }
                if (errorCode === 521){
                    setIsPasswordError(true)
                }
            }
        },
        validationSchema: loginFormScheme
    });

    return (
        <Form noValidate onSubmit={form.submitForm}>
            <Form.Group>
                <Row>
                    <Col md={2}>
                        <Form.Label className={style.fieldLabel}>Email</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control 
                            id='email'
                            name='email'
                            type="email" 
                            placeholder="name@example.com" 
                            value={form.values.email}
                            onChange={form.handleChange}
                            isInvalid={form.touched.email && Boolean(form.errors.email)}
                            onBlur={form.handleBlur}
                        />
                        {form.touched.email && form.errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {form.errors.email}
                            </Form.Control.Feedback>
                        )}
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className={style.formRow}>
                <Row>
                    <Col md={2}>
                        <Form.Label className={style.fieldLabel}>Password</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            id='password'
                            name='password'
                            type="password"
                            value={form.values.password}
                            onChange={form.handleChange}
                            isInvalid={form.touched.password && Boolean(form.errors.password)}
                            onBlur={form.handleBlur}
                        />
                        {form.touched.password && form.errors.password && (
                            <Form.Control.Feedback type="invalid">
                                {form.errors.password}
                            </Form.Control.Feedback>
                        )}
                    </Col>
                </Row>
            </Form.Group>

            {
                isPasswordError && <small className={style.error}>Incorrect password!</small>
            }
            {
                isInvalidUserError && <small className={style.error}>User with such name does not exist!</small>
            }

            <Button onClick={form.submitForm} style={{width: '100%', marginTop: '2vh'}}>SignIn</Button>
        </Form>
    )
})