"use client";

import { Flex, Heading, Text, FlexProps, Stack, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Product } from "../../types";

type Props = {
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
  quantity: number;
};

const CONFIG = {
  PER_ROW_ITEM_COUNT: 4,
  ITEM_GUTTER: '8px'
}

const StagingProduct = ({ onClick, quantity,onDecrease, onIncrease, onRemove, price, name, id, ...props }: Props & Product & FlexProps) => {
  return (
    <Flex
      w={`calc(100% / ${CONFIG.PER_ROW_ITEM_COUNT} - ${CONFIG.ITEM_GUTTER})`}
      bgColor="facebook.300"
      rounded="md"
      p="2"
      mb="2"
      userSelect='none'
      {...props}
    >
      <Flex flexDirection="column">
        <Heading mb="auto">{name}</Heading>
        <Text>商品編號：{id}</Text>
        <Text>價格：${price * quantity}</Text>
      </Flex>
      <Flex flexGrow={1} alignItems='flex-start'>
        <Flex flexDir='column' alignItems='center' justifyContent='center' h="full" py="1" mx="auto">
          <Icon as={BiSolidUpArrow} cursor='pointer' boxSize="8" onClick={onIncrease} />
          <Text my="auto">
            {quantity}
          </Text>
          <Icon as={BiSolidDownArrow} cursor='pointer'boxSize="8" onClick={onDecrease}/>
        </Flex>
        <Box bgColor="blackAlpha.500" px="1" pt="1" rounded="3" onClick={onRemove}>
          <Icon as={FaRegTrashAlt} cursor='pointer' color="white"/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StagingProduct;
