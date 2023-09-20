import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <Center w="full" h="full" justifyContent='center'>
        <Spinner />
    </Center>
  )
}

export default Loading