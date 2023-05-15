import React, { useState } from "react";
import {Box,Text,Heading,VStack,FormControl,Input,Link,Button,HStack,Center,NativeBaseProvider,Pressable,Icon,useColorMode,Image} from "native-base";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import img from "../assets/logo.png"
import './page.css'

const LogIn = () => {

  // const [captchaVal, setCaptchaVal] = useState(null)
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate()

  const submit = async(e) => {
    try{
    //   if (!captchaVal){
    //     toast.error("Fill in the captcha!")
    //   }
    // else{
      await axios.post("http://localhost:8000/login",{
        form
      })
      .then(res =>{
        if (res.data.message == "LoginPass"){
          navigate("/home")
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username',res.data.username);
          toast.success("Successfully Login")
        }
        else if (res.data == "No user"){
          toast.error("Email is not registered.")
        }
        else if (res.data == "loginFail"){
          toast.error("Wrong Credentials");
        }
        else if (res.data == "fail"){
          toast.error("Something is wrong!");
        }
      })
      .catch(e => {
        console.log(e)
        toast.error("Someting went wrong!");
      })
  }
    catch(e){
      console.log(e)
    }
  }

  return (
    <Center w="100%" backgroundColor="#003572" p="0" h="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290" height="100%">
        <VStack space={6} mt="5" justifyContent="center" alignItems="center" >
        <Image source={{ uri: img }} size="2xl" maxWidth={1200} maxHeight={150} alt="logo"/>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="#F79520"
          fontWeight="medium"
          size="ml"
          marginBottom="5"
        >
          Adminstrator
        </Heading>
        <form action="POST" method="/login">
          <FormControl isRequired  >
            <FormControl.Label >Email ID</FormControl.Label>
            <Input
             style={{ color: '#ffffff' }}
              placeholder="example@email.com"
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label  style={{ color: '#ffffff' }}>Password</FormControl.Label>
            <Input
             style={{ color: '#ffffff' }}
              type={show ? "text" : "password"} onChangeText={value => setForm({...form, password:value})}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <FontAwesomeIcon icon={show ? faEye : faEyeSlash} size="sm" style={{ marginRight: 10, color: 'grey' }}
                  />
                </Pressable>
              }
              placeholder="Password"
            />

            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password?
            </Link>
          </FormControl>
          {/* <ReCAPTCHA sitekey="6LeAqu4lAAAAADgeUFQnHmYJhNtX18-M0WlABUr9" onChange={(value)=>{setCaptchaVal(value)}} /> */}
          <Button mt="2" colorScheme="indigo" onPress={submit}>
            Sign in
          </Button>
          </form>
        </VStack>
      </Box>
    </Center>
  );
};

// export default User;

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} >
        <LogIn />
      </Center>
    </NativeBaseProvider>
  );
};
