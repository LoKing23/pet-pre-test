import React from 'react'
import { Flex } from '@chakra-ui/react'
import ProductList from "./ProductList"
import { getProductList } from "@/products"

const ProductListArea = async () => {
    const initialData = await getProductList(100, 0);    

    return (
        <Flex h="full" flexWrap="wrap">
            <ProductList initialData={initialData}  />
        </Flex>
    )
}

export default ProductListArea