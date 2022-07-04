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
  Input,
  InputGroup,
} from '@chakra-ui/react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const TableComponent = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);

    const [deleteRecord, setDeleteRecord] = useState({
        id: ''
    });

    const [updIndex, setUpdIndex] = useState('');
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [updateStatus, setUpdateStatus] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [delProcessing, setDelProcessing] = useState(false);
    const [addProcessing, setAddProcessing] = useState(false);

    const { loading, error, data, } = useQuery(GET_Customers);

    const [insertCustomer] = useMutation(INSERT_Customers);
    const [updateCustomer] = useMutation(UPDATE_Customers);
    const [deleteCustomer] = useMutation(DELETE_Customers);

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

     const handleEditOpen = (customer, index) => {
        setId(customer.id);
        setName(customer.name);
        setEmail(customer.email);
        setRole(customer.role);
        setUpdIndex(index + 1);
        setUpdateStatus(true);
    };

    const CancelUpdate = () => {
        setId("");
        setName("");
        setEmail("");
        setRole("");
        setUpdIndex("");
        setUpdateStatus(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsDelOpen(false);
    };

    const SubmitRecord = (customer) => {

        setAddProcessing(true);

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
            refetchQueries: [{ query: GET_Customers }],
            onCompleted: () => {
                setAddProcessing(false);
                setIsOpen(false);
            }
        });
    }

    const deleteFunction = (data) => {

        setDelProcessing(true);

        let newCustomer = {
            id: data.id
        };
        deleteCustomer({ 
            variables: { 
                [deleteCustomerParams.id]: newCustomer.id,
            },
            refetchQueries: [{ query: GET_Customers }],
            onCompleted: () => {
                setIsDelOpen(false);
                setDelProcessing(false);
            }
        });
    }

    const updateRecord = () => {
        
        setProcessing(true);

        if(name === "" || email === "" || role === ""){
            toast.error('Please fill all the fields', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            let editCustomer = {
                id: id,
                name: name,
                email: email,
                role: role
            };
            
            updateCustomer({ 
                variables: { 
                    [updateCustomerParams.id]: editCustomer.id,
                    [updateCustomerParams.name]: editCustomer.name,
                    [updateCustomerParams.email]: editCustomer.email,
                    [updateCustomerParams.role]: editCustomer.role
                },
                refetchQueries: [{ query: GET_Customers }],
                onCompleted: () => {
                    setId("");
                    setName("");
                    setEmail("");
                    setRole("");
                    setUpdIndex("");
                    setUpdateStatus(false);
                    setProcessing(false);
                }
            });
        }
    };

  return (
    <>
        <div className='AddRecordBtn'>
            {
                updateStatus ?
                    <>
                        <Button disabled colorScheme='teal' size='md' onClick={handleOpen}>Add Record</Button>
                    </>
                :
                    <>
                        <Button colorScheme='teal' size='md' onClick={handleOpen}>Add Record</Button>
                    </>
            }
        </div>
        {
            loading ?
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
                                <TableContainer style={{width:"80%"}}>
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

                                                            {
                                                                updateStatus && updIndex === index + 1 ?
                                                                    <>
                                                                        <Td>
                                                                            <InputGroup>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="Name"
                                                                                    value={name}
                                                                                    name="name"
                                                                                    id="name"
                                                                                    onChange={(e) => setName(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                        </Td>
                                                                        <Td>
                                                                            <InputGroup>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="Email"
                                                                                    value={email}
                                                                                    name="email"
                                                                                    id="email"
                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                        </Td>
                                                                        <Td>
                                                                            <InputGroup>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="Role"
                                                                                    value={role}
                                                                                    name="role"
                                                                                    id="role"
                                                                                    onChange={(e) => setRole(e.target.value)}
                                                                                />
                                                                            </InputGroup>
                                                                        </Td>
                                                                        <Td textAlign="center">
                                                                            {
                                                                                processing ?
                                                                                    <>
                                                                                        <Button blur colorScheme='teal' size='sm' isLoading loadingText='Updating' />
                                                                                    </>
                                                                                :
                                                                                    <>
                                                                                        <Button colorScheme='teal' size='sm' onClick={updateRecord}>Update</Button>
                                                                                    </>
                                                                            }
                                                                        </Td> 
                                                                        <Td textAlign="center">
                                                                            <Button colorScheme='teal' size='sm' onClick={CancelUpdate}>Cancel</Button>
                                                                        </Td>
                                                                    </>
                                                                :
                                                                    <>
                                                                        <Td textAlign="center">{customer.name}</Td>
                                                                        <Td textAlign="center">{customer.email}</Td>
                                                                        <Td textAlign="center">{customer.role}</Td>
                                                                        {
                                                                            updateStatus ?
                                                                                <>
                                                                                    <Td textAlign="center">
                                                                                        <Button disabled colorScheme='teal' size='sm'>Edit</Button>
                                                                                    </Td>
                                                                                    <Td textAlign="center">
                                                                                        <Button disabled colorScheme='teal' size='sm'>Delete</Button>
                                                                                    </Td>
                                                                                </>
                                                                            :
                                                                                <>
                                                                                    <Td textAlign="center">
                                                                                        <Button colorScheme='teal' size='sm' onClick={() => handleEditOpen(customer, index)}>Edit</Button>
                                                                                    </Td>
                                                                                    <Td textAlign="center">
                                                                                        <Button colorScheme='teal' size='sm' onClick={() => handleDelOpen(customer)}>Delete</Button>
                                                                                    </Td>
                                                                                </>
                                                                        }
                                                                    </>
                                                            }
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

                    <AddRecord Open={isOpen} Close={handleClose} submitFunction={SubmitRecord} processingStatus={addProcessing} />
                    <DeleteRecords Open={isDelOpen} Close={handleClose} record={deleteRecord} delFunction={deleteFunction} processingStatus={delProcessing} />
                    
                    <ToastContainer />
                </>
        }
        
    </>
  )
}

export default TableComponent;