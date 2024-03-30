import { useRef, useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink, useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Stack, HStack, Flex, Box, Icon, IconButton, Spinner, Button, Heading, FormLabel, Text } from '@chakra-ui/react';
import Breadcrumb from '../components/Breadcrumb';
import TextInput from '../components/TextInput';
import Back from '../components/Back';
import { createUser } from '../api/users';
import { useToastHook } from '../hooks/useToast';
import { isUnauthorized } from '../utils';
import { BiError } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa6";
import { MdOutlineSyncLock } from "react-icons/md";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/;

const SignUp = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [showPasswordHelper, setShowPasswordHelper] = useState(false);
    const [showConfirmHelper, setShowConfirmHelper] = useState(false);
    const [toastState, setToastState] = useToastHook();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        setValue,
    } = useForm();

    const breadcrumbData = [
        { name: 'Home', ref: '/dashboard' },
        { name: 'Sign Up', ref: '/signup' },
    ];

    const submitUser = async (data) => {
        const emailValidation = EMAIL_REGEX.test(data.email);
        const passwordValidation = PWD_REGEX.test(data.password);
        setShowConfirmHelper(false);
        setShowPasswordHelper(false);

        if (!emailValidation) {
            setToastState({
                title: 'Invalid Email Address!',
                description: 'Please enter a valid email address.',
                status: 'error',
                icon: <Icon as={BiError} />
            });

            return;
        }

        if (!passwordValidation) {
            setShowPasswordHelper(true);
            setToastState({
                title: 'Invalid Password!',
                description: 'Password must include lowercase and uppercase letters, number, and special character.',
                status: 'error',
                icon: <Icon as={BiError} />
            });

            return;
        }

        if (data.password !== data.confirmPassword) {
            setShowConfirmHelper(true);
            setToastState({
                title: 'Password Mismatch',
                description: 'Password and Confirm password must match.',
                status: 'error',
                icon: <Icon as={BiError} />
            });

            return;
        }

        const userData = {
            email: data.email,
            role: 'customer',
            category: 'customer',
            active: true,
            password: data.password
        };

        // TODO: Consume create user API endpoint
        try {
            const response = await createUser(userData);

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
                description: 'Your account has been created successfully.',
                status: 'success',
                icon: <Icon as={FaRegThumbsUp} />
            });

            setTimeout(() => {
                navigate('/login');
            }, 6000);

        } catch (error) {
            return error;
        }
    };

    return (
        <Stack spacing='6'>
            <Stack direction={{ base: 'column', sm: 'row' }} justifyContent='space-between' alignItems={{base: 'start', sm: 'center'}}>
                <Breadcrumb linkList={breadcrumbData} />
                <Back />
            </Stack>
            <form onSubmit={handleSubmit(submitUser)}>
                <Stack spacing='4' p='6' borderWidth='1px' borderColor='gray.200' borderRadius='md' bg='white' w={['90%', '90%', '80%', '80%', '50%']} mx='auto'>
                    <HStack justifyContent='space-between' mb='2'>
                        <Heading fontSize='3xl' color='blue.700'>Create Account</Heading>
                    </HStack>
                    <TextInput
                        name='email'
                        label='Email'
                        control={control}
                        type='email'
                        fieldRef={emailRef}
                        defaultVal=''
                    />

                    <TextInput
                        name='password'
                        label='Password'
                        control={control}
                        type='password'
                        fieldRef={passwordRef}
                        defaultVal=''
                        helperText={`
                        8 to 16 characters.
                        Must include lowercase and uppercase letters, number, and special character.`}
                        showHelperText={showPasswordHelper}
                    />

                    <TextInput
                        name='confirmPassword'
                        label='Confirm Password'
                        control={control}
                        type='password'
                        fieldRef={confirmPasswordRef}
                        defaultVal=''
                        helperText={`Must match the password field above.`}
                        showHelperText={showConfirmHelper}
                    />

                    <Button
                        type='submit'
                        colorScheme='blue'
                        mt='4'
                        isLoading={isSubmitting ? true : false}
                        loadingText='Submitting...'
                        spinnerPlacement='end'
                        spinner={<Spinner
                            thickness='4px'
                            speed='0.5s'
                            emptyColor='gray.200'
                            color='blue.300'
                            size='md'
                        />}
                    >
                        Create Account
                    </Button>

                    <Button as={RouterLink} to='/login' fontSize='sm' variant='link' alignSelf='start'>Already created an account? Login</Button>
                </Stack>
            </form>
        </Stack>
    )
}

export default SignUp;