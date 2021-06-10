import React, { useState } from 'react';
import { ChakraProvider, Box, theme, Textarea, VStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { condense } from 'strings-to-regex';
import { useDebounce } from 'use-debounce';
import ResizeTextarea from 'react-textarea-autosize';
import validUrl from 'valid-url';

const findErrors = (arr, setErrors) => {
  const errors = [];
  for (const url of arr) {
    if (!validUrl.isWebUri(url)) {
      errors.push(
        <>
          <strong>{url}</strong>
          <em> is not a valid web URI</em>
        </>
      );
    } else if (url[url.length - 1] !== '/') {
      errors.push(
        <>
          <strong>{url}</strong>
          <em> does not end in a slash</em>
        </>
      );
    }
  }
  console.log(errors);
  setErrors(errors);
};

function App() {
  const [combo, setCombo] = useState('');
  const [strIn, setStrIn] = useState('');
  const [value] = useDebounce(combo, 500);
  const [errors, setErrors] = useState([]);

  return (
    <ChakraProvider theme={theme}>
      <VStack gap={3} align="stretch" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Textarea
          as={ResizeTextarea}
          resize="none"
          onKeyUp={e => {
            const str = e.target.value;
            setStrIn(str);
            const arr = str.split('\n');
            const regex = condense(arr);
            findErrors(arr, setErrors);
            setCombo(`^${regex.source}$`);
          }}
        />
        {!!strIn.length && !!errors.length && (
          <Box p="3" bg="red" color="white">
            <ul>
              {errors.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          </Box>
        )}
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
