import { CheckIcon, CloseIcon, CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, Text, Textarea, VStack, useClipboard, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import type { QuoteModel, QuoteRequestModel } from "../model/quote";
import { useEditQuote } from "../hooks/useQuotes";
import { LikeButton } from "./LikeButton";

export const EditMode = ({ quote }: { quote: QuoteModel }) => {
    const [data, setData] = useState<QuoteRequestModel>({ text: quote.text, author: quote.author })
    const [isEditing, setIsEditing] = useState(false);
    const { hasCopied, onCopy } = useClipboard(quote.text);
    const toast = useToast();

    const {mutateAsync, isPending} = useEditQuote({req: 'update', id: quote.id});

    const handleUpdate = async () => {
        await mutateAsync(data)
        setIsEditing(false)
        toast({ title: "Quote updated", status: "success", duration: 2000 });
    }

    return (
        <Box
            p={8}
            shadow="lg"
            border="1px"
            borderRadius="2xl"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            bg={useColorModeValue('white', 'gray.800')}
            position="relative">
            {!isEditing && <HStack position="absolute" top={2} right={2} spacing={1}>
                <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    variant="ghost"
                    size="sm" />
                <IconButton
                    aria-label="Copy quote"
                    icon={hasCopied ? <CheckIcon color="green.400" /> : <CopyIcon />}
                    onClick={onCopy}
                    variant="ghost"
                    size="sm" />
            </HStack>}
            <VStack align="stretch" spacing={4} my={1}>
                {isEditing ? (
                    <Box>
                        <Textarea
                            fontSize="xl"
                            lineHeight="tall"
                            fontWeight="semibold"
                            rows={3}
                            value={data.text}
                            onChange={(e) => setData({ ...data, text: e.target.value })}
                            border='none' />
                        <Input
                            fontSize="md"
                            color="gray.500"
                            textAlign="left"
                            fontWeight="semibold"
                            mt={4}
                            value={data.author}
                            onChange={(e) => setData({ ...data, author: e.target.value })}
                            border='none' />
                    </Box>
                ) : (
                    <Box p={2}>
                        <Text fontSize="xl" lineHeight="tall" fontWeight="semibold">"{quote?.text}"</Text>
                        <Flex justify="space-between" align="baseline">
                        <Text fontSize="md" color="gray.500" textAlign="left" fontWeight="semibold" mt={4}>— {quote?.author}</Text>
                        <LikeButton id={quote.id} counts={quote.likes}/>
                        </Flex>
                    </Box>
                )}
            </VStack>
            {isEditing && <Flex justify='center' w='full' mt={2}>
                <ButtonGroup colorScheme="blue" variant='ghost' spacing={4}>
                    <Button aria-label="Save" leftIcon={<CheckIcon />} onClick={handleUpdate} variant='solid' isLoading={isPending}>Save</Button>
                    <Button aria-label="Cancel" leftIcon={<CloseIcon />} onClick={() => setIsEditing(false)}>Cancel</Button>
                </ButtonGroup>
            </Flex>}
            {/* <Text fontSize="xs" color="gray.400" mt={4} textAlign="center">Tip: Double-click any text to edit</Text>     */}
        </Box>
    )
}