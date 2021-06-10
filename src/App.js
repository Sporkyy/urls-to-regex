import React, { useState } from 'react';
import { ChakraProvider, Box, theme, Textarea, VStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { condense } from 'strings-to-regex';
import { useDebounce } from 'use-debounce';
import ResizeTextarea from 'react-textarea-autosize';

function App() {
  const [combo, setCombo] = useState('');
  const [value] = useDebounce(combo, 500);
  const [errors, setErrors] = useState([]);

  return (
    <ChakraProvider theme={theme}>
      <VStack gap={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Textarea
          as={ResizeTextarea}
          resize="none"
          onKeyUp={e => {
            const arr = e.target.value.split('\n');
            const regex = condense(arr);
            setCombo(`^${regex.source}$`);
          }}
        />
        <Box p="3" bg="red" color="white">
          {errors}
        </Box>
        <Box
          bg="rebeccapurple"
          color="yellow"
          p="3"
          sx={{ overflowWrap: 'anywhere' }}
        >
          {value}
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
