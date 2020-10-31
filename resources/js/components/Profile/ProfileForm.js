import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FormField } from '../FormField';
import { MainButton, FormFieldContainer } from '../../styles';
import { withContacts } from '../../withContacts';

const validationSchema = yup.object().shape({
    phone: yup.string().required()
            .matches(/^\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, 'Phone must have 10 numbers'),
    street: yup.string().required('Please add street'),
    house: yup.number().typeError('Please, enter house number').required().positive().integer(),
    apartment: yup.number().typeError('Please, enter apartment number').required().positive().integer()
})

export const ProfileForm = withContacts( ( {submit = async () => {}, contacts} ) => {
    const {phone, house, street, building, apartment} = contacts;

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
            <h3>Edit your contacts:</h3>
            <FormFieldContainer>
                <FormField
                    name="phone"
                    label="Phone"
                    type="tel"
                    inputRef={register}
                    placeholder="(000) 111-22-33"
                    errors={errors.phone}
                    value={phoneValue || phone}
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
                    style={{flexBasis: "600px"}}
                />
                <FormField 
                    name="street"
                    label="Street"
                    type="text"
                    inputRef={register}
                    errors={errors.street}
                    value={streetValue || street}
                    onChange={ e => setStreet(e.target.value)}
                    style={{flexBasis: "600px"}}
                />
                <FormField 
                    name="house"
                    label="House"
                    type="text"
                    inputRef={register}
                    errors={errors.house}
                    style={{flexBasis: '200px'}}
                    value={houseValue || house}
                    onChange={ e => setHouse(e.target.value)}

                />
                <FormField
                    name="building"
                    label="Building"
                    type="text"
                    inputRef={register}
                    style={{flexBasis: '200px'}}
                    value={buildingValue || building}
                    onChange={ e => setBuilding(e.target.value)}

                />
                <FormField
                    name="apartment"
                    label="Apart"
                    type="text"
                    inputRef={register}
                    errors={errors.apartment}
                    style={{flexBasis: '200px'}}
                    value={apartmentValue || apartment}
                    onChange={ e => setApartment(e.target.value)}

                />
        </FormFieldContainer>
        <MainButton as="input" type="submit" value="Save"/>
        </form>
    )
})