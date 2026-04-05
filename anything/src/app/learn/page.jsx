"use client";
import React from "react";
import Navigation from "../../components/navigation";
import * as ChakraUI from "@chakra-ui/react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

import { ChakraUI } from "@chakra-ui/react";

function MainComponent() {
  const [activeSection, setActiveSection] = React.useState("overview");
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = {
    overview: {
      title: "QUANTUM TAROT",
      subtitle: "The Science Behind Harmonic Arcana",
      content: (
        <ChakraUI.VStack
          spacing={8}
          fontFamily="Inter"
          fontWeight="200"
          lineHeight="relaxed"
          align="start"
        >
          <ChakraUI.Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
            Harmonic Arcana represents a revolutionary fusion of ancient
            divination wisdom and cutting-edge quantum physics, creating the
            world's first scientifically-enhanced tarot experience.
          </ChakraUI.Text>
          <ChakraUI.Text color="rgba(255, 255, 255, 0.7)">
            Each card in our deck is precisely calibrated to specific healing
            frequencies, sacred geometric patterns, and quantum resonance fields
            that have been validated through extensive research in consciousness
            studies and vibrational medicine.
          </ChakraUI.Text>
          <ChakraUI.SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={8}
            mt={12}
            w="full"
          >
            <ChakraUI.VStack spacing={4} align="start">
              <ChakraUI.Heading
                size="sm"
                color="#E2C17B"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontWeight="300"
              >
                Frequency Healing
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                528 Hz (Love), 741 Hz (Intuition), 639 Hz (Connection) - each
                card resonates with scientifically-proven healing frequencies.
              </ChakraUI.Text>
            </ChakraUI.VStack>
            <ChakraUI.VStack spacing={4} align="start">
              <ChakraUI.Heading
                size="sm"
                color="#E2C17B"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontWeight="300"
              >
                Sacred Geometry
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Golden ratio, Fibonacci spirals, and crystalline structures
                embedded in every card design for maximum energetic coherence.
              </ChakraUI.Text>
            </ChakraUI.VStack>
          </ChakraUI.SimpleGrid>
        </ChakraUI.VStack>
      ),
    },
    technology: {
      title: "QUANTUM MECHANICS",
      subtitle: "Advanced Technology Integration",
      content: (
        <ChakraUI.VStack
          spacing={8}
          fontFamily="Inter"
          fontWeight="200"
          lineHeight="relaxed"
          align="start"
        >
          <ChakraUI.Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
            Our proprietary quantum field generators create measurable changes
            in local electromagnetic fields, enhancing intuitive perception and
            synchronicity manifestation.
          </ChakraUI.Text>
          <ChakraUI.SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            mt={12}
            w="full"
          >
            <ChakraUI.VStack spacing={4} align="start">
              <ChakraUI.Text
                fontSize="xs"
                color="#E2C17B"
                letterSpacing="0.2em"
                textTransform="uppercase"
                fontWeight="300"
              >
                01
              </ChakraUI.Text>
              <ChakraUI.Heading
                size="md"
                color="white"
                fontWeight="200"
                letterSpacing="-0.01em"
              >
                Binaural Audio
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                High-fidelity binaural beats synchronized with each card's
                frequency signature for enhanced meditative states.
              </ChakraUI.Text>
            </ChakraUI.VStack>
            <ChakraUI.VStack spacing={4} align="start">
              <ChakraUI.Text
                fontSize="xs"
                color="#E2C17B"
                letterSpacing="0.2em"
                textTransform="uppercase"
                fontWeight="300"
              >
                02
              </ChakraUI.Text>
              <ChakraUI.Heading
                size="md"
                color="white"
                fontWeight="200"
                letterSpacing="-0.01em"
              >
                NFT Integration
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Blockchain-secured digital cards with embedded metadata
                containing precise frequency and geometric data.
              </ChakraUI.Text>
            </ChakraUI.VStack>
            <ChakraUI.VStack spacing={4} align="start">
              <ChakraUI.Text
                fontSize="xs"
                color="#E2C17B"
                letterSpacing="0.2em"
                textTransform="uppercase"
                fontWeight="300"
              >
                03
              </ChakraUI.Text>
              <ChakraUI.Heading
                size="md"
                color="white"
                fontWeight="200"
                letterSpacing="-0.01em"
              >
                AI Enhancement
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Machine learning algorithms analyze reading patterns to provide
                increasingly personalized insights.
              </ChakraUI.Text>
            </ChakraUI.VStack>
          </ChakraUI.SimpleGrid>
        </ChakraUI.VStack>
      ),
    },
    research: {
      title: "SCIENTIFIC BASIS",
      subtitle: "Research & Validation",
      content: (
        <ChakraUI.VStack
          spacing={8}
          fontFamily="Inter"
          fontWeight="200"
          lineHeight="relaxed"
          align="start"
        >
          <ChakraUI.Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
            Our methodology is grounded in peer-reviewed research from quantum
            consciousness studies, cymatics, and biofield science.
          </ChakraUI.Text>
          <ChakraUI.VStack spacing={6} mt={12} w="full" align="start">
            <ChakraUI.Box
              borderLeft="2px solid"
              borderColor="rgba(226, 193, 123, 0.2)"
              pl={6}
            >
              <ChakraUI.Heading
                size="sm"
                color="#E2C17B"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontWeight="300"
                mb={2}
              >
                Cymatics Research
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Visual patterns created by sound frequencies demonstrate the
                geometric structures embedded in our card designs.
              </ChakraUI.Text>
            </ChakraUI.Box>
            <ChakraUI.Box
              borderLeft="2px solid"
              borderColor="rgba(226, 193, 123, 0.2)"
              pl={6}
            >
              <ChakraUI.Heading
                size="sm"
                color="#E2C17B"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontWeight="300"
                mb={2}
              >
                Consciousness Studies
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                Princeton Engineering Anomalies Research and Global
                Consciousness Project findings support our quantum field
                interaction theories.
              </ChakraUI.Text>
            </ChakraUI.Box>
            <ChakraUI.Box
              borderLeft="2px solid"
              borderColor="rgba(226, 193, 123, 0.2)"
              pl={6}
            >
              <ChakraUI.Heading
                size="sm"
                color="#E2C17B"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontWeight="300"
                mb={2}
              >
                Biofield Measurements
              </ChakraUI.Heading>
              <ChakraUI.Text color="rgba(255, 255, 255, 0.7)" fontSize="sm">
                GDV (Gas Discharge Visualization) photography shows measurable
                changes in human biofields during card interactions.
              </ChakraUI.Text>
            </ChakraUI.Box>
          </ChakraUI.VStack>
        </ChakraUI.VStack>
      ),
    },
  };

  return (
    <ChakraUI.ChakraProvider>
      <ChakraUI.Box minH="100vh" bg="#0A0A0A" color="white" fontFamily="Inter">
        <Navigation activeRoute="/learn" />

        <ChakraUI.Box position="relative" pt={24} pb={32}>
          <ChakraUI.Container maxW="7xl" px={4}>
            <ChakraUI.Box
              textAlign="center"
              mb={20}
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? "translateY(0)" : "translateY(8px)"}
              transition="all 1.2s"
            >
              <ChakraUI.Heading
                fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }}
                fontWeight="100"
                color="white"
                lineHeight="0.9"
                letterSpacing="-0.04em"
                mb={6}
              >
                LEARN
                <ChakraUI.Box
                  as="span"
                  display="block"
                  color="#E2C17B"
                  mt="-8px"
                >
                  MORE
                </ChakraUI.Box>
              </ChakraUI.Heading>
              <ChakraUI.Text
                fontSize="xl"
                fontWeight="200"
                color="rgba(255, 255, 255, 0.6)"
                maxW="2xl"
                mx="auto"
                lineHeight="relaxed"
                letterSpacing="0.02em"
              >
                Discover the science and philosophy behind quantum-enhanced
                divination
              </ChakraUI.Text>
            </ChakraUI.Box>

            <ChakraUI.Flex justify="center" mb={16}>
              <ChakraUI.HStack spacing={2} bg="#1A1A1A" p={2}>
                {Object.keys(sections).map((key) => (
                  <ChakraUI.Button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    px={8}
                    py={3}
                    fontFamily="Inter"
                    fontWeight="300"
                    fontSize="sm"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    borderRadius="0"
                    bg={activeSection === key ? "white" : "transparent"}
                    color={
                      activeSection === key
                        ? "black"
                        : "rgba(255, 255, 255, 0.7)"
                    }
                    _hover={{
                      color: activeSection === key ? "black" : "white",
                      bg:
                        activeSection === key
                          ? "white"
                          : "rgba(255, 255, 255, 0.05)",
                    }}
                    transition="all 0.3s"
                  >
                    {key}
                  </ChakraUI.Button>
                ))}
              </ChakraUI.HStack>
            </ChakraUI.Flex>

            <ChakraUI.Box maxW="6xl" mx="auto">
              <ChakraUI.Box mb={12} textAlign="center">
                <ChakraUI.Heading
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="100"
                  color="white"
                  mb={4}
                  letterSpacing="-0.02em"
                >
                  {sections[activeSection].title}
                </ChakraUI.Heading>
                <ChakraUI.Text
                  fontSize="lg"
                  fontWeight="200"
                  color="#E2C17B"
                  letterSpacing="0.02em"
                >
                  {sections[activeSection].subtitle}
                </ChakraUI.Text>
              </ChakraUI.Box>

              <ChakraUI.Box
                bg="#050505"
                border="1px solid"
                borderColor="rgba(226, 193, 123, 0.1)"
                p={12}
              >
                {sections[activeSection].content}
              </ChakraUI.Box>
            </ChakraUI.Box>

            <ChakraUI.Box mt={20} textAlign="center">
              <ChakraUI.Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="100"
                color="white"
                mb={8}
                letterSpacing="-0.02em"
              >
                READY TO
                <ChakraUI.Box as="span" display="block" color="#E2C17B">
                  EXPERIENCE?
                </ChakraUI.Box>
              </ChakraUI.Heading>
              <ChakraUI.HStack spacing={6} justify="center" flexWrap="wrap">
                <ChakraUI.Button
                  as="a"
                  href="/experience"
                  px={12}
                  py={6}
                  bg="white"
                  color="black"
                  fontFamily="Inter"
                  fontWeight="400"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  borderRadius="0"
                  _hover={{
                    bg: "#E2C17B",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.3s"
                >
                  Experience Cards
                </ChakraUI.Button>
                <ChakraUI.Button
                  as="a"
                  href="/"
                  px={12}
                  py={6}
                  variant="outline"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                  fontFamily="Inter"
                  fontWeight="300"
                  fontSize="sm"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  borderRadius="0"
                  _hover={{
                    borderColor: "white",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.3s"
                >
                  Return Home
                </ChakraUI.Button>
              </ChakraUI.HStack>
            </ChakraUI.Box>
          </ChakraUI.Container>
        </ChakraUI.Box>
      </ChakraUI.Box>
    </ChakraUI.ChakraProvider>
  );
}

export default MainComponent;