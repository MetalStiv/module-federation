import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";

import style from './style.module.css';
import { registerFormScheme } from "../../../constants/form-validations-schemes";
import { userCleanMicroservice } from "../../../constants/axios-microservices";
import { useState } from "react";

export const RegisterForm = () => {
    const [isRegistrationEmailError, setIsRegistrationEmailError] = useState(false);
    const [isRegistrationCompleted, setIsRegistrationComplited] = useState(false);

    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm: '',
        },
        onSubmit: async (values) => {
            setIsRegistrationEmailError(false);
            setIsRegistrationComplited(false);
            let res = await userCleanMicroservice.post('register', {
                email: values.email,
                password: values.password
            });
            if (res.status === 520){
                setIsRegistrationEmailError(true)
            }
            if (res.status === 200){
                setIsRegistrationComplited(true)
            }
        },
        validationSchema: registerFormScheme 
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
                        <Form.Label className={style.fieldLabel} value={form.values.password}>Password</Form.Label>
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

            <Form.Group className={style.formRow}>
                <Row>
                    <Col md={2}>
                        <Form.Label className={style.fieldLabel} value={form.values.confirm}>Confirmation</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            id='confirm'
                            name='confirm'
                            type="password"
                            value={form.values.confirm}
                            onChange={form.handleChange}
                            isInvalid={form.touched.confirm && Boolean(form.errors.confirm)}
                            onBlur={form.handleBlur}
                        />
                        {form.touched.confirm && form.errors.confirm && (
                            <Form.Control.Feedback type="invalid">
                                {form.errors.confirm}
                            </Form.Control.Feedback>
                        )}
                    </Col>
                </Row>
            </Form.Group>

            {
                isRegistrationEmailError && <small className={style.error}>User with such email has already been regstred!</small>
            }
            {
                isRegistrationCompleted && <small className={style.success}>User has been registered!</small>
            }

            <Button onClick={form.submitForm} style={{width: '100%', marginTop: '2vh'}}>SignIn</Button>
        </Form>
    )
}