import React, { useState } from 'react';
import { AppLayout } from '../AppLayout';
import { LoginContainer, FormContainer } from '../../styles';
import { LoginForm } from './LoginForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { SignUpForm } from './SignUpForm';
import { register, login} from '../../api';
import { Redirect } from 'react-router-dom';
import { useAppState } from '../../Contexts/AppState';
import { LOGIN } from '../../Contexts/AppStateActions';
import { withRouter } from 'react-router-dom';
import './TabStyles.css';

const saveUser = ( user ) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}

const LoginComponent = ( {history}) => {
    const [error, setError] = useState('');
    const { dispatch } = useAppState();


    const LoginSubmit = async (data) => {
       const result = await login(data);
       if(result.success === 'ok'){
           const user = result.user;
           dispatch({type: LOGIN, payload: user});
           saveUser(user);
           history.push("/");
       }else{
           setError('Email and password doesn\'t match')
       }
    }

    const SignUpSubmit = async (data) => {
        const result = await register(data);
        console.log(result);
        if(result.success == "ok"){
            console.log('OK');
            setError('');
            history.push('/');
        }else{
            setError({message: 'Email exists already' })
        }
    }
    const clearError = () => {
        setError('');
    }
    return (
        <AppLayout>
            <LoginContainer>
                <FormContainer>
                    <Tabs>
                        <TabList className="tabs">
                            <Tab className="tabs_tab" onClick={clearError}>Sign in</Tab>
                            <Tab className="tabs_tab" onClick={clearError}>Sign up</Tab>
                        </TabList>
                        <TabPanel>
                            <LoginForm submit={LoginSubmit} errorForm={error}/>
                        </TabPanel>
                        <TabPanel>
                            <SignUpForm submit={SignUpSubmit} errorForm={error}/>
                        </TabPanel>
                    </Tabs>
                </FormContainer>
            </LoginContainer>
        </AppLayout>
    )
}

export const Login = withRouter(LoginComponent);