import { useState, useEffect } from 'react';
import {
	useNavigate,
	useLocation,
	useLoaderData,
	Link as RouterLink,
} from 'react-router-dom';
import ListingsTable from '../../components/Table';
import {
	Stack,
	HStack,
	VStack,
	Box,
	IconButton,
	Button,
	Icon,
	Heading,
	Text,
	Tooltip,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { IoEyeOutline } from 'react-icons/io5';
import { BiError } from 'react-icons/bi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { FaEllipsisVertical, FaMoneyBill } from 'react-icons/fa6';
import Breadcrumb from '../../components/Breadcrumb';
import { EmptySearch } from '../../components/EmptySearch';
import { getOrders } from '../../api/orders';
import { useToastHook } from '../../hooks/useToast';
import { requireAuth } from '../../hooks/useAuth';
import { isUnauthorized } from '../../utils';
import FetchError from '../../components/FetchError';
import { formatDate, getMonetaryValue } from '../../utils';

const ActionButtons = ({ row }) => {
	const order = row.original;
	const navigate = useNavigate();

	function viewOrder(e) {
		e.preventDefault();

		const dataOrderId = e.currentTarget.getAttribute('data-order-id');
		navigate(`./${dataOrderId}`);
	}

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<FaEllipsisVertical />}
				variant='unstyled'
			/>
			<MenuList py='0'>
				<MenuItem
					icon={<IoEyeOutline />}
					data-order-id={order.id}
					onClick={viewOrder}
				>
					Preview
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

const columns = [
	{
		id: 'S/N',
		header: 'S/N',
		// size: 225,
		cell: (props) => <Text>{props.row.index + 1}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'refId',
		header: 'Reference',
		size: 150,
		cell: (props) => (
			<Text as='p' w={`${props.column.getSize()}px`} isTruncated>
				{props.getValue()}
			</Text>
		),
		enableGlobalFilter: true,
		filterFn: 'includesString',
	},
	{
		accessorKey: 'totalAmount',
		header: 'Amount',
		// size: 225,
		cell: (props) => <Text>{getMonetaryValue(props.getValue())}</Text>,
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'totalNoOfBags',
		header: 'No. of Bags',
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'totalWeight',
		header: 'Weight',
		cell: (props) => <Text>{props.getValue()}</Text>,
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: (props) => <Text>{formatDate(props.getValue())}</Text>,
		enableGlobalFilter: false,
		filterFn: 'includesString',
	},
	{
		id: 'actions',
		header: '',
		cell: ActionButtons,
		enableGlobalFilter: false,
	},
];

const breadcrumbData = [
	{ name: 'Home', ref: '/dashboard' },
	{ name: 'Orders', ref: '/orders' },
];

export async function loader({ request }) {
	await requireAuth(request);
	const profile = await getOrders();

	if (profile.error || profile.message) {
		return {
			error: profile.error,
			message: profile.message,
			statusCode: profile.statusCode,
		};
	}

	const { orders } = profile;

	// console.log(orders);

	const data = orders.map((order) => {
		return {
			id: order.id,
			refId: order.refId,
			totalAmount: order.totalAmount,
			totalNoOfBags: order.totalNoOfBags,
			totalWeight: order.totalWeight,
			date: order.createdAt,
		};
	});

	return data;
}

const Orders = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const orders = useLoaderData();
	const [toastState, setToastState] = useToastHook();
	const [error, setError] = useState({
		error: orders.error ?? '',
		message: orders.message ?? '',
		statusCode: orders.statusCode ?? '',
	});

	// console.log(orders);

	useEffect(() => {
		if (error.error || error.message) {
			setToastState({
				title: error.error,
				description: error.message,
				status: 'error',
				icon: <Icon as={BiError} />,
			});

			setTimeout(() => {
				isUnauthorized(error, navigate, pathname);
			}, 6000);
		}
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
					Orders
				</Heading>
				<Button
					as={RouterLink}
					to='create'
					colorScheme='blue'
					leftIcon={<MdOutlineCreateNewFolder />}
				>
					Create Order
				</Button>
			</HStack>
			<Box marginTop='8'>
				{orders?.length === 0 ? (
					<EmptySearch
						headers={[
							'S/N',
							'AMOUNT',
							'NO. OF BAGS',
							'CUSTOMER',
							'STAFF',
							'AMOUNT PAID',
							'DELIVERY STATUS',
							'PAYMENT STATUS',
							'DATE',
						]}
						type='order'
					/>
				) : (
					<ListingsTable
						data={orders}
						columns={columns}
						fileName='orders-data.csv'
					/>
				)}
			</Box>
		</Stack>
	);
};

// const ActionButtons = ({ order }) => {
// 	const navigate = useNavigate();

// 	function viewOrder(e) {
// 		e.preventDefault();

// 		const dataOrderId = e.currentTarget.getAttribute('data-order-id');
// 		navigate(`./${dataOrderId}`);
// 	}

// 	return (
// 		<Menu>
// 			<MenuButton
// 				as={IconButton}
// 				aria-label='Options'
// 				icon={<FaEllipsisVertical />}
// 				variant='unstyled'
// 			/>
// 			<MenuList py='0'>
// 				<MenuItem
// 					icon={<IoEyeOutline />}
// 					data-order-id={order.id}
// 					onClick={viewOrder}
// 				>
// 					Preview
// 				</MenuItem>
// 			</MenuList>
// 		</Menu>
// 	);
// };

export default Orders;
