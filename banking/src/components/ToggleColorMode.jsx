import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
    >
      {colorMode === "dark" ? (
        <SunIcon color="yellow.300" />
      ) : (
        <MoonIcon color="blue.400" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
