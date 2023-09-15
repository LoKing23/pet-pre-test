'use client';

import { Box, Flex, FlexProps, Heading } from '@chakra-ui/react'
import React from 'react'
import StagingProduct from "./StagingProduct"

const ProductStagingArea = ({...props}: FlexProps) => {
  return (
    <Box>
         <Box my="3" flexShrink={0}>
            <Heading textAlign='center'>商品暫存區</Heading>
         </Box>
        <Flex 
            flexWrap='wrap'
            h="300px"
            rounded='xl'
            bgColor='white'
            p="4"
            overflow='auto'
            {...props}
        >
            {
                Array.from({length: 12}).map((_, index) => (
                    <StagingProduct 
                        key={index}
                        onClick={() => {}}
                        count={1}
                        price={100}
                        name="商品名稱"
                        id="商品編號"
                        w="calc(100% / 4 - 8px)"
                        mr="8px"
                        mb="8px"
                    />
                ))}
        </Flex>
    </Box>
  )
}

export default ProductStagingArea