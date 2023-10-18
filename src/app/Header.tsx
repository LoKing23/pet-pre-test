import React from 'react'
import { Flex, Wrap, WrapItem, Avatar, Text } from '@chakra-ui/react';
import CartPopIcon from "./CartPopIcon";

type Props = {
    greeting?: string;
}

const Header = ({
    greeting = 'Good morning!',
}: Props) => {
    return (
        <Flex bgColor="white" boxShadow="xl" p="3" alignItems='center'>
            <Wrap ml="auto">
                <WrapItem>
                    <CartPopIcon />
                </WrapItem>
                <WrapItem>
                    <Text role="name" lineHeight='48px'>
                        { `${greeting} cute cat.` }
                    </Text>
                </WrapItem>
                <WrapItem>
                    <Avatar name='A cute cat' src='https://img.ltn.com.tw/Upload/playing/page/2018/07/08/180708-10152-1-J2OEU.jpg' />
                </WrapItem>
            </Wrap>
        </Flex>
    )
}

export default Header