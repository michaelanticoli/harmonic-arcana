"use client";
import React from "react";
import * as ChakraUI from '@chakra-ui/react';
import * as ShadcnUI from '@/design-libraries/shadcn-ui';


export default function Index() {
  return (function MainComponent({ activeRoute }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "EXPERIENCE", path: "/experience" },
    { name: "LEARN", path: "/learn" },
  ];

  return (
    <ChakraUI.Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="50"
      bg="rgba(10, 10, 10, 0.95)"
      backdropFilter="blur(8px)"
      borderBottom="1px solid rgba(255, 255, 255, 0.05)"
    >
      <ChakraUI.Container maxW="container.xl" px={4}>
        <ChakraUI.Flex align="center" justify="space-between" h="16">
          <ChakraUI.Link
            href="/"
            fontSize="xl"
            fontFamily="Inter"
            fontWeight="100"
            letterSpacing="-0.02em"
            color="white"
            _hover={{ color: "#E2C17B" }}
            transition="all 0.3s"
          >
            HARMONIC ARCANA
          </ChakraUI.Link>

          <ChakraUI.HStack display={{ base: "none", md: "flex" }} spacing={12}>
            {navItems.map((item) => (
              <ChakraUI.Link
                key={item.path}
                href={item.path}
                fontFamily="Inter"
                fontWeight="300"
                fontSize="sm"
                letterSpacing="0.1em"
                textTransform="uppercase"
                color={
                  activeRoute === item.path
                    ? "#E2C17B"
                    : "rgba(255, 255, 255, 0.7)"
                }
                borderBottom={
                  activeRoute === item.path ? "1px solid #E2C17B" : "none"
                }
                pb={activeRoute === item.path ? 1 : 0}
                _hover={{
                  color: "white",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.3s"
              >
                {item.name}
              </ChakraUI.Link>
            ))}
          </ChakraUI.HStack>

          <ChakraUI.IconButton
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            icon={
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`} />
            }
            variant="ghost"
            color="white"
            _hover={{ color: "#E2C17B" }}
            aria-label="Toggle menu"
          />
        </ChakraUI.Flex>

        {isMenuOpen && (
          <ChakraUI.Box
            display={{ base: "block", md: "none" }}
            position="absolute"
            top="16"
            left="0"
            right="0"
            bg="rgba(10, 10, 10, 0.98)"
            backdropFilter="blur(12px)"
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
          >
            <ChakraUI.VStack px={4} py={6} spacing={4} align="stretch">
              {navItems.map((item) => (
                <ChakraUI.Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  fontFamily="Inter"
                  fontWeight="300"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color={
                    activeRoute === item.path
                      ? "#E2C17B"
                      : "rgba(255, 255, 255, 0.7)"
                  }
                  _hover={{ color: "white" }}
                  transition="all 0.3s"
                >
                  {item.name}
                </ChakraUI.Link>
              ))}
            </ChakraUI.VStack>
          </ChakraUI.Box>
        )}
      </ChakraUI.Container>
    </ChakraUI.Box>
  );
}

function StoryComponent() {
  const routes = ["/", "/cards", "/learn", "/sounds"];

  return (
    <ChakraUI.VStack spacing={8} pt="80px">
      {routes.map((route) => (
        <ChakraUI.Box key={route} w="full">
          <ChakraUI.Text mb={2} fontWeight="bold">
            Active Route: {route}
          </ChakraUI.Text>
          <MainComponent activeRoute={route} />
        </ChakraUI.Box>
      ))}
    </ChakraUI.VStack>
  );
});
}