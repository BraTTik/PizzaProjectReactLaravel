import React from 'react';
import './FormField.css';

export const FormField = ({ 
    name, 
    label, 
    normalize = (value) => value, 
    inputRef, 
    errors, 
    style,
    className = '',
    value = '',
    ...inputParams}) => {
    return (
        <div className={`form-field-wrapper ${errors&&"is-error"}`} style={style}>
            <div className="form-field">
                <input 
                    className={`form-input ${((!errors&&value!=='') || value.length > 0)&&"valid"} ${errors&&"is-error"}`}
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
                    value={value}
                    {...inputParams}
                />
                <label className={`form-label ${errors&&"is-error"}`} id={`${name}-label`} htmlFor={name}>
                    <span>{ label }</span>
                </label>
                <p className="form-error">{errors && errors.message}</p>
            </div>
        </div>
    )
}