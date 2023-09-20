'use client'

import React from 'react';
import {
    Box,
    Button,
    Text,
    Tr,
    Td,
    Flex,
} from "@chakra-ui/react";
// hooks
import useCartStore, { CartProduct } from '@/store/useCartStore';
import useStore from '@/hooks/useStore';

type Props = {
    index: number
} & CartProduct

const CartRow = ({ index, id, name, price, quantity }: Props) => {
    const setProductQuantity = useCartStore(state => state.setProductQuantity);
    return (
        <Tr>
            <Td>
                <Text>{ index + 1 }</Text>
            </Td>
            <Td>
                <Text fontSize="xl">{ name }</Text>
            </Td>
            <Td>
                <Text color="gray.700">{ id }</Text>
            </Td>
            <Td>
                <Text>{ price }</Text>
            </Td>
            <Td>
                <Flex alignItems='center'>
                    <Button
                        onClick={() => quantity !== 0 && setProductQuantity(id, quantity - 1)}
                        mr="2"
                        disabled={quantity === 0}
                    >
                        -
                    </Button>
                    <Text>{ quantity }</Text>
                    <Button
                        onClick={() => setProductQuantity(id, quantity + 1)}
                        ml="2"
                    >
                        +
                    </Button>
                </Flex>
            </Td>
            <Td>
                <Text>{ price * quantity }</Text>
            </Td>
            <Td>
                <Button
                    colorScheme="red"
                    onClick={() => setProductQuantity(id, 0)}
                >
                    刪除
                </Button>
            </Td>
        </Tr>
    )
}

export default CartRow