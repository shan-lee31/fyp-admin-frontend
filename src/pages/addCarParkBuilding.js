import React, { useState, useEffect } from "react";
import axios from "axios";
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
  useNativeBase,
} from "native-base";
import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCarPark = () => {
  const navigate = useNavigate();
  const [addForm, setAddForm] = useState({
    name: "",
    googlePlusCode: "",
    capacity: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (addForm.capacity.length == 0 || null) {
        toast.error("Please enter value for capacity.");
      } else {
        await axios
          .post("http://localhost:3500/addBuilding", {
            addForm,
          })
          .then((res) => {
            if (res.data == "exist") {
              toast.error("Duplicated Car Park");
            } else if ((res.data = "Not Exist")) {
              toast.success("Successfully added a new car park building!");
              navigate("/manage-carpark");
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
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
          <Heading mt="1" color="#F79520" fontWeight="medium" size="ml">
            {" "}
            Add Car Park Building{" "}
          </Heading>
          <VStack space={3} mt="5" p="2">
            <form action="POST" method="/addBuilding">
              <FormControl isRequired>
                <Text color="white" style={{ marginBottom: 2 }}>
                  Car Park Building Name
                </Text>
                <Input
                  color="white"
                  onChangeText={(value) =>
                    setAddForm({ ...addForm, name: value })
                  }
                />
              </FormControl>
              <br></br>
              <FormControl isRequired>
                <Text color="white" style={{ marginBottom: 2 }}>
                  Google Plus Code
                </Text>
                <Input
                  color="white"
                  onChangeText={(value) =>
                    setAddForm({ ...addForm, googlePlusCode: value })
                  }
                />
              </FormControl>
              <br></br>
              <FormControl isRequired style={{ color: "white" }}>
                <Text color="white" style={{ marginBottom: 2 }}>
                  Capacity
                </Text>
                <Input
                  color="white"
                  onChangeText={(value) =>
                    setAddForm({ ...addForm, capacity: value })
                  }
                />
              </FormControl>
              <br></br>
              <Button mt="2" colorScheme="indigo" onPress={submit}>
                Add Building
              </Button>
            </form>
          </VStack>
        </Box>
      </Flex>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <AddCarPark />
      </Center>
    </NativeBaseProvider>
  );
};
