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
import { Popup } from '../Popup';

const ProfileComponent = ({ history }) => {
    const { state, dispatch } = useAppState();

    const [message, setMessage] = useState('');
    const [isDisplayPopup, setIsDisplayPopup] = useState(false);

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
            setMessage('Your data saved');
            setIsDisplayPopup(true);
        }else{
            console.log(result.error);
            setMessage('Something happened wrong. Try again later');
            setIsDisplayPopup(true);
        }
    }

    const closePopup = () => {
        setIsDisplayPopup(false);
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
                        <Tab className="tabs_tab" onClick={handleLogout} >
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
                   <TabPanel></TabPanel>
                </Tabs>
            </CheckoutContainer>
            {isDisplayPopup && <Popup title="Message" onClick={closePopup}>{message}</Popup>
            }
        </AppLayout>
    )
}

export const Profile = withRouter(ProfileComponent);