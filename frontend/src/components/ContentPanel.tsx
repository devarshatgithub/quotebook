import { Alert, AlertIcon, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react"
import { useQuotes } from "../hooks/useQuotes";
import { CardView } from "./CardView";

export const ContentPanel = ({ isGrid }: { isGrid: boolean }) => {

    const { data: quotes, isLoading, isError, error } = useQuotes();
    return (
        <VStack spacing={4} align="stretch">
            {isError && (
                <Alert status="error" borderRadius="md">
                    <AlertIcon />Error fetching quotes: {(error as Error).message}
                </Alert>
            )}
            {isGrid ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {isLoading ? (
                        Array(6).fill(0).map((_, i) => <Skeleton key={i} height="150px" borderRadius="xl" />)
                    ) : (
                        quotes?.map((quote) => <CardView key={quote.id} quote={quote} />)
                    )}
                </SimpleGrid>
            ) : (
                <>
                    {isLoading ? (
                        Array(6).fill(0).map((_, i) => <Skeleton key={i} height="150px" borderRadius="xl" />)
                    ) : (
                        quotes?.map((quote) => <CardView key={quote.id} quote={quote} />)
                    )}
                </>
            )}
        </VStack>
    )
}