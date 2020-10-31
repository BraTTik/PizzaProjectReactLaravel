import React from 'react';
import { AppContainer, MainContainer, Header, HeaderContent, Title }from '../styles'
import { UserPanel } from './UserPanel';
import { Link } from 'react-router-dom'

export const AppLayout = ( { children }) => {
    return (
        <AppContainer>
            <Header>
                <MainContainer>
                    <HeaderContent>
                        <Title>
                            <Link to="/">Mama Mia</Link>
                        </Title>
                        <UserPanel />
                    </HeaderContent>
                </MainContainer>
            </Header>
            <MainContainer>
                { children }
            </MainContainer>
        </AppContainer>
    )
}