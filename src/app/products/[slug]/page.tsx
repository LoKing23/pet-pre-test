import React from 'react'
import {  Button, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'

const ProductInformation = ({
    params: { slug },
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    return (
        <Center flexDir='column'>
            <Text fontSize='3xl'>商品編號：{ slug }</Text>
            <Link href='/products'>
                <Button  
                    colorScheme='facebook'
                    mt='3'
                >
                    返回商品列表
                </Button>
            </Link>
        </Center>
    )
}

export default ProductInformation