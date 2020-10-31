import React from 'react';
import { MainButton } from '../../styles';
import PropTypes from 'prop-types';

export const Button = ({onClick, children}) => {
    return (
        <MainButton onClick={ onClick }>
            { children }
        </MainButton>
    )
}

Button.propTypes = {
    onClick: PropTypes.func
}