import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Toggler = () => {
  
  const { toggleColorMode } = useColorMode();

  const iconColor = useColorModeValue('orange.400', 'yellow.200');
  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      onClick={toggleColorMode}
      variant="ghost"
      color={iconColor}
      _hover={{ bg: hoverBg }}
      size="md"
      borderRadius="full"
      transition="all 0.2s"
    />
  );
};

export default Toggler;