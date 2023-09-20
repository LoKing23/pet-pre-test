"use client";

import { useRouter } from 'next/navigation'
import React from "react";
import {
  Box,
  Flex,
  FlexProps,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import StagingProduct from "./StagingProduct";
// zustand
import useStagingStore, {
  StagingProduct as StagingProductProps,
} from "../../store/useStagingStore";
import useCartStore from "../../store/useCartStore";
import useStore from "@/hooks/useStore";

const SubmitButton = () => {
    const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const batchAddStagingProduct = useCartStore(
    (state) => state.batchAddStagingProduct,
  );
  const productsMap = useStore(useStagingStore, (state) => state.productsMap);
  const clearStagingProducts = useStagingStore((state) => state.clearStaging);
  const productsArray: StagingProductProps[] =
    productsMap instanceof Object ? Object.values(productsMap) : [];

  const handleClick = () => {
    batchAddStagingProduct(productsArray);
    clearStagingProducts();
    onOpen();
  };

  const handleGoToCart = () => {
    router.push('/cart')
  }

  return (
    <>
      <Button
        colorScheme="blue"
        w="full"
        onClick={handleClick}
        isDisabled={productsArray.length === 0}
      >
        提交至購物車
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            訊息
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            批次加入購物車成功
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              關閉
            </Button>
            <Button colorScheme="orange" onClick={handleGoToCart}>
                去購物車
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProductStagingArea = ({ ...props }: FlexProps) => {
  const productsMap = useStore(useStagingStore, (state) => state.productsMap);
  const productsArray: StagingProductProps[] =
    productsMap instanceof Object ? Object.values(productsMap) : [];
  const setProductQuantity = useStagingStore(
    (state) => state.setProductQuantity,
  );
  return (
    <Box>
      <Box my="3" flexShrink={0}>
        <Heading textAlign="center">商品暫存區</Heading>
      </Box>
      <Flex
        flexWrap="wrap"
        minH="150px"
        h="fit-content"
        rounded="xl"
        bgColor="white"
        p="4"
        overflow="auto"
        {...props}
      >
        {productsArray.map((product) => (
          <StagingProduct
            key={product.id}
            onRemove={() => setProductQuantity(product.id, 0)}
            onDecrease={() =>
              setProductQuantity(product.id, product.quantity - 1)
            }
            onIncrease={() =>
              setProductQuantity(product.id, product.quantity + 1)
            }
            quantity={product.quantity}
            price={product.price}
            name={product.name}
            id={product.id}
            w="calc(100% / 4 - 8px)"
            mr="8px"
            mb="8px"
          />
        ))}
      </Flex>
      <Box my="3" flexShrink={0}>
        <SubmitButton />
      </Box>
    </Box>
  );
};

export default ProductStagingArea;
