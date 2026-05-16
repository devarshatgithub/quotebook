import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { Box, Text, VStack, IconButton, useColorModeValue, useClipboard, HStack, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import type { QuoteModel } from '../model/quote';
import { LikeButton } from './LikeButton';

const MotionBox = motion(Box);

export const CardView = ({ quote }: { quote: QuoteModel }) => {

  const { hasCopied, onCopy } = useClipboard(quote.text);
  const navigate = useNavigate()

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      p={8}
      borderRadius="xl"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="sm"
      border="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      position="relative">
      <VStack align="stretch" spacing={4}>
        <Box onDoubleClick={() => {navigate(`/quotes/${quote.id}`)}} cursor="text">
          <Text fontSize="xl" fontWeight="medium" fontStyle="italic" lineHeight="tall">"{quote.text}"</Text>
        </Box>
        <Flex justify="space-between" align="baseline">
          <Text fontSize="sm" color="gray.500" fontWeight="bold">— {quote.author}</Text>
          <LikeButton id={quote.id} counts={quote.likes}/>
        </Flex>
      </VStack>

      <HStack position="absolute" top={2} right={2} spacing={1}>
        <IconButton
          aria-label="Copy quote"
          icon={hasCopied ? <CheckIcon color="green.400" /> : <CopyIcon />}
          onClick={onCopy}
          variant="ghost"
          size="sm" />
      </HStack>
    </MotionBox>
  );
};