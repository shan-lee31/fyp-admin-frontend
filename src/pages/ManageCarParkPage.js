import React, { useEffect, useState } from "react";
import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Flex,
  Icon,
  Divider,
} from "native-base";

const ManageCarParkPage = () => {
  const [buildings, setBuildings] = useState([]);
  var itemCount = 0;

  const titles = ["No","Name", "Address", "Capacity","Available Space"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/carparkbuilding");
      const data = await response.json();
      setBuildings(data);
      itemCount = data.length;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Center w="100%" backgroundColor="#003572">
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
          <VStack divider={<Divider />} borderBottomWidth={1} borderColor="white" space={3}>
            <HStack>
              {titles.map((title, index) => (
                <HStack key={index} flex={1}>
                  <Text color="white" flexWrap="wrap">{title}</Text>
                </HStack>
              ))}
            </HStack>

            <VStack divider={<Divider />} space={3} alignContent="center">
              {buildings.map((building,index) => (
                <HStack key={building._id} alignItems="center" >
                  <Text color="white" flex="auto">{index + 1}</Text>
                  <Text color="white" flex={1}>{building.name}</Text>
                  <Text color="white" flex={1}>{building.address}</Text>
                  <Text color="white" flex={1}>{building.capacity}</Text>
                  <Text color="white" flex={1}>{building.availableSpace}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
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
        <ManageCarParkPage />
      </Center>
    </NativeBaseProvider>
  );
};
