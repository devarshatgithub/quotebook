import { Box, Button, Skeleton, Text } from "@chakra-ui/react";
import { useRandomQuote } from "../hooks/useQuotes";
import { WarningIcon } from "@chakra-ui/icons";

export const QuoteDay = () => {

  const { data: daily, isLoading, isError, error } = useRandomQuote();

  const title: string = "Quote for you"
  return (
    <Box w="full" textAlign="center">
      {isLoading ? (
        <Skeleton height="300px" borderRadius="2xl" />
      ) : (
        <Box p={10} bgGradient={isError ? "linear(to-br, red.500, orange.500)" : "linear(to-br, blue.400, purple.500)"} color="white" borderRadius="2xl" shadow="2xl" position="relative" overflow="hidden">
          {isError ? (
            <Button leftIcon={<WarningIcon/>} color='white' bg='none' border='none' fontWeight="bold" fontSize="md">Error fetching quotes: {(error as Error).message}</Button>
          ) : (
            <>
              <Text fontWeight="bold" fontSize="md" textTransform="uppercase" letterSpacing="widest" mb={4} opacity={0.8}>{title}</Text>
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" lineHeight="tall">"{daily?.text}"</Text>
              <Text fontSize="xl" textAlign="right" fontWeight="medium">— {daily?.author}</Text>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}