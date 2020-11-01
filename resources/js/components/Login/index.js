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
import { Popup } from '../Popup';

const saveUser = ( user ) => {
    sessionStorage.setItem('user', JSON.stringify(user));
}

const LoginComponent = ( {history}) => {
    const [error, setError] = useState('');
    const { state, dispatch } = useAppState();
    const [isDisplayPopup, setIsDisplayPopup] = useState(true);

    const closePopup = () => {
        setIsDisplayPopup(false);
    }
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
        if(result.success == "ok"){
            setError('');
            dispatch({type: LOGIN, payload: result.user})
        }else{
            setError({message: 'Email exists already' })
        }
    }

    const clearError = () => {
        setError('');
    }

    if(state.user.id){
        return <Redirect to="/profile" />
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
            {isDisplayPopup && 
                <Popup title="Warning" onClick={closePopup}>
                    <p>This is test app!</p>
                    <p><strong>Do Not Use Real Emails and Passwords!</strong></p>
                </Popup>}
        </AppLayout>
    )
}

export const Login = withRouter(LoginComponent);