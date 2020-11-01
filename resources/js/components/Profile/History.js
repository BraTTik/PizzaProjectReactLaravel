import React, { useEffect, useState } from 'react';
import { getHistory } from '../../api';
import { useAppState } from '../../Contexts/AppState';
import { Loader } from '../Loading/Loader';
import { HistoryItem } from './HistoryItem';


export const History = () => {
    const { state } = useAppState();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        let isMounted = true;
        const loadData = async () =>{
            const data = await getHistory(state.user.id);
            if(data){
               isMounted && setOrders(data);
            }
            isMounted && setIsLoading(false);
        } 

        loadData();

        return () => {
            isMounted = false;
        }
    }, []);

    if(isLoading){
        return <Loader />
    }
    return (
        <>
            {orders.length > 0 ? (
                orders.map( order => {
                    return <HistoryItem key={order.id} {...order}/>
                })

            ) : (
                <div>You haven't ordered anything</div>
            )}
        </>
    )
}