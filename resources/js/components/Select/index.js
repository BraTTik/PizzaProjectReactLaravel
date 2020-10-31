import React from 'react';
import { CustomSelect } from '../../styles';
import PropTypes from 'prop-types';

export const Select = ( { options, changeHandler, activeValue}) => {

    return (
        <CustomSelect>
            <select onChange={changeHandler} value={activeValue}>
                { options.map( (option, i) => (
                    <option key={option+i}>{option}</option>
                ))}
            </select>
        </CustomSelect>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    changeHandler: PropTypes.func,
    activeValue: PropTypes.string,
}