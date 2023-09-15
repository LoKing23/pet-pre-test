'use client'

import NextLink from "next/link";
import React, { useEffect } from "react";
import {
  useDisclosure,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Tfoot,
  Divider,
  Flex,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonProps,
  useBoolean,
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
// components
import CartRow from "./CartRow";
// hooks
import useCartStore, { CartProduct } from '@/store/useCartStore';
import useStore from '@/hooks/useStore';

type CheckoutPromptProps = {
    isOpen: boolean,
    onClose: () => void,
}

const waitSeconds = (seconds: number) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
})

const CheckoutPrompt = ({
    isOpen,
    onClose
}: CheckoutPromptProps) => {
    return (
      <>  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>訊息</ModalHeader>
            <ModalBody>
                <Text fontSize="xl">
                    結帳成功！
                </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                關閉
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
const CheckoutButton = ({...props}: ButtonProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, loading] = useBoolean(false);
    const clearCart = useCartStore(state => state.clearCart);

    const handleClick = async () => {
        loading.on()

        await waitSeconds(2)

        clearCart()
        loading.off()
        onOpen()
    }

    return (
        <>
            <Button 
                isLoading={isLoading}
                colorScheme='orange' 
                variant='outline'
                size='lg' 
                onClick={handleClick}
                {...props}
            >
                結帳
            </Button>
            <CheckoutPrompt 
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}

export default CheckoutButton