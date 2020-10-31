import React, { useEffect, useState } from 'react';
import {contacts} from './api';
import { useAppState } from './Contexts/AppState';


export const withContacts = (WrappedComponent) => {
    return (props) => {
        const [contact, setContact] = useState({
            phone: '',
            house: '', 
            street: '',
            building: '', 
            apartment: '',
            name: '',
            lastName: '',
        });
        const { state } = useAppState();

        useEffect(()=>{
            const fetchContacts = async (id) => {
                const data = await contacts(id);
                const contactData = {
                    ...data,
                    name: state.user.name,
                    lastName: state.user.lastName,
                }
                setContact(contactData);
            }
            if(state.user.id){
                fetchContacts(state.user.id);
            }
    
        },[]);
        return (
            <WrappedComponent contacts={contact} {...props}>
                {props.children}
            </WrappedComponent>
        )
    }
}