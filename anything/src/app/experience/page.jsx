"use client";
import React from "react";
import Navigation from "../../components/navigation";
import * as ChakraUI from "@chakra-ui/react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function MainComponent() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeView, setActiveView] = React.useState("visual");
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState(null);

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/major-arcana", { method: "POST" });
        const data = await response.json();
        if (data.cards) {
          setCards(data.cards);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
      setIsLoading(false);
    };

    fetchCards();
  }, []);

  return (
    <ChakraUI.ChakraProvider>
      <ChakraUI.Box
        minH="100vh"
        bg="#0A0A0A"
        color="white"
        overflow="hidden"
        fontFamily="Inter"
      >
        <Navigation activeRoute="/experience" />

        <ChakraUI.Box position="absolute" inset="0" bg="#0A0A0A" />

        <ChakraUI.Container
          maxW="7xl"
          px={4}
          py={12}
          mt={16}
          position="relative"
          zIndex="10"
        >
          <ChakraUI.Heading
            fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }}
            fontFamily="Inter"
            fontWeight="100"
            textAlign="center"
            mb={16}
            color="white"
            lineHeight="0.9"
            letterSpacing="-0.04em"
          >
            EXPERIENCE
            <ChakraUI.Box as="span" display="block" color="#E2C17B" mt="-8px">
              THE CARDS
            </ChakraUI.Box>
          </ChakraUI.Heading>

          <ChakraUI.HStack justify="center" spacing={8} mb={20}>
            <ChakraUI.Button
              onClick={() => setActiveView("visual")}
              px={12}
              py={6}
              fontFamily="Inter"
              fontWeight="300"
              fontSize="sm"
              letterSpacing="0.1em"
              textTransform="uppercase"
              borderRadius="0"
              bg={activeView === "visual" ? "white" : "transparent"}
              color={activeView === "visual" ? "black" : "white"}
              border={activeView === "visual" ? "none" : "1px solid"}
              borderColor="rgba(255, 255, 255, 0.2)"
              _hover={{
                borderColor: activeView === "visual" ? "none" : "white",
              }}
              transition="all 0.3s"
            >
              Visual Experience
            </ChakraUI.Button>
            <ChakraUI.Button
              onClick={() => setActiveView("quantum")}
              px={12}
              py={6}
              fontFamily="Inter"
              fontWeight="300"
              fontSize="sm"
              letterSpacing="0.1em"
              textTransform="uppercase"
              borderRadius="0"
              bg={activeView === "quantum" ? "white" : "transparent"}
              color={activeView === "quantum" ? "black" : "white"}
              border={activeView === "quantum" ? "none" : "1px solid"}
              borderColor="rgba(255, 255, 255, 0.2)"
              _hover={{
                borderColor: activeView === "quantum" ? "none" : "white",
              }}
              transition="all 0.3s"
            >
              Quantum Properties
            </ChakraUI.Button>
          </ChakraUI.HStack>

          {isLoading ? (
            <ChakraUI.Text
              textAlign="center"
              color="#E2C17B"
              fontSize="xl"
              fontFamily="Inter"
              fontWeight="200"
              letterSpacing="0.02em"
            >
              <i
                className="fas fa-spinner fa-spin"
                style={{ marginRight: "12px" }}
              ></i>
              Attuning to cosmic frequencies...
            </ChakraUI.Text>
          ) : (
            <ChakraUI.SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={12}
              maxW="7xl"
              mx="auto"
            >
              {cards.map((card) => (
                <ChakraUI.Box
                  key={card.number}
                  onClick={() => setSelectedCard(card)}
                  onMouseEnter={() => setHoveredCard(card.number)}
                  onMouseLeave={() => setHoveredCard(null)}
                  cursor="pointer"
                  role="group"
                  transition="all 0.7s"
                  transform={
                    selectedCard?.number === card.number
                      ? "scale(1.05)"
                      : "scale(1)"
                  }
                  _hover={{ transform: "scale(1.02)" }}
                >
                  <ChakraUI.Box
                    position="relative"
                    w="full"
                    aspectRatio="2/3"
                    transition="transform 1s"
                    transform={
                      selectedCard?.number === card.number && isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0)"
                    }
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of card */}
                    <ChakraUI.Box
                      position="absolute"
                      inset="0"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <ChakraUI.Box
                        position="absolute"
                        inset="0"
                        bgGradient="linear(to-br, #1A1A1A, #0A0A0A)"
                        border="1px solid"
                        borderColor="rgba(226, 193, 123, 0.1)"
                        overflow="hidden"
                        transition="all 0.5s"
                        _groupHover={{
                          borderColor: "rgba(226, 193, 123, 0.3)",
                          boxShadow: "0 0 30px rgba(226, 193, 123, 0.15)",
                        }}
                      >
                        {/* Sigil Background */}
                        {card.sigilUrl && (
                          <ChakraUI.Box
                            position="absolute"
                            inset="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            opacity={hoveredCard === card.number ? 0.3 : 0.15}
                            transform={
                              hoveredCard === card.number
                                ? "scale(1.1)"
                                : "scale(1)"
                            }
                            transition="all 0.7s"
                          >
                            <ChakraUI.Image
                              src={card.sigilUrl}
                              alt={`${card.harmonicName} sigil`}
                              w="full"
                              h="full"
                              objectFit="contain"
                              filter="drop-shadow(0 0 20px rgba(226, 193, 123, 0.3))"
                            />
                          </ChakraUI.Box>
                        )}

                        <ChakraUI.Box
                          position="absolute"
                          inset="0"
                          bg="rgba(0, 0, 0, 0.4)"
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          p={8}
                        >
                          {/* Card Header */}
                          <ChakraUI.Box>
                            <ChakraUI.Text
                              fontSize="xs"
                              fontFamily="Inter"
                              fontWeight="300"
                              color="rgba(226, 193, 123, 0.6)"
                              letterSpacing="0.2em"
                              textTransform="uppercase"
                            >
                              {card.traditionalName}
                            </ChakraUI.Text>
                            <ChakraUI.Heading
                              size="md"
                              fontFamily="Inter"
                              fontWeight="200"
                              color="#E2C17B"
                              mb={3}
                              letterSpacing="-0.01em"
                            >
                              {card.harmonicName}
                            </ChakraUI.Heading>

                            {/* Sigil Icon */}
                            {card.sigilUrl && (
                              <ChakraUI.Box
                                w="16"
                                h="16"
                                mb={4}
                                opacity={hoveredCard === card.number ? 1 : 0.8}
                                transform={
                                  hoveredCard === card.number
                                    ? "scale(1.1)"
                                    : "scale(1)"
                                }
                                transition="all 0.5s"
                              >
                                <ChakraUI.Image
                                  src={card.sigilUrl}
                                  alt={`${card.harmonicName} sigil`}
                                  w="full"
                                  h="full"
                                  objectFit="contain"
                                  filter="brightness(0) saturate(100%) invert(85%) sepia(15%) saturate(1352%) hue-rotate(15deg) brightness(95%) contrast(90%)"
                                />
                              </ChakraUI.Box>
                            )}
                          </ChakraUI.Box>

                          {/* Card Content */}
                          {activeView === "quantum" ? (
                            <ChakraUI.VStack
                              spacing={3}
                              align="start"
                              fontSize="sm"
                              fontFamily="Inter"
                              fontWeight="200"
                            >
                              <ChakraUI.Text color="rgba(255, 255, 255, 0.8)">
                                <ChakraUI.Box
                                  as="span"
                                  color="#E2C17B"
                                  letterSpacing="0.1em"
                                  textTransform="uppercase"
                                  fontSize="xs"
                                >
                                  Frequency:
                                </ChakraUI.Box>{" "}
                                <ChakraUI.Box as="span" fontWeight="300">
                                  {card.frequency}
                                </ChakraUI.Box>
                              </ChakraUI.Text>
                              <ChakraUI.Text color="rgba(255, 255, 255, 0.8)">
                                <ChakraUI.Box
                                  as="span"
                                  color="#E2C17B"
                                  letterSpacing="0.1em"
                                  textTransform="uppercase"
                                  fontSize="xs"
                                >
                                  Quantum:
                                </ChakraUI.Box>{" "}
                                <ChakraUI.Box as="span" fontWeight="300">
                                  {card.quantum}
                                </ChakraUI.Box>
                              </ChakraUI.Text>
                              <ChakraUI.Text color="rgba(255, 255, 255, 0.8)">
                                <ChakraUI.Box
                                  as="span"
                                  color="#E2C17B"
                                  letterSpacing="0.1em"
                                  textTransform="uppercase"
                                  fontSize="xs"
                                >
                                  Geometry:
                                </ChakraUI.Box>{" "}
                                <ChakraUI.Box as="span" fontWeight="300">
                                  {card.geometry}
                                </ChakraUI.Box>
                              </ChakraUI.Text>
                              <ChakraUI.Text color="rgba(255, 255, 255, 0.8)">
                                <ChakraUI.Box
                                  as="span"
                                  color="#E2C17B"
                                  letterSpacing="0.1em"
                                  textTransform="uppercase"
                                  fontSize="xs"
                                >
                                  Note:
                                </ChakraUI.Box>{" "}
                                <ChakraUI.Box as="span" fontWeight="300">
                                  {card.note}
                                </ChakraUI.Box>
                              </ChakraUI.Text>
                              <ChakraUI.Text color="rgba(255, 255, 255, 0.8)">
                                <ChakraUI.Box
                                  as="span"
                                  color="#E2C17B"
                                  letterSpacing="0.1em"
                                  textTransform="uppercase"
                                  fontSize="xs"
                                >
                                  Celestial:
                                </ChakraUI.Box>{" "}
                                <ChakraUI.Box as="span" fontWeight="300">
                                  {card.astro}
                                </ChakraUI.Box>
                              </ChakraUI.Text>
                            </ChakraUI.VStack>
                          ) : (
                            <ChakraUI.Text
                              fontSize="sm"
                              color="rgba(255, 255, 255, 0.7)"
                              fontFamily="Inter"
                              fontWeight="200"
                              lineHeight="relaxed"
                            >
                              {card.vibration}
                            </ChakraUI.Text>
                          )}
                        </ChakraUI.Box>
                      </ChakraUI.Box>
                    </ChakraUI.Box>

                    {/* Back of card */}
                    <ChakraUI.Box
                      position="absolute"
                      inset="0"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <ChakraUI.Box
                        position="absolute"
                        inset="0"
                        bgGradient="linear(to-br, #1A1A1A, #0A0A0A)"
                        border="1px solid"
                        borderColor="rgba(226, 193, 123, 0.1)"
                        p={8}
                      >
                        {/* Large Sigil Background */}
                        {card.sigilUrl && (
                          <ChakraUI.Box
                            position="absolute"
                            inset="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            opacity={0.1}
                          >
                            <ChakraUI.Image
                              src={card.sigilUrl}
                              alt={`${card.harmonicName} sigil`}
                              w="full"
                              h="full"
                              objectFit="contain"
                            />
                          </ChakraUI.Box>
                        )}

                        <ChakraUI.VStack
                          h="full"
                          justify="space-between"
                          position="relative"
                          zIndex="10"
                        >
                          <ChakraUI.Box textAlign="center">
                            {/* Centered Sigil */}
                            {card.sigilUrl && (
                              <ChakraUI.Box
                                w="24"
                                h="24"
                                mx="auto"
                                mb={6}
                                opacity={0.9}
                              >
                                <ChakraUI.Image
                                  src={card.sigilUrl}
                                  alt={`${card.harmonicName} sigil`}
                                  w="full"
                                  h="full"
                                  objectFit="contain"
                                  filter="brightness(0) saturate(100%) invert(85%) sepia(15%) saturate(1352%) hue-rotate(15deg) brightness(95%) contrast(90%)"
                                />
                              </ChakraUI.Box>
                            )}

                            <ChakraUI.Heading
                              size="md"
                              fontFamily="Inter"
                              fontWeight="200"
                              color="#E2C17B"
                              mb={6}
                              letterSpacing="-0.01em"
                            >
                              {card.harmonicName}
                            </ChakraUI.Heading>
                          </ChakraUI.Box>

                          <ChakraUI.VStack
                            flex="1"
                            overflowY="auto"
                            color="rgba(255, 255, 255, 0.7)"
                            spacing={4}
                            fontFamily="Inter"
                            fontWeight="200"
                            lineHeight="relaxed"
                          >
                            <ChakraUI.Text>
                              <ChakraUI.Box
                                as="span"
                                color="#E2C17B"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                              >
                                Quantum Resonance:
                              </ChakraUI.Box>{" "}
                              {card.quantum}
                            </ChakraUI.Text>
                            <ChakraUI.Text>
                              <ChakraUI.Box
                                as="span"
                                color="#E2C17B"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                              >
                                Frequency Domain:
                              </ChakraUI.Box>{" "}
                              {card.frequency}
                            </ChakraUI.Text>
                            <ChakraUI.Text>
                              <ChakraUI.Box
                                as="span"
                                color="#E2C17B"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                              >
                                Sacred Geometry:
                              </ChakraUI.Box>{" "}
                              {card.geometry}
                            </ChakraUI.Text>
                            <ChakraUI.Text>
                              <ChakraUI.Box
                                as="span"
                                color="#E2C17B"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                              >
                                Astronomical Alignment:
                              </ChakraUI.Box>{" "}
                              {card.astro}
                            </ChakraUI.Text>
                            <ChakraUI.Text>
                              <ChakraUI.Box
                                as="span"
                                color="#E2C17B"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                              >
                                Vibrational State:
                              </ChakraUI.Box>{" "}
                              {card.vibration}
                            </ChakraUI.Text>
                          </ChakraUI.VStack>
                        </ChakraUI.VStack>
                      </ChakraUI.Box>
                    </ChakraUI.Box>
                  </ChakraUI.Box>
                </ChakraUI.Box>
              ))}
            </ChakraUI.SimpleGrid>
          )}

          {selectedCard && (
            <ChakraUI.Box mt={20} textAlign="center">
              <ChakraUI.Button
                onClick={() => setIsFlipped(!isFlipped)}
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
                {isFlipped ? "Show Card" : "Reveal Quantum Properties"}
              </ChakraUI.Button>
            </ChakraUI.Box>
          )}
        </ChakraUI.Container>
      </ChakraUI.Box>
    </ChakraUI.ChakraProvider>
  );
}

export default MainComponent;