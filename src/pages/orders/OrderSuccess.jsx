import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const { state } = useLocation();
    console.log(state.order);

    return (
        <div>OrderSuccess</div>
    )
}

export default OrderSuccess;