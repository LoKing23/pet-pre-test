"use client";

import { Flex, Heading, Text, FlexProps } from "@chakra-ui/react";
import React from "react";
import { Product } from "../../types";

type Props = {
  onClick: () => void;
  count: number;
};

const CONFIG = {
  PER_ROW_ITEM_COUNT: 4,
  ITEM_GUTTER: '8px'
}

const StagingProduct = ({ onClick, count, price, name, id, ...props }: Props & Product & FlexProps) => {
  return (
    <Flex
      flexDirection="column"
      w={`calc(100% / ${CONFIG.PER_ROW_ITEM_COUNT} - ${CONFIG.ITEM_GUTTER})`}
      bgColor="facebook.300"
      rounded="md"
      p="2"
      mb="2"
      {...props}
    >
      <Heading mb="2">{name}</Heading>
      <Text>商品編號：{id}</Text>
      <Text>價格：${price}</Text>
    </Flex>
  );
};

export default StagingProduct;
