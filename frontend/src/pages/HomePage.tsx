import { Box, ButtonGroup, Divider, Flex, Heading, Hide, IconButton } from "@chakra-ui/react";
import { DragHandleIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ContentPanel } from "../components/ContentPanel";

export const HomePage = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const title: string = "All Quotes"

    return (
        <Box>
            <Flex justify="space-between" align="center" w="full" py={5}>
                <Heading size="md">{title}</Heading>
                <Hide below='md'>
                    <ButtonGroup variant="ghost" colorScheme="blue">
                        <IconButton
                            aria-label="Grid view"
                            icon={<DragHandleIcon />}
                            transform='rotate(90deg)'
                            isActive={viewMode === 'grid'}
                            onClick={() => setViewMode('grid')} />
                        <IconButton
                            aria-label="List view"
                            icon={<HamburgerIcon />}
                            isActive={viewMode === 'list'}
                            onClick={() => setViewMode('list')} />
                    </ButtonGroup>
                </Hide>
            </Flex>
            <Divider mb={6} />
            <ContentPanel isGrid={viewMode === 'grid' ? true : false} />
        </Box>
    )
}