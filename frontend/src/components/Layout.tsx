import { Box, Code, Container, Flex, HStack, Heading, Link, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Toggler from "./Toggler";
import { CreateMode } from "./CreateMode";
import { metaData } from "../meta";

export const Layout = () => {
    const title: string = "QuoteBook"
    const navigate = useNavigate()
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Flex as="nav" p={4}
                borderBottom="1px" 
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                bg={useColorModeValue('white', 'gray.800')}>
                <Container maxW="container.lg" display="flex" alignItems="center">
                    <Heading size="md" color="blue.500" onClick={() => navigate('/')}>{title}</Heading>
                    <Spacer />
                    <CreateMode/>
                    <Toggler />
                </Container>
            </Flex>
            <Container maxW="container.lg" py={6} flex={1}>
                <Outlet/>
            </Container>

            <HStack p={3} w='full'
                justify='center'
                borderTop='1px solid'
                position='absolute'
                bottom={0}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                bg={useColorModeValue('gray.50', 'gray.800')}
                color={useColorModeValue('gray.700', 'gray.200')}>
                <Text>Quotes<Code colorScheme="yellow">.fetch()</Code> by <Link href={metaData.dev.url} fontFamily='monospace' fontSize='md' _hover={{ bg: 'blue.500', color: 'gray.50' }}>{metaData.dev.name}</Link></Text>
            </HStack>
        </Box>
    );
};