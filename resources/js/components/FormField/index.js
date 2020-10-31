import React, { useState } from 'react';
import './FormField.css';

export const FormField = ({ 
    name, 
    label, 
    normalize = (value) => value, 
    inputRef, 
    errors, 
    style,
    defaultValue = '',
    ...inputParams}) => {
    return (
        <div className="form-field" style={style}>
            <label className="form-label" id={`${name}-label`} htmlFor={name}>{ label }</label>
            <input 
                className={`form-input ${errors&&"is-error"}`}
                aria-labelledby={`${name}-label`}
                name={name}
                id={name}
                ref={inputRef}
                onChange = { e => {
                        if(e.nativeEvent.inputType === 'deleteContentBackward'){
                            return e.target.value;
                        }
                        e.target.value = normalize(e.target.value);
                    }
                }
                {...inputParams}
            />
            <p className="form-error">{errors && 'Error: ' + errors.message}</p>
        </div>
    )
}