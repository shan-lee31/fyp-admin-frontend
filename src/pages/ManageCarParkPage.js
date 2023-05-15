import React from "react";
import AppBar from "../component/AppBar"
import LeftMenu from "../component/LeftMenu";
import {Box,Text,Heading,VStack,FormControl,Input,Link,Button,HStack,Center,NativeBaseProvider,Flex} from "native-base";


const ManageCarParkPage = () => {
 return (
 <Center w="100%" backgroundColor="#003572">
     <AppBar />
     <Flex direction="row" zIndex="0" mt="10" mb="2.5" w="90%" borderColor="white"  borderWidth={1} >
            <Box borderRightColor="white"  borderWidth={1} w="30%">
              <LeftMenu />
            </Box>
            <Box flex={1} p="6" minHeight="500px">
              <Text color="white"> This is car park area.</Text>
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
   <ManageCarParkPage />
 </Center>
</NativeBaseProvider>
);
};
