import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex justifyContent='center' pt="3">
        <Spinner />
    </Flex>
  )
}

export default Loading