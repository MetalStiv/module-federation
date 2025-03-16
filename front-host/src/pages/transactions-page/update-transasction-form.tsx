import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ITransactionDto } from "../../../../shared/types/dto/transaction-dto";
import { useFormik } from "formik";
import { updateTransactionFormScheme } from "../../constants/form-validations-schemes";
import style from './styles.module.css';
import { transactionMicroservice } from "../../constants/axios-microservices";
import { observer } from "mobx-react-lite";
import { rootStore } from "../../stores/root-store";

export interface IUpdateTransactionFormProps {
    transaction?: ITransactionDto;
}

export const UpdateTransactionForm = observer(({transaction}: IUpdateTransactionFormProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const form = useFormik({
        initialValues: {
            input: transaction ? transaction.input : true,
            amount: transaction ? transaction.amount : 0,
            dateTime: transaction ? transaction.dateTime : Date.now(),
            comment: transaction ? transaction.comment : '' 
        },
        onSubmit: async (values) => {
            try{
                if (transaction){
                    await rootStore.transactionStore.updateTransaction({...values, _id: transaction._id});
                }
                else {
                    await rootStore.transactionStore.addTransaction(values);
                }
                setShow(false);
            }
            catch(errorCode){
                console.log(errorCode)
            }
        },
        validationSchema: updateTransactionFormScheme
    });

    return (
        <>
            <Button style={{width: '100%'}} variant={transaction ? 'warning' : 'outline-primary'} onClick={() => setShow(true)}>
                {!transaction ? '+' : 'Modify'}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{transaction ? 'Update transaction' : 'Add new transaction'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate onSubmit={form.submitForm}>
                        <Form.Group>
                            <Row>
                                <Col md={2}>
                                    <Form.Label className={style.fieldLabel}>Type</Form.Label>
                                </Col>
                                <Col>
                                    <div style={{display: 'flex', width: '100%', gap: 16, marginTop: '5px'}}>
                                        <Form.Check
                                            id='input'
                                            name='input'
                                            type='radio'
                                            label='Input'
                                            defaultChecked={true}
                                            onClick={(e) => form.setFieldValue('input', true)}
                                            isInvalid={form.touched.input && Boolean(form.errors.input)}
                                            onBlur={form.handleBlur}
                                        />
                                        <Form.Check
                                            id='input'
                                            name='input'
                                            type='radio'
                                            label='Output'
                                            onClick={(e) => form.setFieldValue('input', false)}
                                            isInvalid={form.touched.input && Boolean(form.errors.input)}
                                            onBlur={form.handleBlur}
                                        />

                                        {form.touched.input && form.errors.input && (
                                            <Form.Control.Feedback type="invalid">
                                                {form.errors.input}
                                            </Form.Control.Feedback>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className={style.formRow}>
                            <Row>
                                <Col md={2}>
                                    <Form.Label className={style.fieldLabel}>Amount</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        id='amount'
                                        name='amount'
                                        type="string"
                                        value={form.values.amount}
                                        onChange={(e) => form.setFieldValue('amount', parseInt(e.target.value.replace(/[^\d]+/g,'')) || 0)}
                                        isInvalid={form.touched.amount && Boolean(form.errors.amount)}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.amount && form.errors.amount && (
                                        <Form.Control.Feedback type="invalid">
                                            {form.errors.amount}
                                        </Form.Control.Feedback>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className={style.formRow}>
                            <Row>
                                <Col md={2}>
                                    <Form.Label className={style.fieldLabel}>DateTime</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        id='datetime'
                                        name='datetime'
                                        type="datetime-local"
                                        value={new Date(form.values.dateTime - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substring(0, 16)}
                                        onChange={(e) => form.setFieldValue('dateTime',(new Date(e.target.value).getTime()))}
                                        isInvalid={form.touched.dateTime && Boolean(form.errors.dateTime)}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.dateTime && form.errors.dateTime && (
                                        <Form.Control.Feedback type="invalid">
                                            {form.errors.dateTime}
                                        </Form.Control.Feedback>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className={style.formRow}>
                            <Row>
                                <Col md={2}>
                                    <Form.Label className={style.fieldLabel}>Comment</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        id='comment'
                                        name='comment'
                                        type="string"
                                        as="textarea" 
                                        rows={3}
                                        value={form.values.comment}
                                        onChange={form.handleChange}
                                        isInvalid={form.touched.comment && Boolean(form.errors.comment)}
                                        onBlur={form.handleBlur}
                                    />
                                    {form.touched.comment && form.errors.comment && (
                                        <Form.Control.Feedback type="invalid">
                                            {form.errors.comment}
                                        </Form.Control.Feedback>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={form.submitForm}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
})