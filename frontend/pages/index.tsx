import { Inter } from "next/font/google";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}
const inter = Inter({ subsets: ["latin"] });
const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};
interface TechProp {
  title: string;
  text: string;
  icon: ReactElement;
}

const Techstack = ({ title, text, icon }: TechProp) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};
export default function Home() {
  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Product Feature
          </Text>
          <Heading>Perpetual Public Funding Protocol(PPFG)</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            PPFG is a decentralized funding protocol that allows users to create
            and fund projects and receive funding continuously from the
            community. By using Prediction Market, users can predict whether the
            project will achieve certain KPIs or Milestones or not. Addicionally
            the public goods projects can get grants from grant pool and
            protocol will distribute grants by following Qudratic Funding Fomula
            based on amounts of prediction. Only if the project achieves the KPI
            or Milestone, the project will receive the grants.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={"yellow.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={"Incentivize the community to fund public goods projects"}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />}
              iconBg={useColorModeValue("green.100", "green.900")}
              text={"Prediction based Quadratic Funding"}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={"Optimize opportunities for potential projects"}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"https://wtfisqf.com/logo.gif"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
      <Box p={4}>
        <Stack
          pt={20}
          spacing={4}
          as={Container}
          maxW={"3xl"}
          textAlign={"center"}
        >
          <Heading fontSize={"3xl"}>Tech Stack behind PPFP</Heading>
          <Text color={"gray.600"} fontSize={"xl"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Text>
        </Stack>
      </Box>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Techstack
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Lifetime Support"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Techstack
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Unlimited Donations"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Techstack
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Instant Delivery"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Techstack
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Lifetime Support"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Techstack
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Unlimited Donations"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Techstack
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Instant Delivery"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
        </SimpleGrid>
      </Box>
      <Box p={4}>
        <Stack
          pt={20}
          spacing={4}
          as={Container}
          maxW={"3xl"}
          textAlign={"center"}
        >
          <Heading fontSize={"3xl"}>How it works?</Heading>
          <Text color={"gray.600"} fontSize={"xl"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Text>
        </Stack>
      </Box>
      <div className=" justify-center flex flex-col"></div>
    </Container>
  );
}
