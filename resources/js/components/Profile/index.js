import React, {useState} from 'react';
import { AppLayout } from '../AppLayout';
import { CheckoutContainer } from '../../styles';
import { ProfileForm } from './ProfileForm';
import { saveAddress } from '../../api'
import { useAppState } from '../../Contexts/AppState';
import { Redirect } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const Profile = () => {
    const { state } = useAppState();
    const [message, setMessage] = useState('');

    if(!state.user.id){
        return <Redirect to="/login" />
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
                    </TabList>
                    <TabPanel>
                        <ProfileForm submit={handleSubmit}/>
                    </TabPanel>
                    <TabPanel>
                        <div>Order History</div>
                    </TabPanel>
                </Tabs>
            </CheckoutContainer>
            <p>{message}</p>
        </AppLayout>
    )
}

