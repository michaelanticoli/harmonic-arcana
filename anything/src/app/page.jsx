"use client";
import React from "react";
import Navigation from "../components/navigation";
import * as ChakraUI from "@chakra-ui/react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function MainComponent() {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [activeParticle, setActiveParticle] = React.useState(0);

  React.useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrolled = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      const timer = setTimeout(() => setIsLoaded(true), 100);

      const particleTimer = setInterval(() => {
        setActiveParticle((prev) => (prev + 1) % 3);
      }, 2000);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timer);
        clearInterval(particleTimer);
      };
    }
  }, []);

  const cards = [
    {
      id: 1,
      name: "The Magician",
      description: "Master of manifestation and cosmic frequencies",
      frequency: "528 Hz",
      element: "Air",
      image:
        "https://ucarecdn.com/d4067f5e-3070-4d6a-b91b-7454a34af379/-/format/auto/",
      gradient:
        "linear-gradient(135deg, #E2C17B 0%, #FFD700 50%, #B88746 100%)",
      soundWave: "M0,50 Q25,20 50,50 T100,50",
    },
    {
      id: 2,
      name: "High Priestess",
      description: "Keeper of divine sound and sacred wisdom",
      frequency: "741 Hz",
      element: "Water",
      image:
        "https://ucarecdn.com/e87cc26c-d49a-491c-9a86-3b2c987401d3/-/format/auto/",
      gradient:
        "linear-gradient(135deg, #4A90E2 0%, #7B68EE 50%, #9370DB 100%)",
      soundWave: "M0,50 Q25,80 50,50 T100,50",
    },
    {
      id: 3,
      name: "The Empress",
      description: "Channel of creative harmonies and abundance",
      frequency: "639 Hz",
      element: "Earth",
      image:
        "https://ucarecdn.com/8fd1c249-5481-4315-9c50-7c1be73d1740/-/format/auto/",
      gradient:
        "linear-gradient(135deg, #228B22 0%, #32CD32 50%, #90EE90 100%)",
      soundWave: "M0,50 Q25,30 50,50 T100,50",
    },
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-[#E2C17B] border-t-transparent rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-2 border-[#FFD700] border-b-transparent rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <ChakraUI.ChakraProvider>
      <ChakraUI.Box
        minH="100vh"
        bg="#0A0A0A"
        color="white"
        fontFamily="Inter"
        position="relative"
        overflow="hidden"
      >
        <Navigation activeRoute="/" />

        <ChakraUI.Box
          position="fixed"
          top="0"
          left="0"
          h="3px"
          zIndex="1000"
          transition="all 0.3s"
          boxShadow="0 0 20px rgba(226,193,123,0.8)"
          w={`${scrollProgress}%`}
          bgGradient="linear(90deg, #E2C17B, #FFD700, #B88746)"
        />

        <ChakraUI.Box position="absolute" inset="0" pointerEvents="none">
          {[
            {
              top: "20%",
              left: "10%",
              size: "8px",
              color: "#E2C17B",
              delay: "0s",
            },
            {
              top: "60%",
              right: "15%",
              size: "4px",
              color: "#FFD700",
              delay: "1s",
            },
            {
              bottom: "30%",
              left: "20%",
              size: "6px",
              color: "#B88746",
              delay: "2s",
            },
            {
              top: "40%",
              right: "30%",
              size: "3px",
              color: "#E2C17B",
              delay: "0.5s",
            },
            {
              bottom: "60%",
              right: "10%",
              size: "5px",
              color: "#FFD700",
              delay: "1.5s",
            },
          ].map((particle, index) => (
            <ChakraUI.Box
              key={index}
              position="absolute"
              {...particle}
              w={particle.size}
              h={particle.size}
              bg={particle.color}
              borderRadius="full"
              opacity="0.3"
              animation={`pulse 2s infinite ${particle.delay}`}
            />
          ))}
        </ChakraUI.Box>

        <ChakraUI.Box
          position="relative"
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <ChakraUI.Box
            position="absolute"
            inset="0"
            bgGradient="radial(circle at center, rgba(226,193,123,0.05) 0%, transparent 50%, #0A0A0A 100%)"
          />

          <ChakraUI.VStack
            spacing="12"
            position="relative"
            zIndex="10"
            textAlign="center"
            px="4"
            transition="all 1.8s cubic-bezier(0.16,1,0.3,1)"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? "translateY(0)" : "translateY(20px)"}
          >
            <ChakraUI.Box position="relative">
              <ChakraUI.Heading
                fontSize={["6xl", "8xl", "10xl"]}
                fontWeight="100"
                lineHeight="0.85"
                letterSpacing="-0.06em"
              >
                <ChakraUI.Text
                  display="block"
                  bgGradient="linear(to-br, white, #E2C17B)"
                  bgClip="text"
                  color="transparent"
                  filter="drop-shadow(0 0 40px rgba(226,193,123,0.3))"
                >
                  HARMONIC
                </ChakraUI.Text>
                <ChakraUI.Box position="relative" mt="-6">
                  <ChakraUI.Text
                    display="block"
                    bgGradient="linear(to-br, #E2C17B, #FFD700, #B88746)"
                    bgClip="text"
                    color="transparent"
                    filter="drop-shadow(0 0 40px rgba(255,215,0,0.4))"
                  >
                    ARCANA
                  </ChakraUI.Text>
                  <ChakraUI.Box
                    position="absolute"
                    bottom="-4"
                    left="50%"
                    transform="translateX(-50%)"
                    w="40"
                    h="2px"
                    bgGradient="linear(to-r, transparent, #E2C17B, transparent)"
                    boxShadow="0 0 20px rgba(226,193,123,0.6)"
                  />
                </ChakraUI.Box>
              </ChakraUI.Heading>
            </ChakraUI.Box>

            <ChakraUI.Text
              fontSize={["xl", "2xl", "3xl"]}
              fontWeight="200"
              color="whiteAlpha.800"
              maxW="800px"
              mx="auto"
              lineHeight="relaxed"
              letterSpacing="0.02em"
              textShadow="0 0 20px rgba(255,255,255,0.1)"
            >
              Ancient wisdom resonates with quantum frequencies
            </ChakraUI.Text>

            <ChakraUI.HStack
              spacing="8"
              justify="center"
              pt="8"
              flexWrap="wrap"
            >
              <ChakraUI.Link
                href="/experience"
                position="relative"
                px="20"
                py="5"
                bg="white"
                color="black"
                fontWeight="500"
                fontSize="sm"
                letterSpacing="0.15em"
                textTransform="uppercase"
                overflow="hidden"
                borderRadius="0"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 20px 60px rgba(255,255,255,0.2)",
                }}
                boxShadow="0 10px 40px rgba(255,255,255,0.1)"
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: "0",
                  bg: "linear-gradient(45deg, transparent, rgba(226,193,123,0.3), transparent)",
                  transform: "translateX(-100%)",
                  transition: "transform 0.6s",
                }}
                _groupHover={{
                  _before: { transform: "translateX(100%)" },
                }}
              >
                <ChakraUI.Text position="relative" zIndex="10">
                  Experience Cards
                </ChakraUI.Text>
              </ChakraUI.Link>

              <ChakraUI.Link
                href="/learn"
                position="relative"
                px="20"
                py="5"
                border="2px solid"
                borderColor="rgba(226,193,123,0.4)"
                color="white"
                fontWeight="400"
                fontSize="sm"
                letterSpacing="0.15em"
                textTransform="uppercase"
                borderRadius="0"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-2px)",
                  borderColor: "#E2C17B",
                  bg: "#E2C17B",
                  color: "#0A0A0A",
                  boxShadow: "0 20px 60px rgba(226,193,123,0.3)",
                }}
                boxShadow="0 10px 40px rgba(226,193,123,0.1)"
              >
                Learn More
              </ChakraUI.Link>
            </ChakraUI.HStack>
          </ChakraUI.VStack>
        </ChakraUI.Box>

        <ChakraUI.Box py="32" px={["4", "8"]} position="relative">
          <ChakraUI.Heading
            fontSize={["4xl", "6xl", "8xl"]}
            fontWeight="100"
            textAlign="center"
            mb="20"
            bgGradient="linear(to-br, white, #E2C17B)"
            bgClip="text"
            color="transparent"
            letterSpacing="-0.03em"
            filter="drop-shadow(0 0 30px rgba(226,193,123,0.2))"
          >
            FEATURED ARCANA
          </ChakraUI.Heading>

          <ChakraUI.SimpleGrid
            columns={[1, null, 3]}
            spacing="12"
            maxW="8xl"
            mx="auto"
          >
            {cards.map((card) => (
              <ChakraUI.Box
                key={card.id}
                position="relative"
                cursor="pointer"
                transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ transform: "translateY(-16px) scale(1.02)" }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="group"
              >
                <ChakraUI.Box
                  position="relative"
                  aspectRatio="2/3"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="rgba(226,193,123,0.2)"
                  borderRadius="0"
                  _groupHover={{
                    borderColor: "#E2C17B",
                    boxShadow: "0 30px 80px rgba(226,193,123,0.3)",
                  }}
                  transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <ChakraUI.Image
                    src={card.image}
                    alt={card.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    filter="brightness(0.7) contrast(1.2) saturate(1.1)"
                    _groupHover={{
                      filter: "brightness(1.1) contrast(1.3) saturate(1.2)",
                      transform: "scale(1.08)",
                    }}
                    transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                  />

                  <ChakraUI.Box
                    position="absolute"
                    inset="0"
                    bg={card.gradient}
                    mixBlendMode="overlay"
                    transition="opacity 0.6s"
                    opacity={hoveredCard === card.id ? 0.2 : 0}
                  />

                  <ChakraUI.Box
                    position="absolute"
                    top="4"
                    right="4"
                    w="12"
                    h="8"
                    transition="all 0.6s"
                    opacity={hoveredCard === card.id ? 0.9 : 0}
                    transform={
                      hoveredCard === card.id ? "scale(1.1)" : "scale(0.9)"
                    }
                  >
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path
                        d={card.soundWave}
                        stroke="#E2C17B"
                        strokeWidth="2"
                        fill="none"
                        filter="drop-shadow(0 0 8px rgba(226,193,123,0.6))"
                      />
                    </svg>
                  </ChakraUI.Box>
                </ChakraUI.Box>

                <ChakraUI.Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  p="8"
                  bgGradient="linear(to-t, blackAlpha.950, blackAlpha.800, transparent)"
                  transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  opacity={hoveredCard === card.id ? 1 : 0}
                  transform={
                    hoveredCard === card.id
                      ? "translateY(0)"
                      : "translateY(12px)"
                  }
                >
                  <ChakraUI.VStack spacing="3">
                    <ChakraUI.Text
                      fontSize="xs"
                      fontWeight="400"
                      color="#E2C17B"
                      letterSpacing="0.3em"
                      textTransform="uppercase"
                      textShadow="0 0 10px rgba(226,193,123,0.5)"
                    >
                      {card.frequency} • {card.element}
                    </ChakraUI.Text>
                    <ChakraUI.Heading
                      size="lg"
                      fontWeight="200"
                      color="white"
                      letterSpacing="-0.02em"
                      textAlign="center"
                      textShadow="0 0 20px rgba(255,255,255,0.3)"
                    >
                      {card.name}
                    </ChakraUI.Heading>
                    <ChakraUI.Text
                      fontSize="sm"
                      fontWeight="300"
                      color="whiteAlpha.900"
                      textAlign="center"
                      lineHeight="relaxed"
                    >
                      {card.description}
                    </ChakraUI.Text>
                  </ChakraUI.VStack>
                </ChakraUI.Box>
              </ChakraUI.Box>
            ))}
          </ChakraUI.SimpleGrid>
        </ChakraUI.Box>

        <ChakraUI.Box
          py="32"
          px={["4", "8"]}
          bgGradient="linear(to-br, #050505, #0A0A0A, #050505)"
          position="relative"
        >
          <ChakraUI.Container maxW="8xl" position="relative" zIndex="10">
            <ChakraUI.Heading
              fontSize={["4xl", "6xl", "8xl"]}
              fontWeight="100"
              textAlign="center"
              mb="20"
              bgGradient="linear(to-br, white, #E2C17B)"
              bgClip="text"
              color="transparent"
              letterSpacing="-0.03em"
              filter="drop-shadow(0 0 30px rgba(226,193,123,0.2))"
            >
              QUANTUM INNOVATION
            </ChakraUI.Heading>

            <ChakraUI.SimpleGrid
              columns={[1, null, 3]}
              spacing="16"
              textAlign="left"
            >
              {[
                {
                  title: "Sonic Divination",
                  description:
                    "Each card resonates with scientifically-tuned healing frequencies that synchronize with your biorhythms for enhanced intuitive perception",
                  icon: "🎵",
                  tech: "528Hz-741Hz Range",
                  gradient: "linear(135deg, #E2C17B, #FFD700)",
                },
                {
                  title: "Blockchain Secured",
                  description:
                    "NFT technology with embedded high-fidelity binaural audio and quantum-encrypted metadata ensuring authenticity and rarity",
                  icon: "🔗",
                  tech: "Web3 Integration",
                  gradient: "linear(135deg, #4A90E2, #7B68EE)",
                },
                {
                  title: "Collective Consciousness",
                  description:
                    "Join synchronized global meditation and reading sessions with real-time quantum field alignment across the network",
                  icon: "🌐",
                  tech: "Real-time Sync",
                  gradient: "linear(135deg, #228B22, #32CD32)",
                },
              ].map((feature, index) => (
                <ChakraUI.Box
                  key={index}
                  p="10"
                  border="1px solid"
                  borderColor="rgba(226,193,123,0.1)"
                  bg="rgba(226,193,123,0.02)"
                  borderRadius="0"
                  transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: "translateY(-12px)",
                    borderColor: "rgba(226,193,123,0.4)",
                    bg: "rgba(226,193,123,0.08)",
                    boxShadow: "0 25px 60px rgba(226,193,123,0.15)",
                  }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    h: "2px",
                    bgGradient: feature.gradient,
                    opacity: 0,
                    transition: "opacity 0.6s",
                  }}
                  _groupHover={{
                    _before: { opacity: 1 },
                  }}
                  role="group"
                >
                  <ChakraUI.VStack spacing="6" align="start">
                    <ChakraUI.HStack
                      spacing="4"
                      w="full"
                      justify="space-between"
                    >
                      <ChakraUI.HStack spacing="3">
                        <ChakraUI.Text
                          fontSize="2xl"
                          filter="drop-shadow(0 0 10px rgba(226,193,123,0.3))"
                        >
                          {feature.icon}
                        </ChakraUI.Text>
                        <ChakraUI.Text
                          fontSize="xs"
                          fontWeight="500"
                          color="#E2C17B"
                          letterSpacing="0.3em"
                          textTransform="uppercase"
                        >
                          0{index + 1}
                        </ChakraUI.Text>
                      </ChakraUI.HStack>
                      <ChakraUI.Text
                        fontSize="xs"
                        color="whiteAlpha.500"
                        fontFamily="mono"
                        letterSpacing="0.1em"
                      >
                        {feature.tech}
                      </ChakraUI.Text>
                    </ChakraUI.HStack>
                    <ChakraUI.Heading
                      size="xl"
                      fontWeight="200"
                      color="white"
                      letterSpacing="-0.02em"
                      textShadow="0 0 20px rgba(255,255,255,0.1)"
                    >
                      {feature.title}
                    </ChakraUI.Heading>
                    <ChakraUI.Text
                      color="whiteAlpha.800"
                      fontWeight="300"
                      lineHeight="relaxed"
                      fontSize="md"
                    >
                      {feature.description}
                    </ChakraUI.Text>
                  </ChakraUI.VStack>
                </ChakraUI.Box>
              ))}
            </ChakraUI.SimpleGrid>
          </ChakraUI.Container>
        </ChakraUI.Box>

        <ChakraUI.Box py="32" px="4" textAlign="center" position="relative">
          <ChakraUI.VStack spacing="12" position="relative" zIndex="10">
            <ChakraUI.Heading
              fontSize={["4xl", "6xl", "8xl"]}
              fontWeight="100"
              bgGradient="linear(to-br, white, #E2C17B)"
              bgClip="text"
              color="transparent"
              letterSpacing="-0.03em"
              filter="drop-shadow(0 0 30px rgba(226,193,123,0.2))"
            >
              BEGIN YOUR
              <ChakraUI.Text display="block" color="#E2C17B">
                SONIC JOURNEY
              </ChakraUI.Text>
            </ChakraUI.Heading>
            <ChakraUI.Text
              fontSize={["lg", "xl", "2xl"]}
              fontWeight="300"
              color="whiteAlpha.800"
              maxW="900px"
              mx="auto"
              lineHeight="relaxed"
              textShadow="0 0 20px rgba(255,255,255,0.1)"
            >
              Join our community of modern mystics and experience the fusion of
              ancient wisdom and quantum sonic innovation
            </ChakraUI.Text>
            <ChakraUI.Button
              position="relative"
              px="24"
              py="6"
              bg="white"
              color="black"
              fontWeight="500"
              fontSize="sm"
              letterSpacing="0.15em"
              textTransform="uppercase"
              overflow="hidden"
              borderRadius="0"
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 25px 80px rgba(255,255,255,0.2)",
              }}
              boxShadow="0 15px 50px rgba(255,255,255,0.15)"
              _before={{
                content: '""',
                position: "absolute",
                inset: "0",
                bg: "linear-gradient(45deg, transparent, rgba(226,193,123,0.4), transparent)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s",
              }}
              _groupHover={{
                _before: { transform: "translateX(100%)" },
              }}
              role="group"
            >
              <ChakraUI.Text position="relative" zIndex="10">
                Join Community
              </ChakraUI.Text>
            </ChakraUI.Button>
          </ChakraUI.VStack>
        </ChakraUI.Box>
      </ChakraUI.Box>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </ChakraUI.ChakraProvider>
  );
}

export default MainComponent;