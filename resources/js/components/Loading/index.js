import React from 'react';
import { AppLayout } from '../AppLayout';
import { LoaderContainer,} from '../../styles';
import { Loader } from './Loader';

export const Loading = () => {
    return (
        <AppLayout>
            <LoaderContainer>
                <Loader />
           </LoaderContainer>
        </AppLayout>
    )
}