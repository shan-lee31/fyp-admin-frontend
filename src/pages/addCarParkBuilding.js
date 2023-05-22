import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Divider,
  HStack,
  Center,
  NativeBaseProvider,
  Flex,
} from "native-base";
import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import { toast } from "react-toastify";

const AddCarPark = () => {
  const [form, setForm] = useState({
    name: "",
    plusCode: "",
    capacity: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (true) {
        toast.success("can submit");
      } else {
        toast.error("error");
      }
    } catch (e) {
      console.log(e);
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
        <Heading mt="1" color="#F79520" fontWeight="medium" size="ml" > Add Car Park Building </Heading>
          <VStack space={3} mt="5" p="2">
            <form action="POST" method="/addBuilding">
              <FormControl isRequired>
                <Text color="white" style={{ marginBottom: 2 }}>
                  Car Park Building Name
                </Text>
                <Input color="white"
                  onChangeText={(value) => setForm({ ...form, name: value })}
                />
              </FormControl>
              <br></br>
              <FormControl isRequired>
                <Text color="white" style={{ marginBottom: 2 }}>Google Plus Code</Text>
                <Input color="white"
                  onChangeText={(value) => setForm({ ...form, plusCode: value })}
                />
              </FormControl>
              <br></br>
              <FormControl isRequired style={{ color: "white" }}>
              <Text color="white" style={{ marginBottom: 2 }}>Capacity</Text>
                <Input color="white"
                  onChangeText={(value) =>
                    setForm({ ...form, capacity: value })
                  }
                />
              </FormControl>
              {/* <FormControl isRequired>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input onChangeText={value => setForm({...form, cpassword:value})}/>
          </FormControl> */}
              <br></br>
              <Button mt="2" colorScheme="indigo" onPress={submit}>
                Add
              </Button>
            </form>
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
        <AddCarPark />
      </Center>
    </NativeBaseProvider>
  );
};
