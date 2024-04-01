import { useRef, useState } from 'react';
import { useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Stack, HStack, Flex, Box, Icon, IconButton, Spinner, Button, Heading, FormLabel, Text } from '@chakra-ui/react';
import Breadcrumb from '../../components/Breadcrumb';
import SelectElement from '../../components/SelectElement';
import TextArea from '../../components/TextArea';
import { updateCustomer } from '../../api/customers';
import { requireAuth } from '../../hooks/useAuth';
import { useToastHook } from '../../hooks/useToast';
import { isUnauthorized } from '../../utils';
import { BiError } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa6";
import { MdOutlineSyncLock } from "react-icons/md";
import Back from '../../components/Back';

const breadcrumbData = [
    { name: 'Home', ref: '/dashboard' },
    { name: 'Profile', ref: '/profile' },
    { name: 'Profile Update', ref: '/profile/update' },
];
const genderOptions = ['MALE', 'FEMALE'];

const ProfileForm = () => {
    const navigate = useNavigate();
    const { state, pathname } = useLocation();
    const customer = state && state.customer;
    const submitBtnRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const genderRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const shippingAddressRef = useRef(null);
    const [toastState, setToastState] = useToastHook();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm();

    const updateProfile = async (data) => {
        if (!genderRef.current.value) {
            setToastState({
                title: 'Gender Required',
                description: 'Select a gender to update your profile',
                status: 'error',
                icon: <Icon as={BiError} />
            });

            return;
        }

        const customerData = {
            ...data,
            gender: genderRef.current.value
        };

        try {
            const response = await updateCustomer(customerData);

            // console.log(response);

            if (response.error || response.message) {
                setToastState({
                    title: response.error,
                    description: response.message,
                    status: 'error',
                    icon: <Icon as={BiError} />
                });

                setTimeout(() => {
                    isUnauthorized(response, navigate, pathname);
                }, 6000);

                return response.error;
            }

            setToastState({
                title: 'Success!',
                description: 'Profile updated successfully',
                status: 'success',
                icon: <Icon as={FaRegThumbsUp} />
            });

            setTimeout(() => {
                navigate(`/profile`);
            }, 6000);

        } catch (error) {
            return error;
        }
    };

    return (
        <Stack spacing='6' p='6'>
            <Stack direction={{ base: 'column', sm: 'row' }} justifyContent='space-between' alignItems='center'>
                <Breadcrumb linkList={breadcrumbData} />
                <Back />
            </Stack>
            <HStack justifyContent='space-between'>
                <Heading fontSize='3xl' color='blue.700'>Update Profile</Heading>
            </HStack>

            <form onSubmit={handleSubmit(updateProfile)}>
                <Stack spacing='4' p='6' borderWidth='1px' borderColor='gray.200' borderRadius='md'>
                    <Flex gap={{ base: '4', md: '6' }} direction={{ base: 'column', sm: 'row' }}>
                        <TextInput name='firstName' label='First Name' control={control} type='text' fieldRef={firstNameRef} defaultVal={customer ? customer.firstName : ''} />

                        <TextInput name='lastName' label='Last Name' control={control} type='text' fieldRef={lastNameRef} defaultVal={customer ? customer.lastName : ''} />
                    </Flex>

                    <Flex gap={{ base: '4', md: '6' }} direction={{ base: 'column', sm: 'row' }}>
                        <TextInput name='phoneNumber' label='Phone Number' control={control} type='text' fieldRef={phoneNumberRef} defaultVal={customer ? customer.phoneNumber : ''} />

                        <SelectElement data={genderOptions} label='Gender' fieldRef={genderRef} defaultVal={customer ? customer.gender?.toUpperCase() : ''} placeholder='Select Gender' />
                    </Flex>

                    <TextArea name='shippingAddress' label='Shipping Address' control={control} fieldRef={shippingAddressRef} defaultVal={customer ? customer.shippingAddress : ''} />

                    <Button
                        type='submit'
                        colorScheme='blue'
                        isLoading={isSubmitting ? true : false}
                        loadingText='Updating...'
                        spinnerPlacement='end'
                        ref={submitBtnRef}
                        mt='4'
                        spinner={<Spinner
                            thickness='4px'
                            speed='0.5s'
                            emptyColor='gray.200'
                            color='blue.300'
                            size='md'
                        />}
                    >
                        Update Profile
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}

export default ProfileForm