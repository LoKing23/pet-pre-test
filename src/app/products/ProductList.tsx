"use client";

import React, { useEffect } from "react";
import { Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types";
// zustand
import useSearchParamsStore from "../../store/useSearchParamsStore";
import useStagingStore from "../../store/useStagingStore";
import useStore from "@/hooks/useStore";
// components
import Pagination from "./Pagination"
import Loading from "@/app/_components/loading";

type ProductCardProps = {
  index: number;
  product: Product;
  onClick: () => void;
  isProductStaged: boolean;
};

type ProductListProps = {
  initialData: {
    items: Product[];
    total: number;
  },
};

const CONFIG = {
  PER_ROW_ITEM_COUNT: 4,
  ITEM_GUTTER: "8px",
  INITIAL_SEARCH_PARAMS: {
    keyword: "",
    limit: 100,
    offset: 0,
  },
};

const ProductCard = ({ product, index, onClick, isProductStaged }: ProductCardProps) => {
  return (
    <Flex
      key={product.id}
      flexDirection="column"
      w={`calc(100% / ${CONFIG.PER_ROW_ITEM_COUNT} - ${CONFIG.ITEM_GUTTER})`}
      bgColor={isProductStaged ? 'gray.300' : 'facebook.300'}
      rounded="md"
      p="2"
      mb="2"
      mr={
        index % CONFIG.PER_ROW_ITEM_COUNT === CONFIG.PER_ROW_ITEM_COUNT - 1
          ? "0"
          : "2"
      }
      cursor={isProductStaged ? 'not-allowed' : 'pointer'}
      onClick={onClick}
      userSelect='none'
    >
      <Heading mb="2">{product.name}</Heading>
      <Text>商品編號：{product.id}</Text>
      <Text>價格：${product.price}</Text>
    </Flex>
  );
};

const ProductList = ({ initialData }: ProductListProps) => {
  const searchParams = useStore(
    useSearchParamsStore,
    (state) => state.params?.products,
  );
  const stagingProducts = useStore(
    useStagingStore,
    (state) => state.productsMap,
  );
  const addProduct = useStagingStore(
    (state) => state.addProduct,
  );

  const handleClick = (product: Product) => addProduct(product);

  const {
        data,
        isLoading,
        isFetching,
        refetch
    } = useQuery<{items: Product[], total: number}>(
        ["products", searchParams?.keyword, searchParams?.limit, searchParams?.offset],
        async (params) => {
            const response = await fetch(
                `/api/products?keyword=${searchParams?.keyword}&limit=${searchParams?.limit}&offset=${searchParams?.offset}`,
            );
            const { items, total } = await response.json();
            

            return { items, total }
        },
        {
            initialData,
            enabled: false,
            staleTime: Infinity,
        },
    );
      
    useEffect(() => {
      if(!searchParams?.limit ?? !searchParams?.offset) return;

      refetch()
    }, [searchParams, refetch])

    return (
        <>
            <Pagination name='products' total={data?.total} />
            {
              (isFetching || isLoading) 
                ? <Loading />
                : (
                    <Flex h="full" flexWrap='wrap' overflow='auto'>
                        {
                            data?.items?.map((product, index) => {
                                return (
                                  <ProductCard 
                                    key={product.id} 
                                    index={index} 
                                    product={product} 
                                    onClick={() => { handleClick(product) }}
                                    isProductStaged={stagingProducts instanceof Map && stagingProducts.has(product.id)}
                                  />
                                )
                            })
                        }
                    </Flex>
                )
            }
        </>
    );
};

export default ProductList;
