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
  View,
  Table, Thead, Tbody, Tr, Th, Td
} from "native-base";

const ManageCarParkPage = () => {
  const [buildings, setBuildings] = useState([]);
  var itemCount = 0;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/carparkbuilding");
      const data = await response.json();
      setBuildings(data);
      itemCount = data.length
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
        {/* <VStack divider={<Divider />}>
            
              <HStack >
              <Text color="white"> Name  </Text>
              <Text color="white"> Address  </Text>
              <Text color="white"> Capacity  </Text>
              </HStack>
          </VStack> */}
          <VStack divider={<Divider />} space={2}>
            <HStack >
              <Text color="white" w="200"> Name  </Text>
              <Text color="white"  w="200"> Address  </Text>
              <Text color="white"  w="200"> Capacity  </Text>
            </HStack>
            {buildings.map((building) => (
              <HStack >
              <Text color="white" key={building._id}>{building.name} {building.address} {building.capacity}   </Text>
              </HStack>
            ))}
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
