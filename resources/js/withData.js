import React, {useEffect, useState} from 'react';
import { loadPizza } from './api';
import { Loading } from './components/Loading';

export const withData = (WrappedComponent) => {
    return ({children}) => {
        const [data, setData] = useState();
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(()=>{

            const fetchData = async()=>{
                try{
                    let loaded = await loadPizza();
                    let pizzas = [];
                    loaded.forEach( pizza => {
                        const {name, description, usd, euro, img} = pizza;
                        pizzas = [
                            ...pizzas,
                            {
                                name,
                                description,
                                price: {
                                    USD: usd,
                                    EURO: euro
                                },
                                image: img,
                            }
                        ]
                    })
                    setData({pizzas});
                }catch(err){
                    setError(err);
                }
                setIsLoading(false);
            }

            fetchData();
        }, [])

        if(isLoading){
            return <Loading />
        }
        if(error){
            return <div>{error.message}</div>
        }

        return (
            <WrappedComponent initialState={data}>
                { children }
            </WrappedComponent>
        )
    }

}
