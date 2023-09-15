import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Flex, Box, Heading, Stack } from "@chakra-ui/react";
// component
import Providers from './providers';
import MenuContainer from "./MenuContainer";
import MenuList from "./MenuList";
import Header from "./Header"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'POS System',
  description: 'pos system demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body className={inter.className}>
        <Providers>
          <Flex w="100vw" h="100vh">
            <Flex h="100vh" pos="relative">
              <MenuContainer>
                <Heading color="white">POS System</Heading>
                <MenuList />
              </MenuContainer>
            </Flex>
            <Box w="full" h="full"  bgColor="gray.300">
              <Header />
              <Box w="full" h={`calc(100% - 72px)`} overflow='auto' >
                {children}
              </Box>
            </Box>
          </Flex>
          
        </Providers>
      </body>
    </html>
  )
}
