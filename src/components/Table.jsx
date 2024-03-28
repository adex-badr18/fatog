// ProductsListing.js
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { TableContainer, Table, Tbody, Td, Th, Thead, Tr, Button, IconButton, Flex, HStack, Input, Box, Select, Icon, Spacer, Badge } from '@chakra-ui/react';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import SearchInput from './SearchInput';
import DownloadBtn from './DownloadBtn';
import { getMonetaryValue } from '../utils';
import { formatDate } from '../utils';

const ListingsTable = ({ data: tableData, columns: cols, fileName, render }) => {
    const { pathname } = useLocation();
    const columnHelper = createColumnHelper();

    const columns = cols.map(col => {
        if (col.id === 'S/N') {
            return (
                columnHelper.accessor('', {
                    id: col.id,
                    cell: info => <span>{info.row.index + 1}</span>,
                    header: col.header,
                    // enableColumnFilter: false
                })
            )
        }

        if (col.id === 'active') {
            return (
                columnHelper.accessor(col.id, {
                    id: col.id,
                    cell: info => (
                        <Badge colorScheme={info.getValue() === true ? 'green' : 'red'} variant='subtle'>
                            {info.getValue() === true ? 'Active' : 'Inactive'}
                        </Badge>
                    ),
                    header: col.header,
                    // enableColumnFilter: false
                })
            )
        }

        if (col.id === 'totalAmount' || col.id === 'pricePerBag' || col.id === 'totalPrice' || col.id === 'amountPaid' || col.id === 'outstandingPayment' || col.id === 'amountPayable' || col.id === 'previousPaymentTotal') {
            return (
                columnHelper.accessor(col.id, {
                    id: col.id,
                    cell: info => (
                        <span>
                            {
                                getMonetaryValue(info.getValue())
                            }
                        </span>
                    ),
                    header: col.header,
                    // enableColumnFilter: false
                })
            )
        }

        if (col.id === 'date') {
            return (
                columnHelper.accessor(col.id, {
                    id: col.id,
                    cell: info => (
                        <span>
                            {
                                formatDate(info.getValue())
                            }
                        </span>
                    ),
                    header: col.header,
                })
            )
        }

        if (col.id === 'refId') {
            return (
                columnHelper.accessor(col.id, {
                    id: col.id,
                    cell: info => (
                        <span>
                            {
                                `${info.getValue().slice(0, 20)}...`
                            }
                        </span>
                    ),
                    header: col.header
                })
            )
        }

        if (col.id === 'actions') {
            return (
                columnHelper.accessor('', {
                    id: col.id,
                    cell: props => (
                        render(props.row.original)
                    ),
                    header: col.header
                })
            )
        }

        return (
            columnHelper.accessor(col.id, {
                id: col.id,
                cell: info => <span>
                    {
                        typeof info.getValue() === 'number' ? info.getValue() :
                            info.getValue() ? info.getValue() : '-'
                    }
                </span>,
                header: col.header,
                // enableColumnFilter: (col.id === 'refId' || col.id === 'staff' || col.id === 'customer') ? true : false
            })
        )
    });

    // const [columnFilters, setColumnFilters] = useState(colFilters || []);

    const [data, setData] = useState(tableData);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

    const [globalFilter, setGlobalFilter] = useState('');
    const table = useReactTable({
        data,
        columns,
        state: {
            // columnFilters,
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    const generateMultiplesOf10 = (totalNumber) => {
        let num = Math.ceil(totalNumber / 10);
        const multiplesOf10 = [];

        for (let i = 1; i <= num; i++) {
            multiplesOf10.push(i * 10);
        }
        return multiplesOf10;
    }

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <SearchInput
                    value={globalFilter ?? ''}
                    onChange={(value) => setGlobalFilter(String(value))}
                />

                <Spacer />

                <DownloadBtn data={tableData} fileName={fileName}>Download</DownloadBtn>
            </Flex>
            <TableContainer overflowX='auto'>
                <Table variant="simple" size='sm' colorScheme='blue'>
                    <Thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <Tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(header => (
                                            <Th key={header.id}>
                                                {
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </Th>
                                        ))
                                    }
                                </Tr>
                            ))
                        }
                    </Thead>
                    <Tbody>
                        {
                            table.getRowModel().rows.length > 0 ?
                                table.getRowModel().rows.map(row => (
                                    <Tr key={row.id}>
                                        {
                                            row.getVisibleCells().map(cell => (
                                                <Td key={cell.id}>
                                                    {
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    }
                                                </Td>
                                            ))
                                        }
                                    </Tr>
                                )) :
                                <Tr textAlign='center'>
                                    <Td colSpan={12}>No record found!</Td>
                                </Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <HStack mt={4} spacing='5'>
                Page{' '}
                <em>
                    {
                        `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
                    }
                </em>

                <Box>
                    Go to page: {' '}
                    <Input
                        type='number'
                        w='12'
                        size='sm'
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
                </Box>

                <Box>
                    <Select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        size='sm'
                    >
                        {
                            generateMultiplesOf10(tableData.length).map(pageSize => (
                                <option
                                    key={pageSize}
                                    value='option1'
                                >
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </Select>
                </Box>

                <Spacer />

                <HStack spacing='2'>
                    <IconButton
                        icon={<FaArrowLeftLong />}
                        onClick={() => table.previousPage()}
                        isDisabled={!table.getCanPreviousPage()}
                    />

                    <IconButton
                        icon={<FaArrowRightLong />}
                        onClick={() => nextPage()}
                        isDisabled={!table.getCanNextPage()}
                    />
                </HStack>
            </HStack>
        </>
    );
};

export default ListingsTable;
