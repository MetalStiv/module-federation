import * as Yup from 'yup';

export const loginFormScheme = Yup.object().shape({
    email: Yup.string()
        .required('Email is required!')
        .email('Invalid email!')
        .max(40, 'Email is too long!'),
    password: Yup.string()
        .required('Password is required!')
        .min(4, 'Password too short!')
        .max(20, 'Password too long!'),
})

export const registerFormScheme = loginFormScheme.shape({
    confirm: Yup.string()
        .required('Password confirmation is required!')
        .oneOf([Yup.ref('password')], 'Passwords must match!'),
})

export const updateTransactionFormScheme = Yup.object().shape({
    input: Yup.boolean()
        .required('Type is required!'),
    amount: Yup.number()
        .required('Amount is required!'),
        dateTime: Yup.number()
        .min(1, 'Datetime is required'),
    comment: Yup.string()
        .max(200, 'Comment is too long!'),
})