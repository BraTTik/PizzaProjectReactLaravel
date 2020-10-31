import React , {useState} from 'react'
import { useAppState } from '../../Contexts/AppState';
import { AppLayout } from '../AppLayout';
import { OrderContainer } from '../../styles';
import { Redirect, withRouter } from 'react-router-dom';
import { Total, MainButton } from '../../styles';
import { placeOrder } from '../../api';
import { useCart } from '../../Contexts/CartContext';
import { Popup } from '../Popup';

const OrderComponent = ({history}) => {
    const { state } = useAppState();
    const { clearCart } = useCart();
    const { order } = state;
    if(!order.id){
        return <Redirect to="/"/>;
    }
    console.log(order);
    const [isPopup, setIsPopup] = useState(false);

    const popupHandler = () => {
        setIsPopup(false);
        history.push('/');
    }

    const placeOrderHandler =  async() => {
        
        const result = await placeOrder({user_id: state.user.id, ...order});
        if(result.success === 'ok'){
            clearCart();
            setIsPopup(true);
        }else{
            console.log(result.error);
        }
    }
    return (
        <AppLayout>
            <OrderContainer>
                <h2>Order #{order.id}</h2>
                <div>
                    <h3>Customer contacts</h3>
                    <ul>
                        <li><strong>Name:</strong> {order.user.name}</li>
                        <li><strong>Phone:</strong> {order.user.phone}</li>
                        <li><strong>Delivery Address:</strong> {`${order.user.street}, ${order.user.house}${order.user.building&&'/'+order.user.building} apart: ${order.user.apartment}`}</li>
                    </ul>
                </div>
                <div>
                    <h3>Order details:</h3>
                    <ul>
                        {order.details.pizzas.map( (pizza, i) =>(
                            <li key={pizza.name + i}><strong>{pizza.amount} ✖ {pizza.name}</strong></li>
                        ))}
                    </ul>
                    <Total>Total: {order.details.currency === 'EURO' ? '€' : '$'}{order.details.total}</Total>
                </div>
                <div style={{textAlign: "right"}}>
                    <MainButton onClick={placeOrderHandler}>
                        Place Order
                    </MainButton>
                </div>
            </OrderContainer>
            {
                isPopup
                &&(
                    <Popup title="Order placed" onClick={popupHandler}>
                        <p>Your order is placed!</p>
                        <p>Wait for a call to confirm all details.</p>
                    </Popup>
                )
            }
        </AppLayout>
    )
}

export const Order = withRouter(OrderComponent);