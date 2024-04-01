import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Stack } from '@chakra-ui/react';
import { requireAuth } from '../hooks/useAuth';

export const loader = async ({ request }) => {
    await requireAuth(request);
    const loggedInUser = JSON.parse(sessionStorage.getItem('user')) ?? null;

    return loggedInUser;
}

const Dashboard = () => {
    const user = useLoaderData();

    return (
        <Box p='6'>Customer Dashboard</Box>
    )
}

export default Dashboard