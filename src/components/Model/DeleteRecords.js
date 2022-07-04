import React from 'react';
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
  Text,
} from '@chakra-ui/react';

const DeleteRecords = (props) => {

  const deleteFunction = () => {
        const id = props.record.id;
        props.delFunction({id})
    }

  return (
    <>
        <Modal isOpen={props.Open} isCentered onClose={() => props.Close()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Record</ModalHeader>

                <ModalCloseButton onClick={() => props.Close()} />

                <ModalBody>
                   <Stack spacing={4}>
                        <Text fontSize='xl'>Are you sure you want to delete this record?</Text>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={() => props.Close()}>
                        Cancel
                    </Button>
                    <Button colorScheme='teal' onClick={deleteFunction}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default DeleteRecords