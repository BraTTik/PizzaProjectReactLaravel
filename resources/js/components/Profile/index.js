import React, {useState} from 'react';
import { AppLayout } from '../AppLayout';
import { CheckoutContainer, OrderContainer } from '../../styles';
import { ProfileForm } from './ProfileForm';
import { saveAddress } from '../../api'
import { useAppState, unLoadUser } from '../../Contexts/AppState';
import { LOGOUT } from '../../Contexts/AppStateActions';
import { Redirect, withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { History } from './History';

const ProfileComponent = ({ history }) => {
    const { state, dispatch } = useAppState();
    const [message, setMessage] = useState('');

    if(!state.user.id){
        return <Redirect to="/login" />
    }
    const handleLogout = () => {
        dispatch({type: LOGOUT});
        unLoadUser();
        history.push('/');
    }
    const handleSubmit = async (userData) => {
        const data = { id: state.user.id, ...userData}
        const result = await saveAddress(data);
        if(result.success === 'ok'){
            setMessage('Your data saved')
        }else{
            console.log(result.error);
            setMessage('Something happened wrong. Try again later');
        }
    }

    return (
        <AppLayout>
            <CheckoutContainer>
                <Tabs>
                    <TabList className="tabs">
                        <Tab className="tabs_tab">
                            Contacts
                        </Tab>
                        <Tab className="tabs_tab">
                            Order History
                        </Tab>
                        <Tab className="tabs_tab" onClick={handleLogout}>
                            Logout
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <ProfileForm submit={handleSubmit}/>
                    </TabPanel>
                    <TabPanel>
                        <OrderContainer>
                            <History />
                        </OrderContainer>
                    </TabPanel>
                </Tabs>
            </CheckoutContainer>
            <p>{message}</p>
        </AppLayout>
    )
}

export const Profile = withRouter(ProfileComponent);