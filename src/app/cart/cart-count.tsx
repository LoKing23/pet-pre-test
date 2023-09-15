'use client'

import React from 'react'
import useCartStore from "@/store/useCartStore"
import useStore from "@/hooks/useStore"
import { Flex, Button } from '@chakra-ui/react';

const CartCount = () => {
  const bears = useStore(useCartStore, state => state.bears);
  const handleClick = useCartStore(state => state.addABear)

  return (
    <Flex>
      <div>{bears}</div>
      <Button onClick={handleClick}>
        +1
      </Button>
    </Flex>
  )
}

export default CartCount