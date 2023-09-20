'use client'

import { useState } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ 
    children 
  }: { 
  children: React.ReactNode 
  }) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
      <CacheProvider>
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ChakraProvider>
      </CacheProvider>
    )
}

export default Providers