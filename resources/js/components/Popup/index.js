import React from 'react';
import {PopupWindow, PopupWindowContainer, PopupFooter, PopupHeader, MainButton, PopupBody} from '../../styles';

export const Popup = ( {title, children, onClick=()=>{}, buttonText = 'OK'} ) => {
    return (
        <PopupWindowContainer>
            <PopupWindow>
                <PopupHeader>
                    <h3>{title}</h3>
                </PopupHeader>
                <PopupBody>
                    {children}
                </PopupBody>
                <PopupFooter>
                    <MainButton onClick={onClick}>
                        {buttonText}
                    </MainButton>
                </PopupFooter>
            </PopupWindow>
        </PopupWindowContainer>
    )
}