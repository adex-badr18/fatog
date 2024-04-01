import React from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';

const OrderSuccess = () => {
    const { state } = useLocation();
    console.log(state.order);

    return (
        <Stack p='6'>OrderSuccess</Stack>
    )
}

export default OrderSuccess;