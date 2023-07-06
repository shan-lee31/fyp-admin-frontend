import React, { useState, useEffect } from "react";
import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import request from "../assets/request.png";
import reservedLot from "../assets/reservedLot.png";
import usersImg from "../assets/users.png";
import {
  Box,
  Text,
  Heading,
  VStack,
  Image,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Flex,
} from "native-base";
import axios from "axios";
import { Route, Navigate, Routes } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState(0);
  const [availableLots, setAvailableLots] = useState(0);
  const [reserveRequest, setReserveRequest] = useState(0);

  const getData = async () => {
    try {
      await axios
        .get("http://localhost:3500/get-admin-home-data")
        .then((response) => {
          if (response) {
            setUsers(response.data.users);
            setAvailableLots(response.data.availableLots);
            setReserveRequest(response.data.reserveRequest);
          } else {
            console.log("error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  getData();
  return (
    <Center w="100%">
      <AppBar />
      <Flex
        direction="row"
        zIndex="0"
        mt="10"
        mb="2.5"
        w="90%"
        borderColor="white"
        borderWidth={1}
      >
        <Box borderRightColor="white" borderWidth={1} w="30%">
          <LeftMenu />
        </Box>
        <Box flex={1} p="6" minHeight="500px">
          <HStack space={3}>
            <HStack
              bgColor={"white"}
              flex={1}
              borderWidth={1}
              minHeight={200}
              borderRadius={10}
              p={2}
            >
              <VStack justifyContent={"center"} flex={1}>
                <Image
                  source={{ uri: usersImg }}
                  width="100"
                  height="100"
                  alt="logo"
                ></Image>
              </VStack>
              <VStack justifyContent={"center"} flex={1}>
                <Text fontSize={60}>{users}</Text>
                <Text fontSize={20}>Registered Users</Text>
              </VStack>
            </HStack>
            <HStack
              bgColor={"white"}
              flex={1}
              borderWidth={1}
              minHeight={200}
              borderRadius={10}
              p={2}
            >
              <VStack justifyContent={"center"} flex={1}>
                <Image
                  source={{ uri: reservedLot }}
                  width="100"
                  height="100"
                  alt="logo"
                ></Image>
              </VStack>
              <VStack justifyContent={"center"} flex={1}>
                <Text fontSize={60}>{availableLots}</Text>
                <Text fontSize={20}>Available Parking Lots</Text>
              </VStack>
            </HStack>
            <HStack
              bgColor={"white"}
              flex={1}
              borderWidth={1}
              minHeight={200}
              borderRadius={10}
              p={2}
            >
              <VStack justifyContent={"center"} flex={1}>
                <Image
                  source={{ uri: request }}
                  width="100"
                  height="100"
                  alt="logo"
                ></Image>
              </VStack>
              <VStack justifyContent={"center"} flex={1}>
                <Text fontSize={60}>{reserveRequest}</Text>
                <Text fontSize={20}>Reservation Requests</Text>
              </VStack>
            </HStack>
          </HStack>
        </Box>
      </Flex>
    </Center>
  );
};

// export default User;

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Home />
      </Center>
    </NativeBaseProvider>
  );
};
