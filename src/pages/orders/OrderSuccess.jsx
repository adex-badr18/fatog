import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Stack,
	HStack,
	VStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	IconButton,
	Button,
	Icon,
	Heading,
	Text,
} from '@chakra-ui/react';
import { getMonetaryValue } from '../../utils';
import ListingsTable from '../../components/Table';
import { TbShoppingCartCheck } from 'react-icons/tb';

const OrderSuccess = () => {
	const { state } = useLocation();

	const orderList = state.order.map((orderItem) => ({
		productName: orderItem.product.name,
		pricePerBag: orderItem.pricePerBag,
		noOfBags: orderItem.noOfBags,
		totalAmount: orderItem.totalAmount,
		totalWeight: orderItem.totalWeight,
	}));

	const columns = [
		{
			id: 'S/N',
			header: 'S/N',
			// size: 225,
			cell: (props) => <Text>{props.row.index + 1}</Text>,
			enableGlobalFilter: false,
		},
		{
			accessorKey: 'productName',
			header: 'Product Name',
			// size: 225,
			cell: (props) => <Text>{props.getValue()}</Text>,
			enableGlobalFilter: true,
		},
		{
			accessorKey: 'pricePerBag',
			header: 'Unit Price ',
			// size: 225,
			cell: (props) => <Text>{getMonetaryValue(props.getValue())}</Text>,
			enableGlobalFilter: true,
		},
		{
			accessorKey: 'noOfBags',
			header: 'No. of Bags',
			cell: (props) => <Text>{props.getValue()}</Text>,
			enableGlobalFilter: true,
		},
		{
			accessorKey: 'totalAmount',
			header: 'Amount',
			// size: 225,
			cell: (props) => <Text>{getMonetaryValue(props.getValue())}</Text>,
			enableGlobalFilter: true,
		},
		{
			accessorKey: 'totalWeight',
			header: 'Weight',
			cell: (props) => <Text>{props.getValue()}</Text>,
			enableGlobalFilter: false,
		},
	];

	return (
		<Stack spacing='6' p='6'>
			<VStack mb={2} spacing={4}>
				<Box p={4} bg='green.700' color='white' borderRadius='full'>
					<Icon
						as={TbShoppingCartCheck}
						fontSize='6xl'
					/>
				</Box>
				<Heading fontSize='2xl' color='gray.700'>
					Thank you! Order successfully placed
				</Heading>
			</VStack>
			<HStack justifyContent='space-between'>
				<Heading fontSize='3xl' color='blue.700'>
					Order List
				</Heading>

				<HStack alignItems='center'>
					<Text fontWeight='bold' fontSize='xl' color='gray.700'>
						Reference:{' '}
					</Text>
					<Text fontSize='xl' color='gray.700'>{state.order[0].orderRefId}</Text>
				</HStack>
			</HStack>
			<Box marginTop='4'>
				{orderList?.length === 0 ? (
					<EmptySearch
						headers={[
							'S/N',
							'PRODUCT NAME',
							'UNIT PRICE',
							'AMOUNT',
							'NO. OF BAGS',
							'AMOUNT PAID',
						]}
						type='order'
					/>
				) : (
					<ListingsTable
						data={orderList}
						columns={columns}
						fileName='orders-data.csv'
					/>
				)}
			</Box>
		</Stack>
	);
};

export default OrderSuccess;
