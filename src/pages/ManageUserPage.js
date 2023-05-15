import React from "react";
import {Box,Text,Heading,VStack,FormControl,Input,Link,Button,HStack,Center,NativeBaseProvider,Flex} from "native-base";
import AppBar from "../component/AppBar"
import LeftMenu from "../component/LeftMenu";

const ManageUserPage = () => {
    return (
        <Center w="100%" backgroundColor="#003572">
         <AppBar />
         <Flex direction="row" zIndex="0" mt="10" mb="2.5" w="90%" borderColor="white"  borderWidth={1} >
            <Box borderRightColor="white"  borderWidth={1} w="30%">
                <LeftMenu />
            </Box>
            <Box flex={1} p="6" minHeight="500px">
            <VStack>
                <HStack>
                <Center size="16" bg="primary.100" _text={{
                color: "coolGray.800" }}> User
                </Center>
                <Center size="16" bg="primary.200" _text={{
                color: "coolGray.800" }}> User
                </Center>
                <Center bg="primary.300" size="16" _text={{
                color: "coolGray.800" }}> User
                </Center>
                </HStack>
            </VStack>
            <VStack>
                <HStack>
                <Center size="16" bg="primary.100" _text={{
                color: "coolGray.800" }}> User
                </Center>
                <Center size="16" bg="primary.200" _text={{
                color: "coolGray.800" }}> User
                </Center>
                <Center bg="primary.300" size="16" _text={{
                color: "coolGray.800" }}> User
                </Center>
                </HStack>
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
    <Center flex={1} >
      <ManageUserPage />
    </Center>
   </NativeBaseProvider>
   );
   };