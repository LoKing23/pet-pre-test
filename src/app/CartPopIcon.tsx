'use client';

import { forwardRef, Ref, useEffect } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    IconButton,
    Box,
    Center,
    Flex,
    Text,
    Spinner
} from '@chakra-ui/react'
import { AiOutlineShoppingCart } from "react-icons/ai";
// hooks
import useCartStore, { CartProduct } from '@/store/useCartStore';
import useStore from '@/hooks/useStore';

type TriggerCartProps = {
    productCount: number,
    isLoading?: boolean
}

const BADGE_SIZE = 23;

const TriggerCart = forwardRef(function TriggerCart({
    isLoading = false,
    productCount = 0,
    ...props
}: TriggerCartProps, ref: Ref<HTMLDivElement>) {
    return (
        <Box ref={ref} pos="relative" h="full" {...props}>
            {
                isLoading 
                    ? (
                        <Center h="full">
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                color="gray.200"
                                size="sm"
                            />
                        </Center>
                    )
                    : (
                        <>
                            <IconButton 
                                aria-label='cart button'
                                variant='outline'
                                icon={<AiOutlineShoppingCart size="22px"/>}
                                size='lg'
                            />
                            <Center
                                pos="absolute"
                                top={`-${BADGE_SIZE/2}px`}
                                right={`-${BADGE_SIZE/2}px`}
                                w={`${BADGE_SIZE}px`}
                                h={`${BADGE_SIZE}px`}
                                bgColor="red.600"
                                color="white"
                                rounded="full"
                            >
                                {productCount}
                            </Center>
                        </>
                    )
            }
        </Box>
    )
})

const CartPopIcon = () => {
    const productsMap = useStore(useCartStore, state => state.productsMap);
    const inAlpha = productsMap === undefined;
    // const addProduct = useCartStore(state => state.addProduct);
    const products = productsMap && Object.values(productsMap);
    const count = products && products.length || 0;
    const isEmpty = count === 0;

    // useEffect(() => {
    //     addProduct({
    //         id: 'test1',
    //         name: 'test1',
    //         price: 200,
    //         quantity: 3
    //     })
    //     addProduct({
    //         id: 'test2',
    //         name: 'test2',
    //         price: 100,
    //         quantity: 2
    //     })
    // }, [])
    
    return (
        <Popover trigger='hover' >
            <PopoverTrigger>
                <TriggerCart isLoading={inAlpha} productCount={count}/>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                    購物車
                </PopoverHeader>
                <PopoverBody>
                    <Box p="4">
                        {
                            isEmpty
                                ? <Text w="full" textAlign='center'>購物車內沒有商品</Text>
                                : <Text w="full" textAlign='center'>購物車內有商品</Text>
                        }
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CartPopIcon