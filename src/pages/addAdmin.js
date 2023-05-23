import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Select,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    cpassowrd:"",
    level:''
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (form.password.length < 6 ) {
        toast.error("Password must have more than 6 characters.")
      } 
      else{
        await axios.post("http://localhost:8000/sign-up",{
          form
        })
        .then(res=>{
            if(res.data == "exist"){
              toast.error("Email already exist")
            }
            else if (res.data="Not Exist"){
              toast.success("Successfully registered!")
              navigate("/manage-user")
            }
          })
        }
      }
      catch(e){
        console.log(e)
      }
    }
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
        <Heading mt="1" color="#F79520" fontWeight="medium" size="ml" > Add Admin </Heading>
          <VStack space={4} mt="5" p="2">
          <form action="POST" method="/signup">
          <Text color="white" style={{ marginBottom: 2 }}>
                  Admin Name
                </Text>
            <Input color="white" onChangeText={value => setForm({...form, name:value})}/>
            <br></br>
            <Text color="white" style={{ marginBottom: 2 }}>
                  Email address
                </Text>
            <Input type="email" color="white" placeholder="example@email.com" onChangeText={value => setForm({...form, email:value})}/>
            <br></br>
            <Text color="white" style={{ marginBottom: 2 }}>
                 Password
                </Text>
            <Input type="password" color="white" onChangeText={value => setForm({...form, password:value})}/>
            <br></br>
            <Text color="white" style={{ marginBottom: 2 }}>
                  Confirm Password
                </Text>
            <Input type="password" color="white" onChangeText={value => setForm({...form, cpassword:value})}/>
          <br></br>
          <Text color="white" style={{ marginBottom: 2 }}>
                  level
                </Text>
            {/* <Input color="white" onChangeText={value => setForm({...form, level:value})}/> */}

            <Select selectedValue={form.level} flex={1} placeholder="Choose level" color={"white"}
            _selectedItem={{endIcon: <FontAwesomeIcon icon={faCheck} p="5" color="white" />}} mt={1} onValueChange={itemValue => setForm({...form, level:itemValue})}>
          <Select.Item label="1" value="1"  />
          <Select.Item label="2" value="2" />
        </Select>
            <br></br>
          <Button mt="2" colorScheme="indigo" onPress={submit}>
            Create Admin
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
        <AddAdmin />
      </Center>
    </NativeBaseProvider>
  );
};
