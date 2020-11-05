import React , {useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FormField } from '../FormField'
import { MainButton, FormFieldContainer } from '../../styles'
import { withContacts } from '../../withContacts';


const validationSchema = yup.object().shape({
    name: yup.string().required('Enter your name'),
    lastName: yup.string().required('Enter your last name'),
    phone: yup.string().required()
            .matches(/^\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, 'Phone must have 10 numbers'),
    street: yup.string().required('Please add street'),
    house: yup.number().typeError('Please, enter house').required().positive().integer(),
    apartment: yup.number().typeError('Please, enter apartment').required().positive().integer()
})

const CheckoutFormComponent = ( {submit = async () => {}, contacts} ) => {
    const {phone, house, street, building, apartment, name, lastName} = contacts;

    const [nameValue, setName] = useState(name);
    const [lastNameValue, setLastName] = useState(lastName);
    const [phoneValue, setPhone] = useState(phone);
    const [houseValue, setHouse] = useState(house);
    const [streetValue, setStreet] = useState(street);
    const [buildingValue, setBuilding] = useState(building);
    const [apartmentValue, setApartment] = useState(apartment);

    const {register, errors, handleSubmit} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });


    return(
        <form onSubmit={handleSubmit(submit)} style={{flexGrow: 1}}>
            <h3>Contacts:</h3>
            <FormFieldContainer>
                    <div>
                        <FormField 
                            name="name"
                            label="Name"
                            type="text"
                            inputRef={register}
                            errors={errors.name}
                            onChange = { e => setName(e.target.value)}
                            value={nameValue || name}
                        />
                    </div>
                    <div>
                        <FormField 
                            name="lastName"
                            label="Last name"
                            type="text"
                            inputRef={register}
                            errors={errors.lastName}
                            onChange = { e => setLastName(e.target.value)}
                            value={lastNameValue || lastName}
    
                        />
                    </div>
                    <div>
                        <FormField
                        name="phone"
                        label="Phone"
                        type="tel"
                        inputRef={register}
                        errors={errors.phone}
                        onChange = { e => {
                            let value = e.target.value;
                            if(e.nativeEvent.inputType === 'deleteContentBackward'){
                                return setPhone(value);
                            }
                            let result = value
                                .replace(/[\s\D]/g, "")
                                .replace(/^(\d{1,2})/g, `($1`)
                                .replace(/^(\(\d{3})/g, '$1)')
                                .replace(/^(\(\d{3}\))(\d{1,3})$/g, '$1 $2')
                                .replace(/^(\(\d{3}\))(\d{3})(\d{1,2})$/g, '$1 $2-$3')
                                .replace(/^(\(\d{3}\))(\d{3})(\d{2})(\d{1,2})$/g, '$1 $2-$3-$4')
                                .substr(0, 15)
                            
                            setPhone(result);
                        }}
                        value={phoneValue || phone}
                        />
                    </div>
            </FormFieldContainer>
        <h3>Delivery Address</h3>
        <div>
            <FormField 
                name="street"
                label="Street"
                type="text"
                inputRef={register}
                errors={errors.street}
                onChange = { e => setStreet(e.target.value)}
                value={streetValue || street}
    
            />
        </div>
        <FormFieldContainer>
            <div>
                <FormField 
                    name="house"
                    label="House"
                    type="text"
                    inputRef={register}
                    errors={errors.house}
                    style={{flexBasis: '200px'}}
                    onChange = { e => setHouse(e.target.value)}
                    value={houseValue || house}
    
                />
            </div>
            <div>
                <FormField
                    name="building"
                    label="Building"
                    type="text"
                    inputRef={register}
                    style={{flexBasis: '200px'}}
                    onChange = { e => setBuilding(e.target.value)}
                    value={buildingValue || ''}
    
                />
            </div>
            <div>
                <FormField
                    name="apartment"
                    label="Apart"
                    type="text"
                    inputRef={register}
                    errors={errors.apartment}
                    style={{flexBasis: '200px'}}
                    onChange = { e => setApartment(e.target.value)}
                    value={apartmentValue || apartment}
    
                />
            </div>
        </FormFieldContainer>
        <MainButton as="input" type="submit" value="Submit"/>
        </form>
    )
}

export const CheckoutForm = withContacts(CheckoutFormComponent);