import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Modal,
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
  Pressable,
} from "native-base";
import AppBar from "../component/AppBar";
import LeftMenu from "../component/LeftMenu";
import axios from "axios";

const ManageReservation = () => {
 

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
         <Text>Reservation</Text>
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
        <ManageReservation />
      </Center>
    </NativeBaseProvider>
  );
};
