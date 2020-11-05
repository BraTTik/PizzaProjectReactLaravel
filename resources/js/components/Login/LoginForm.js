import React, {useState} from 'react';
import { FormField } from '../FormField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { MainButton } from '../../styles';
import { Link } from 'react-router-dom';

const validationScheme = yup.object().shape({
    email: yup.string().email('Enter email').required(),
    password: yup.string().required('Enter password'),
})

export const LoginForm = ( { submit = async () => {}, errorForm }) => {
    const {register, errors, handleSubmit} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationScheme),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <form action="POST" onSubmit={handleSubmit(submit)}>
            <FormField 
                name="email"
                type="email"
                inputRef={register}
                label="Email"
                errors={errors.email}
                value={email}
                onChange={ e => setEmail(e.target.value)}
            />
            <FormField 
                name="password"
                type="password"
                inputRef={register}
                label="Password"
                errors={errors.password}
                value={password}
                onChange={ e => setPassword(e.target.value)}
            />
            <div style={{ textAlign: "right", color: "gray"}}>
                <Link to="#">
                    forgot password?
                </Link>
            </div>
            <p className="form-error">{errorForm}</p>
            <MainButton as="input" type="submit" value="Sign in"/>
        </form>
    )
}