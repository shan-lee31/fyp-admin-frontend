import React, {useState} from "react";
import img from "../assets/logo.png"
import {Box,Text,Heading,VStack,FormControl,Input,Link,Button,HStack,Center,NativeBaseProvider,Pressable,Icon,useColorMode,Image} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppBar = () => {

    const [show, setShow] = useState(false);
    const [isHover, setHover] = useState(false);
    const username = localStorage.getItem("username")
    

  const navigate = useNavigate()


    const setLogOut = () => {
        localStorage.removeItem("level");
        localStorage.removeItem("username");
        // localStorage.removeItem("_grecaptcha");
        navigate("/");
        // window.location.reload(); 
        toast.success("Successfully Logout");
    }

    return <Box safeArea  w="90%" height="100%"> 
    <HStack px="1" py="3" justifyContent="space-between" alignItems="center" >
        <HStack alignItems="center" >
            <Image source={{ uri: img }} width="100" height="50" alt="logo" onPress="/home"/>
            <Heading mt="1" color="#F79520" fontWeight="medium" size="ml" marginLeft="5"> Adminstrator </Heading>
        </HStack>
        <Pressable onHoverIn={() => setHover(!isHover)} onHoverOut={() => setHover(isHover)}  onPress={() => setHover(!isHover)}>
        <HStack alignItems="center"  bg={isHover ? "red.100" : ""} p="5" rounded="2" minWidth="100px">
        <FontAwesomeIcon icon={faUser} size="lg" color={isHover ? "black" : "white"} />
        <Text fontSize="15" color={isHover ? "black" : "white"} marginLeft="5">{username}</Text> 
        </HStack>
        <VStack alignItems="end"  display={isHover ? "" : "none"} >
            <HStack alignItems="center" p="2" rounded="2" position="absolute" zIndex="2">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="sm" color={show ? "black" : "white"} />
                <Text fontSize="12" color={show ? "black" : "white"} marginLeft="5"  onPress={setLogOut} >Log Out</Text> 
            </HStack>
        </VStack>
        </Pressable>
    </HStack>
 
 </Box>
}

export default AppBar;