import { Box, Heading, Text, Button, Flex, Stack, Link, Icon } from "@chakra-ui/react";
import LoginInput from "../components/LoginInput";
import PasswordInput from "../components/PasswordInput";
import { BiError } from "react-icons/bi";
import Logo from '../components/Logo';
import bgImage from '../assets/inventoryImg.webp';
import { Link as RouterLink, useNavigate, useLoaderData, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authenticate } from "../api/users";
import { useToastHook } from "../hooks/useToast";
import useAuth from "../hooks/useAuth";

export async function loader({ request }) {
    const error = new URL(request.url).searchParams.get('message')
    return { error, request };
}

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm();
    const [toastState, setToastState] = useToastHook();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { errorMessage, request } = useLoaderData();
    const { state } = useLocation();
    const message = (state && state.message) || errorMessage;
    const redirectTo = state && state.redirectTo;

    const submit = async (userData) => {
        // console.log(userData);
        // TO-DO: Call authentication api
        const response = await authenticate(userData);

        if (!response.accessToken) {
            setToastState({
                title: response.error,
                description: response.message,
                status: 'error',
                icon: <Icon as={BiError} />
            });

            return;
        }

        login(response);
        const to = redirectTo || new URL(request.url).searchParams.get('redirectTo') || '/dashboard';
        // const to = '/dashboard';
        navigate(to, { replace: true });
    };

    return (
        <Flex
            fontSize='3xl'
            w='100%'
            justifyContent='center'
            alignItems='center'
            // minHeight='100vh'
            py='8'
            bg='gray.100'
            // bgImage={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`}
            // backgroundRepeat='no-repeat'
            // backgroundSize='cover'
            boxShadow='lg'
        >
            <Flex w={['90%', '90%', '80%', '80%', '60%']} borderRadius='md' overflow='hidden'>
                <Box
                    display={['none', 'none', 'block']} w='55%'
                    bgImage={bgImage}
                    backgroundRepeat='no-repeat'
                    backgroundSize='cover'
                >
                </Box>

                <Stack
                    w={['100%', '100%', '45%']}
                    bg='white'
                    spacing='6'
                    p='6'
                >
                    <Logo />

                    {
                        message &&
                        <Text fontSize='md' fontWeight='medium' px='3' py='2' bg='red.100' color='red.600'>{message}</Text>
                    }

                    <Heading fontSize='2xl' >Login</Heading>

                    <form onSubmit={handleSubmit(submit)}>

                        <Stack spacing='6'>
                            <LoginInput
                                name='email'
                                control={control}
                                label='Email/Username'
                            />

                            <PasswordInput
                                name='password'
                                control={control}
                                label='Password'
                            />

                            <Button type="submit" borderWidth='2px' borderColor='gray.500'>
                                {
                                    isSubmitting ? 'Logging in...' : 'Login'
                                }
                            </Button>

                            <Stack direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>

                                <Button as={RouterLink} to='/signup' fontSize='sm' variant='link'>Create Account</Button>

                                <Button as={RouterLink} to='/forgot-password' fontSize='sm' variant='link'>Forgot Password?</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Login