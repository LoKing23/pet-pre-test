'use client'

import { useState, useEffect } from 'react'
import { Flex, Stack, useBoolean } from "@chakra-ui/react"
import MenuToggler from "./MenuToggler"

const TOGGLE_TRANSITION_DURATION = 0.2;

const MenuContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isOpen, setOpen] = useBoolean(true);

    return (
        <Flex pos="relative">
            <Stack 
                w={isOpen ?'300px' : '0px'}
                h="100vh"  
                transition={`width ${TOGGLE_TRANSITION_DURATION}s ease-in-out`}
                bgColor="facebook.700" 
                p={isOpen ? 4 : 0}
                overflow='hidden' 
            >
                { isOpen && children}
            </Stack>
            <MenuToggler
                isOpen={isOpen}
                onClick={setOpen.toggle}
                pos="absolute"
                left="100%"
            />
        </Flex>
    )
}

export default MenuContainer