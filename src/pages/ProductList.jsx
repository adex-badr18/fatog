import { useRef, useState, useEffect } from 'react';
import {
	useNavigate,
	useNavigation,
	Link as RouterLink,
	useLoaderData,
	useLocation,
} from 'react-router-dom';
import ListingsTable from '../components/Table';
import {
	Stack,
	HStack,
	VStack,
	Box,
	useDisclosure,
	IconButton,
	Icon,
	Button,
	Heading,
	Text,
	Spinner,
	Tooltip,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { BiError } from 'react-icons/bi';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import Breadcrumb from '../components/Breadcrumb';
import { EmptySearch } from '../components/EmptySearch';
import { getProducts } from '../api/products';
import { useToastHook } from '../hooks/useToast';
import { requireAuth } from '../hooks/useAuth';
import { isUnauthorized } from '../utils';
import FetchError from '../components/FetchError';
import { getMonetaryValue, formatDate } from '../utils';

const columns = [
	{
		id: 'S/N',
		header: 'S/N',
		// size: 225,
		cell: (props) => <Text>{props.row.index + 1}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		// size: 225,
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: true,
		filterFn: 'includesString',
	},
	{
		accessorKey: 'type',
		header: 'Type',
		// size: 225,
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: true,
		filterFn: 'includesString',
	},
	{
		accessorKey: 'weight',
		header: 'Weight',
		// size: 225,
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'size',
		header: 'Size',
		// size: 225,
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'pricePerBag',
		header: 'Price',
		// size: 225,
		cell: (props) => <Text>{getMonetaryValue(props.getValue())}</Text>,
		enableGlobalFilter: false,
	},
];

export async function loader() {
	globalThis.scrollTo({ top: 0, left: 0 });

	const response = await getProducts();

	if (response.error || response.message) {
		return {
			error: response.error,
			message: response.message,
			statusCode: response.statusCode,
		};
	}

	const data = response.map((product) => {
		return {
			name: product.name,
			type: product.type,
			weight: product.weight,
			size: product.size,
			pricePerBag: product.pricePerBag,
		};
	});

	return data;
}

const ProductList = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [toastState, setToastState] = useToastHook();
	const products = useLoaderData();
	const [error, setError] = useState({
		error: products.error ?? '',
		message: products.message ?? '',
		statusCode: products.statusCode ?? '',
	});
	const breadcrumbData = [
		{ name: 'Home', ref: '/dashboard' },
		{ name: 'Products', ref: '/products' },
	];

	useEffect(() => {
		if (products.error || products.message) {
			setToastState({
				title: products.error,
				description: products.message,
				status: 'error',
				icon: <Icon as={BiError} />,
			});

			setTimeout(() => {
				isUnauthorized(error, navigate, pathname);
			}, 6000);
		}
	}, []);

	useEffect(() => {
		globalThis.scrollTo({ top: 0, left: 0 });
	}, []);

	return error.error || error.message ? (
		<FetchError error={error} />
	) : (
		<Stack spacing='6' p='6'>
			<Box>
				<Breadcrumb linkList={breadcrumbData} />
			</Box>
			<HStack justifyContent='space-between'>
				<Heading fontSize='3xl' color='blue.700'>
					Available Products
				</Heading>

				<Button
					as={RouterLink}
					to='/order/create'
					colorScheme='blue'
					leftIcon={<MdOutlineAddShoppingCart />}
				>
					Place an Order
				</Button>
			</HStack>
			<Box marginTop='2'>
				{products?.length === 0 ? (
					<EmptySearch
						headers={[
							'S/N',
							'NAME',
							'TYPE',
							'WEIGHT',
							'SIZE',
							'PRICE',
						]}
						type='product'
					/>
				) : (
					<ListingsTable
						data={products}
						columns={columns}
						fileName='products-data.csv'
					/>
				)}
			</Box>
		</Stack>
	);
};

export default ProductList;
