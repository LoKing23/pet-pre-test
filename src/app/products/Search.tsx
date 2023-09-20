'use client'

import React, { useRef } from 'react'
import { Flex, Input, FlexProps, FormLabel } from '@chakra-ui/react'
import useSearchParamsStore from '@/store/useSearchParamsStore'
import useStore from '@/hooks/useStore'

const Search = ({...props}: FlexProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const searchParams = useStore(
        useSearchParamsStore,
        (state) => state.params?.products,
    );
    const setParams = useSearchParamsStore(state => state.setParams);
    const handleEnterPress = (event: KeyboardEvent) => {
        const keyWord = inputRef.current?.value || '' as string;

        // fetch products
        if (event.key === 'Enter'  && keyWord !== searchParams?.keyword && searchParams) {
            setParams('products', { ...searchParams, keyword: keyWord });
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