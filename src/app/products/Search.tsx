'use client'

import React, { useRef } from 'react'
import { Flex, Input, FlexProps, FormLabel } from '@chakra-ui/react'


const Search = ({...props}: FlexProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleEnterPress = (event: KeyboardEvent) => {
        // fetch products
        if (event.key === 'Enter') {
            const keyWord = inputRef.current?.value;
            // fetch api
            console.log({
                keyWord
            })
        }
    }
    const handleFocus = () => window.addEventListener('keydown', handleEnterPress);
    const handleBlur = () => window.removeEventListener('keydown', handleEnterPress);
    return (
        <Flex bgColor="white" rounded='xl' p="4" {...props}>
            <Flex alignItems='center'>
                <FormLabel 
                    flexShrink={0} 
                    p="0" 
                    m="0" 
                    mr="4"
                >
                    輸入商品關鍵字
                </FormLabel>
                <Input 
                    ref={inputRef}
                    htmlSize={30} 
                    flexGrow={0} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </Flex>
        </Flex>
    )
}

export default Search