import NextLink from 'next/link'
import React from 'react'
import { Button, Stack, Link as ChakraLink } from '@chakra-ui/react'

const MENU_LIST = [
  {
    name: '商品列表',
    path: '/products'
  },
  {
    name: '購物車',
    path: '/cart'
  },
]

const MenuList = () => {
  return (
    <Stack>
      {
        MENU_LIST.map((item, index) => (
          <ChakraLink 
            key={index} 
            as={NextLink}
            w="full"
            href={item.path} 
          >
            <Button w="full">{item.name}</Button>
          </ChakraLink>
        ))
      }
    </Stack>
  )
}

export default MenuList