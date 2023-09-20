import React, { useEffect, useRef, useState } from 'react'
import { Flex, HStack, Icon, Box, Input } from '@chakra-ui/react';
import { BiChevronsLeft, BiChevronLeft, BiChevronRight, BiChevronsRight } from "react-icons/bi";
// zustand
import useSearchParamsStore from "../../store/useSearchParamsStore";
import useStore from "@/hooks/useStore";
// type
import { State as SearchParamsState } from '@/store/useSearchParamsStore';
import Loading from '../_components/loading';

type Props = {
    name: string;
    total: number;
}

const ICON = {
    ICON_SIZE: { base: '5', lg: '7' },
    ICON_COLOR: 'blue.500',
}

let timer: string | number | NodeJS.Timeout | undefined;

const Pagination = ({ name, total }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const prevValue = useRef<string | null>(null);
    const getInputValue = () => inputRef.current?.value ? +inputRef.current?.value : 0;
    const searchParams = useStore(
        useSearchParamsStore,
        (state) => state.params?.products,
    ) as SearchParamsState['params']['products'];
    const setParams = useSearchParamsStore(state => state.setParams);
    const setPage = (index: number) => {
        inputRef?.current?.value && (inputRef.current.value = `${index}`);

        setParams(name, { ...searchParams, offset: (index - 1) * searchParams.limit })
    }
    const pageIndex = (typeof searchParams?.offset === 'number' && typeof searchParams?.limit === 'number') ? searchParams?.offset / searchParams?.limit : 0;   
    const isMinPage = pageIndex <= 0;
    const pageCount = Math.ceil(total / searchParams?.limit);
    const isMaxPage = pageIndex >= pageCount - 1;
    

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = `${pageIndex + 1}`;
        }
    }, [pageCount])

    if(Number.isNaN(pageCount)) return <Loading />
    
    return (
        <Flex w="full" justifyContent='center' alignItems='center' py="3">
                <Icon
                    cursor={isMinPage  ? 'not-allowed' : 'pointer'}
                    m="0"
                    boxSize={ICON.ICON_SIZE}
                    color={ICON.ICON_COLOR}
                    as={BiChevronsLeft}
                    onClick={() => isMinPage ? null : setPage(1)}
                    disabled={isMinPage ? true : false}
                    style={{ margin: 0 }}
                />
                <Icon
                    cursor={isMinPage ? 'not-allowed' : 'pointer'}
                    disabled={isMinPage}
                    m="0"
                    boxSize={ICON.ICON_SIZE}
                    color={ICON.ICON_COLOR}
                    as={BiChevronLeft}
                    onClick={() => {
                        if(isMinPage) return;
                        const currentValue = getInputValue();

                        setPage(currentValue - 1)
                    }}
                    style={{ margin: 0 }}
                />
                <Flex alignItems="center">
                    <Box width="70px">
                        <Input
                            ref={inputRef}
                            onFocus={(event) => {
                                const { value } = event.target;

                                event.target.value = ''
                                prevValue.current = value; // 儲存上一次的變數
                            }}
                            onChange={(event) => {
                                const {value} = event.target;
                                const filteredValue = value.replace(/[^0-9]/g, '').replace(/e/gi, '');                                

                                if(value === '') return
                                
                                if(!filteredValue) {                                    
                                    event.target.value = prevValue.current || '';

                                    return;
                                }

                                clearTimeout(timer);

                                timer = setTimeout(() => {
                                    setPage(+filteredValue);
                                    event.target.blur();
                                }, 1000);
                            }}
                            pattern="[0-9]*(?![eE])"
                            bgColor="white"
                            overflow="hidden"
                            textAlign="center"
                            px="2"
                            pr="2"
                            height="35px"
                            mr="2"
                            
                        />
                    </Box>

                    <Box ml="2">/ {pageCount}</Box>
                </Flex>
                <Icon
                    ml="0"
                    cursor={isMaxPage ? 'not-allowed' : 'pointer'}
                    boxSize={ICON.ICON_SIZE}
                    color={ICON.ICON_COLOR}
                    as={BiChevronRight}
                    onClick={() => {
                        if(isMaxPage) return 
                        const currentValue = getInputValue();

                        setPage(currentValue + 1)
                    }}
                    disabled={getInputValue() >= pageCount}
                    style={{ margin: 0 }}
                />
                <Icon
                    cursor={isMaxPage ? 'not-allowed' : 'pointer'}
                    ml="0"
                    boxSize={ICON.ICON_SIZE}
                    color={ICON.ICON_COLOR}
                    as={BiChevronsRight}
                    onClick={() => isMaxPage ? null : setPage(pageCount)}
                    disabled={getInputValue() >= pageCount}
                    style={{ margin: 0 }}
                />
            </Flex>
    )
}

export default Pagination