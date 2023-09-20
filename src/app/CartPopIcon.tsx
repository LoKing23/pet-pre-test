"use client";

import { forwardRef, Ref, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Box,
  Center,
  Flex,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
// hooks
import useCartStore, { CartProduct } from "@/store/useCartStore";
import useStore from "@/hooks/useStore";
import { useRouter } from "next/navigation";

type TriggerCartProps = {
  productCount: number;
  isLoading?: boolean;
  onClick: () => void;
};

const BADGE_SIZE = 23;

const TriggerCart = forwardRef(function TriggerCart(
  { isLoading = false, productCount = 0, onClick, ...props }: TriggerCartProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Box ref={ref} pos="relative" h="full" {...props} onClick={onClick}>
      {isLoading ? (
        <Center h="full">
          <Spinner thickness="4px" speed="0.65s" color="gray.200" size="sm" />
        </Center>
      ) : (
        <>
          <IconButton
            aria-label="cart button"
            variant="outline"
            icon={<AiOutlineShoppingCart size="22px" />}
            size="lg"
          />
          <Center
            pos="absolute"
            top={`-${BADGE_SIZE / 2}px`}
            right={`-${BADGE_SIZE / 2}px`}
            w={`${BADGE_SIZE}px`}
            h={`${BADGE_SIZE}px`}
            bgColor="red.600"
            color="white"
            rounded="full"
          >
            {productCount}
          </Center>
        </>
      )}
    </Box>
  );
});

const CartPopIcon = () => {
  const router = useRouter();
  const productsMap = useStore(useCartStore, (state) => state.productsMap);
  const productsArray: CartProduct[] =
    (productsMap && Object.values(productsMap)) || [];
  const inAlpha = productsMap === undefined;
  const products = productsMap && Object.values(productsMap);
  const count = (products && products.length) || 0;
  const isEmpty = count === 0;
  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <TriggerCart
          isLoading={inAlpha}
          productCount={count}
          onClick={handleClick}
        />
      </PopoverTrigger>
      <PopoverContent w="500px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>購物車</PopoverHeader>
        <PopoverBody>
          {isEmpty ? (
            <Text w="full" textAlign="center">
              購物車內沒有商品
            </Text>
          ) : (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>商品</Th>
                    <Th>單價</Th>
                    <Th>數量</Th>
                    <Th>小計</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    productsArray.map((product, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{product.name}</Td>
                          <Td>${product.price}</Td>
                          <Td>{product.quantity}</Td>
                          <Td>${product.quantity * product.price}</Td>
                        </Tr>
                      );
                    })
                  }
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th colSpan={2} />
                    <Th>總計 </Th>
                    <Th>
                      $
                      {productsArray.reduce(
                        (acc, cur) => acc + cur.quantity * cur.price,
                        0,
                      )}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopIcon;
