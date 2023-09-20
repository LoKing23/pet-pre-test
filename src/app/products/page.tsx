import React, { Suspense } from 'react'
import PRODUCTS from "../../products"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
// components
import Search from "./Search";
import ProductStagingArea from "./ProductStagingArea"
import ProductListArea from "./ProductListArea"
import Loading from "@/app/_components/loading"

const Products = () => {
  return (
    <Stack h="full" overflowY='hidden'>
        <ProductStagingArea mb="4" />
        <Search />
        <Box my="3">
            <Heading textAlign='center'>商品列表</Heading>
        </Box>
        <Box h="full" flexGrow={1}>
          <Suspense fallback={<Loading />}>
            <ProductListArea />
          </Suspense>
        </Box>
    </Stack>
  )
}

export default Products