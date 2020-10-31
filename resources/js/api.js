

export const loadPizza = () => {
    return fetch('/api/pizza').then( response => response.json()).catch(console.log);
}

export const register = ( userData ) => {
    return sendData('/api/user/register', userData);
}

export const login = ( userData ) => {
    return sendData('/api/user/login', userData);

}

export const placeOrder = ( data ) => {
    return sendData('/api/order', data);
}

export const getHistory = (id) => {
    return fetch('/api/order/'+id).then(response => response.json()).catch(console.log);
}

export const sendData = ( url, data ) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    }).then( response => response.json()).catch(error => console.log(error.message));
}

export const saveAddress = ( data ) => {
    return fetch(`/api/user/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    }).then( response => response.json()).catch(error => console.log(error.message));

}

export const contacts = (id) => {
    return fetch(`/api/user/contacts/${id}`).then(response => response.json());
}