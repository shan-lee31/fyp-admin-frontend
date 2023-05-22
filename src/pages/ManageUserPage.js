import React, {useState,useEffect} from "react";
import {Box,Text,Heading,VStack,FormControl,Input,Link,Button,Divider,HStack,Center,NativeBaseProvider,Flex} from "native-base";
import AppBar from "../component/AppBar"
import LeftMenu from "../component/LeftMenu";

const ManageUserPage = () => {

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/manageuser");
          const data = await response.json();
          setUsers(data);
        //   itemCount = data.length;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

    return (
        <Center w="100%" backgroundColor="#003572">
         <AppBar />
         <Flex direction="row" zIndex="0" mt="10" mb="2.5" w="90%" borderColor="white"  borderWidth={1} >
            <Box borderRightColor="white"  borderWidth={1} w="30%">
                <LeftMenu />
            </Box>
            <Box flex={1} p="6" minHeight="500px">
            <VStack
            divider={<Divider />}
            borderColor="white"
            space={3}
          >
              <HStack>
                  <Text color="white" flexWrap="wrap" flex={1} >
                    Name
                  </Text>
                  <Text color="white" flexWrap="wrap" flex={1}>
                    Email
                  </Text>
                  <Text color="white" flexWrap="wrap" flex={1}>
                    Level
                  </Text>
                  <Text color="white" flexWrap="wrap" flex={1}>
                    Level
                  </Text>
                </HStack>
            <HStack>
              {users.map((user, index) => (
                <HStack key={index} flex={1}>
                  <Text color="white" flexWrap="wrap" flex={1} >
                    {user.name}
                  </Text>
                  <Text color="white" flexWrap="wrap" flex={1}>
                    {user.email}
                  </Text>
                  <Text color="white" flexWrap="wrap" flex={1}>
                    {user.level}
                  </Text>
                  <HStack flex={1}>
                  <Link _text={{
                        color: "#F79520",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                      href="#">
                      Edit
                    </Link>
                    <Text color="white">
                    {" "} |  {" "}
                    </Text>
                    <Link
                      _text={{
                        color: "red.300",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                      href="#"
                    >
                      Delete
                    </Link>
                  </HStack>
                </HStack>
              ))}
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