import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Editable, EditableInput, EditablePreview, EditableTextarea, FormLabel, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useEditQuote } from "../hooks/useQuotes";
import type { QuoteRequestModel } from "../model/quote";

export const CreateMode = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const title: string = 'New Quote'
  const { mutate, isPending } = useEditQuote({req: 'create'});

  const toast = useToast();
  const [quote, setQuote] = useState<QuoteRequestModel>({ text: '', author: '' })

  const handleSave = () => {
    if (!quote.text || !quote.author) {
      return toast({ title: "Please fill all fields", status: "warning" });
    }

    mutate(quote, {
      onSuccess: () => {
        toast({ title: "Quote created!", status: "success" });
        setQuote({ text: '', author: '' })
        onClose();
      },
      onError: () => {
        toast({ title: "Something went wrong", status: "error" });
      }
    })
  }
  return (
    <Box>
      <IconButton
        aria-label="Copy quote"
        icon={<AddIcon />}
        colorScheme="blue"
        borderRadius='md'
        variant="ghost"
        size="md"
        onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBrightness='50%' backdropBlur='3px' />

        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Divider alignSelf='center'/>
          <ModalBody py={4}>
              <FormLabel color="gray.500" fontSize="md">Your thoughts</FormLabel>
              <Editable placeholder="Start typing your quote..." fontSize="md" fontWeight="semibold"
                value={quote.text}
                onChange={(val) => setQuote(quote => ({ ...quote, text: val }))}>
                <EditablePreview w="full" p={4} border='none' bg={useColorModeValue('gray.100', 'gray.900')} />
                <EditableTextarea w="full" p={4} border='none' bg={useColorModeValue('gray.100', 'gray.900')}/>
              </Editable>

              <FormLabel color="gray.500" fontSize="md" mt={6}>Written by</FormLabel>
              <Editable placeholder='Name' variant="filled" fontSize='md'
                value={quote.author}
                onChange={(val) => setQuote(quote => ({ ...quote, author: val }))}>
                <EditablePreview w="full" p={4} border='none' bg={useColorModeValue('gray.100', 'gray.900')} />
                <EditableInput w="full" p={4} border='none' bg={useColorModeValue('gray.100', 'gray.900')}/>
              </Editable>
          </ModalBody>
          <Divider w='lg' alignSelf='center'/>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave} isLoading={isPending}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}