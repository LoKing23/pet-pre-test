import React from 'react';
import { Box, Flex, Heading } from "@chakra-ui/react";

const ProductsLayout = ({
    children
}: {
    children: React.ReactNode
} ) => {
  return (
    <Box w="full" h="full" p="4" pb="0">
        {children}
    </Box>
  )
}

export default ProductsLayout