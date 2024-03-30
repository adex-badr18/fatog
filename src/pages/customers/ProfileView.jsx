import { useRef, useState, useEffect } from 'react';
import { Stack, Box, HStack, VStack, SimpleGrid, Heading, Text, Button, IconButton, Icon, Spinner, Tooltip, Card, CardBody, useDisclosure } from '@chakra-ui/react';
import Breadcrumb from '../../components/Breadcrumb';
import { HiOutlinePlus } from "react-icons/hi";
import { Link as RouterLink, useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiError } from "react-icons/bi";
import { FaRegThumbsUp, FaUserCheck, FaUserXmark } from "react-icons/fa6";
import Modal from '../../components/Modal';
import { requireAuth } from '../../hooks/useAuth';
import { useToastHook } from '../../hooks/useToast';
import { isUnauthorized } from '../../utils';
import { getCustomer } from '../../api/customers';
import useAuth from '../../hooks/useAuth';
import UserField from '../../components/UserField';
import FetchError from '../../components/FetchError';
import Back from '../../components/Back';

export async function loader({ request }) {
    await requireAuth(request);
    const customer = await getCustomer();

    console.log(customer);

    if (customer.error || customer.message) {
        return {
            error: customer.error,
            message: customer.message,
            statusCode: customer.statusCode
        };
    }

    return customer;
}

const ProfileView = () => {
    const customer = useLoaderData();
    const { user } = customer;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [toastState, setToastState] = useToastHook();
    const [error, setError] = useState({
        error: customer.error ?? '',
        message: customer.message ?? '',
        statusCode: customer.statusCode ?? '',
    });

    const breadcrumbData = [
        { name: 'Home', ref: '/dashboard' },
        { name: 'Profile', ref: `/profile` },
    ];

    useEffect(() => {
        if (customer.error || customer.message) {
            setToastState({
                title: customer.error,
                description: customer.message,
                status: 'error',
                icon: <Icon as={BiError} />
            });

            setTimeout(() => {
                isUnauthorized(error, navigate, pathname);
            }, 6000);
        }
    }, []);

    const getUserInfoArray = (user, customer) => {
        const userData = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: user.email,
            gender: customer.gender,
            phoneNumber: customer.phoneNumber,
            shippingAddress: customer.shippingAddress
        };
        const userInfoArray = [];
        const fieldKeys = ['firstName', 'lastName', 'email', 'gender', 'phoneNumber',  'shippingAddress'];

        for (const [key, value] of Object.entries(userData)) {
            const find = fieldKeys.find(fieldKey => fieldKey === key);

            if (find) {
                if (key === 'status') {
                    userInfoArray.push({ key, value: value ? 'Active' : 'Inactive' })
                }
                userInfoArray.push({ key, value });
            }
        }

        return userInfoArray;
    }

    return (
        error.error || error.message ?
            <FetchError error={error} /> :
            <Stack spacing='6'>
                <Stack direction={{base: 'column', sm: 'row'}} justifyContent='space-between' alignItems='center'>
                    <Breadcrumb linkList={breadcrumbData} />
                    <Back />
                </Stack>
                <HStack justifyContent='space-between'>
                    <Heading fontSize={{ base: '2xl', md: '3xl' }} color='blue.700'>User</Heading>
                    <HStack>
                        <Tooltip hasArrow label='Edit Profile' placement='bottom' borderRadius='md'>
                            <IconButton as={RouterLink} size={{ base: 'sm', md: 'md' }} to='/profile/update' state={{ customer }} icon={<LiaUserEditSolid />} colorScheme='orange' />
                        </Tooltip>

                        <Tooltip hasArrow label='Change Password' placement='bottom' borderRadius='md'>
                            <IconButton as={RouterLink} size={{ base: 'sm', md: 'md' }} to='/profile/change-password' icon={<MdOutlineEdit />} colorScheme='purple' />
                        </Tooltip>

                    </HStack>
                </HStack>

                <Box marginTop='8'>
                    <Card variant='elevated'>
                        <CardBody>
                            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                                {
                                    getUserInfoArray(user, customer).map((field, index) => (
                                        <UserField key={index} field={field} />
                                    ))
                                }
                            </SimpleGrid>
                        </CardBody>
                    </Card>
                </Box >
            </Stack >
    )
}

export default ProfileView