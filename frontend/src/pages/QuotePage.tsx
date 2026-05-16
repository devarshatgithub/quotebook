import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons"
import { Button, Center, Flex, IconButton, Spacer, Spinner, Text, VStack, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom";
import { useEditQuote, useQuote } from "../hooks/useQuotes";
import { EditMode } from "../components/EditMode";

export const QuotePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    
    const { data: quote, isLoading, isError } = useQuote(id!);
    const {mutate, isPending} = useEditQuote({req: 'delete', id});
    
    
    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this quote?")) {
        mutate(quote, {
          onSuccess: () => {
            toast({ title: "Quote deleted successfully", status: "info" });
            navigate('/quotes');
          },
          onError: () => {
            toast({ title: "Error deleting quote", status: "error" });
          }
        });
      }
    }

    if (isLoading) {
      return (
        <Center h="60vh">
          <Spinner size="xl" color="blue.500"  speed="0.8s" thickness="4px" />
        </Center>
      );
    }

    if (isError || !quote) {
      return (
        <Center h="60vh">
          <Text>Quote not found. <Button variant="link" onClick={() => navigate('/quotes')}>Go back</Button></Text>
        </Center>
      );
    }
    return (
      <>
        <VStack spacing={8} align="stretch">
          <Flex>
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="ghost"
              alignSelf="flex-start"
              onClick={() => navigate('/quotes')}>Back to all quotes</Button>
            <Spacer/>
            <IconButton
              aria-label="Delete quote"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              onClick={handleDelete}
              isLoading={isPending} />
          </Flex>
          <EditMode quote={quote}/>
        </VStack>
      </>
    )
}