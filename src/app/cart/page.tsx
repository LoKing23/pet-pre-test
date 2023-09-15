'use client'

import NextLink from "next/link";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Tfoot,
  Divider,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
// components
import CartRow from "./CartRow";
import CheckoutButton from "./CheckoutButton";
// hooks
import useCartStore, { CartProduct } from '@/store/useCartStore';
import useStore from '@/hooks/useStore';

const TABLE_HEAD = ["序號", "名稱", "編號", "單價", "數量", "總額"];

const BackToProducts = () => {
  return (
    <Center>
      <NextLink href="/products">
        <Button
          variant="link"
          colorScheme="facebook"
          rightIcon={<BiRightArrowAlt />}
        >
          繼續購物
        </Button>
      </NextLink>
    </Center>
  );
};
const Empty = () => {
  return (
    <Stack justifyContent="center" alignItems="center" pt="3">
      <Text fontSize="xl">空空的購物車~</Text>
    </Stack>
  );
};

const Cart = () => {
  const productsMap = useStore(useCartStore, state => state.productsMap);
  const products = productsMap && Object.values(productsMap);
  const total = products && products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) || 0;
  
  return (
    <Container maxW='1200px' >
      <TableContainer w='full' mb="4">
        <Table variant="unstyled">
          <Thead>
            <Tr>
              {
                TABLE_HEAD.map((name) => (
                  <Th key={name}>
                    <Text fontSize="2xl">
                      {name}
                    </Text>
                  </Th>
                ))
              }
            </Tr>
          </Thead>
          <Tbody>
            {
              products && products.map((product, index) => (
                <CartRow key={product.id} index={index} {...product} />
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Divider colorScheme='facebook'/>
      <Flex justifyContent='flex-end' alignItems='center' py="4">
        <Text fontSize="2xl" mr="2">總價</Text>
        <Text fontSize="2xl" color='facebook.700'>${total}</Text>
      </Flex>
      <Flex justifyContent='flex-end'>
        <CheckoutButton />
      </Flex>
    </Container>
  );
};

const CartPage = () => {
  return (
    <Box>
      <Box py="4">
        <Heading textAlign="center" mb="3">
          購物車
        </Heading>
        <BackToProducts />
      </Box>
      <Center>
        {/* <Empty /> */}
        <Cart />
      </Center>
    </Box>
  );
};

export default CartPage;
