import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Text,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { GET_Customers } from './GraphQL/Queries/GetData';

import { INSERT_Customers } from './GraphQL/Queries/PostData';
import { insertCustomerParams } from './GraphQL/Params/insertCustomerParams';

import { DELETE_Customers } from './GraphQL/Queries/DeleteData';
import { deleteCustomerParams } from './GraphQL/Params/deleteCustomerParams';

import { UPDATE_Customers } from './GraphQL/Queries/UpdateData';
import { updateCustomerParams } from './GraphQL/Params/updateCustomerParams';

import { useQuery, useMutation } from "@apollo/client";

import AddRecord from './Model/AddRecord';
import DeleteRecords from './Model/DeleteRecords';
import EditRecords from './Model/EditRecord';

const TableComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [deleteRecord, setDeleteRecord] = useState({
        id: ''
    });

    const [updateData, setUpdateData] = useState({
        id: '',
        name: '',
        email: '',
        role: '',
    });

    const { loading, error, data, } = useQuery(GET_Customers);

    const [insertCustomer, {isLoading}] = useMutation(INSERT_Customers);
    const [updateCustomer, {isUpdLoading}] = useMutation(UPDATE_Customers);
    const [deleteCustomer, {isDelLoading}] = useMutation(DELETE_Customers);

    const getData = useMemo(() => {
       return data ? data.customers : []
    }, [data]);

    const [CustomersData, setCustomersData] = useState(getData);

    useEffect(() => {
        setCustomersData(getData);
    }
    , [getData]);


    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleDelOpen = (customer) => {
        setDeleteRecord({
            id: customer.id
        });
        setIsDelOpen(true);
    };

     const handleEditOpen = (customer) => {
        setUpdateData({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            role: customer.role,
        });
        setIsEditOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsDelOpen(false);
        setIsEditOpen(false);
    };

    const SubmitRecord = (customer) => {

        let newCustomer = {
        name: customer.name,
        email: customer.email,
        role: customer.role

        };
        insertCustomer({ 
            variables: { 
                [insertCustomerParams.name]: newCustomer.name,
                [insertCustomerParams.email]: newCustomer.email,
                [insertCustomerParams.role]: newCustomer.role
            },
            refetchQueries: [{ query: GET_Customers }]
        });
        setIsOpen(false);
    }

    const deleteFunction = (data) => {

        let newCustomer = {
            id: data.id
        };
        deleteCustomer({ 
            variables: { 
                [deleteCustomerParams.id]: newCustomer.id
            },
            refetchQueries: [{ query: GET_Customers }]
        });
        setIsDelOpen(false);
    }

    const updateRecord = (customer) => {

        let editCustomer = {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            role: customer.role
        };
        
        updateCustomer({ 
            variables: { 
                [updateCustomerParams.id]: editCustomer.id,
                [updateCustomerParams.name]: editCustomer.name,
                [updateCustomerParams.email]: editCustomer.email,
                [updateCustomerParams.role]: editCustomer.role
            },
            refetchQueries: [{ query: GET_Customers }]
        });

        setIsEditOpen(false);
    };

  return (
    <>
        <div className='AddRecordBtn'>
            <Button colorScheme='teal' size='md' onClick={handleOpen}>Add Record</Button>
        </div>
        {
            loading || isLoading || isUpdLoading || isDelLoading ?
                <>
                    <Stack spacing={"2"}>
                        <Spinner size="xl" />
                    </Stack>
                </>
            :
                <>
                    {
                        CustomersData.length > 0 ? 
                            <>
                                <TableContainer style={{width:"60%"}}>
                                    <Table variant='simple' maxWidth={"100%"}>
                                        <TableCaption>Customer Table</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th textAlign="center">Name</Th>
                                                <Th textAlign="center">Email</Th>
                                                <Th textAlign="center">Role</Th>
                                                <Th colSpan={2} textAlign="center">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                CustomersData.map((customer, index) => {
                                                    return (
                                                        <Tr key={index}>
                                                            <Td textAlign="center">{customer.name}</Td>
                                                            <Td textAlign="center">{customer.email}</Td>
                                                            <Td textAlign="center">{customer.role}</Td>
                                                            <Td textAlign="center">
                                                                <Button colorScheme='teal' size='sm' onClick={() => handleEditOpen(customer)}>Edit</Button>
                                                            </Td>
                                                            <Td textAlign="center">
                                                                <Button colorScheme='teal' size='sm' onClick={() => handleDelOpen(customer)}>Delete</Button>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                })
                                            }
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </>
                        :
                            <>
                                <Text color="teal" fontSize={"3xl"}>No Data</Text>
                            </>
                    }

                    <AddRecord Open={isOpen} Close={handleClose} submitFunction={SubmitRecord} />
                    <DeleteRecords Open={isDelOpen} Close={handleClose} record={deleteRecord} delFunction={deleteFunction} />
                    <EditRecords Open={isEditOpen} Close={handleClose} record={updateData} updateFunction={updateRecord} />
                </>
        }
        
    </>
  )
}

export default TableComponent;