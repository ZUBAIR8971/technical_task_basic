import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';

import {FiUser} from "react-icons/fi";
import {HiOutlineMail} from "react-icons/hi";

const AddRecord = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const addCustomer = (event) => {

        props.submitFunction({name, email, role});

        setName('');
        setEmail('');
        setRole('');
    }

  return (
    <>
        <Modal isOpen={props.Open} isCentered onClose={() => props.Close()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Record</ModalHeader>

                <ModalCloseButton onClick={() => props.Close()} />

                <ModalBody>
                    <Stack spacing={5}>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents='none'
                                children={<FiUser color='grey.300' />}
                            />
                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents='none'
                                children={<HiOutlineMail color='grey.300' />}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement 
                                pointerEvents='none'
                                children={<FiUser color='grey.300' />}
                            />
                            <Input
                                type="text"
                                placeholder="Role"
                                value={role}
                                name="role"
                                id="role"
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </InputGroup>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={() => props.Close()}>
                        Close
                    </Button>
                    <Button colorScheme='teal' onClick={addCustomer}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default AddRecord;