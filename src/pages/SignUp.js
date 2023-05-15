import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, useNativeBase } from "native-base";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const SignUp = () => {

  const [captchaVal, setCaptchaVal] = useState(null)
  const navigate = useNavigate()
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    cpassowrd:"",

  })

  const submit = async(e) => {
    e.preventDefault()
    try{
     if (form.password.length < 6){
      toast.error("Password must have more than 6 characters.")
     }
     else if (form.password != form.cpassword){
        toast.error("Passwords do not match!")
      }
      else if(!captchaVal){
        toast.error("Fill the captcha!")
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
          }
        })
      }
    }
    catch(e){
      console.log(e)
    }
  }

    return  <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="390">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
      color: "warmGray.50"
    }}>
        Sign Up with Sun U Park!
      </Heading>
      <VStack space={4} mt="5">
          <form action="POST" method="/signup">
          <FormControl isRequired>
            <FormControl.Label >Name</FormControl.Label>
            <Input onChangeText={value => setForm({...form, name:value})}/>
          </FormControl>  
          <FormControl isRequired>
            <FormControl.Label >Email ID</FormControl.Label>
            <Input type="email" placeholder="example@email.com" onChangeText={value => setForm({...form, email:value})}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={value => setForm({...form, password:value})}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" onChangeText={value => setForm({...form, cpassword:value})}/>
          </FormControl>
          <br></br>
          {/* <ReCAPTCHA sitekey="6LeAqu4lAAAAADgeUFQnHmYJhNtX18-M0WlABUr9" onChange={(value)=>{setCaptchaVal(value)}}/> */}
          <Button mt="2" colorScheme="indigo" onPress={submit}>
            Sign Up
          </Button>
          </form>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
             Already have an account? {" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="/">
              Log In
            </Link>
          </HStack>
        </VStack>
      </Box>
      </Center>
}

export default () => {
    return (
      <NativeBaseProvider>
        <Center flex={1} px="3">
            <SignUp />
        </Center>
      </NativeBaseProvider>
    );
  };