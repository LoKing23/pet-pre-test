import React from 'react'
import PRODUCTS from "../../products"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
// components
import Search from "./Search";
import ProductStagingArea from "./ProductStagingArea"

const CONFIG = {
    PER_ROW_ITEM_COUNT: 4,
    ITEM_GUTTER: '8px'
}

const Products = () => {
  return (
    <Stack h="full" overflowY='hidden'>
        <ProductStagingArea mb="4" />
        <Search flexShrink={0} />
        <Box my="3" flexShrink={0}>
            <Heading textAlign='center'>商品列表</Heading>
        </Box>
        <Box h="full" flexGrow={1} overflow='auto'>
            <Flex flexWrap='wrap'>
                {
                    PRODUCTS.slice(0, 30).map((product, index) => {
                        return (
                            <>
                                <Flex 
                                    key={product.id}
                                    flexDirection="column"
                                    w={`calc(100% / ${CONFIG.PER_ROW_ITEM_COUNT} - ${CONFIG.ITEM_GUTTER})`}
                                    bgColor="facebook.300"
                                    rounded="md"
                                    p="2"
                                    mb="2"
                                    mr={index % CONFIG.PER_ROW_ITEM_COUNT === (CONFIG.PER_ROW_ITEM_COUNT - 1) ? '0' : '2'}
                                >
                                    <Heading mb="2">{product.name}</Heading>
                                    <Text>商品編號：{product.id}</Text>
                                    <Text>價格：${product.price}</Text>
                                </Flex>
                            </>
                        )
                    })
                }
            </Flex>
        </Box>
    </Stack>
  )
}

export default Products