import React, { useEffect, useState } from "react";
import AppBar from "../component/AppBar";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import LeftMenu from "../component/LeftMenu";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Flex,
  Icon,
  Divider,
  Pressable,
  Modal,
} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { BrowserRouter as Router, Switch, Route, Link2 as Link } from 'react-router-dom';
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const ManageCarParkPage = () => {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState([]);
  const [isHover, setHover] = useState(false);

  const titles = ["No", "Name", "Capacity", "Actions"];

  const styles = {
    top: {
      marginBottom: "auto",
      marginTop: 0,
    },
    bottom: {
      marginBottom: 0,
      marginTop: "auto",
    },
    left: {
      marginLeft: 0,
      marginRight: "auto",
    },
    right: {
      marginLeft: "auto",
      marginRight: 0,
    },
    center: {},
  };
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [buildingItem, setBuildingItem] = useState({});
  const [updateInfo,setUpdateInfo] = useState({
    name:"",
    capacity:"",

  })

  const openModal = (placement, buildingItem) => {
    setOpen(true);
    setPlacement(placement);
    setBuildingItem(buildingItem);
    setUpdateInfo({name:buildingItem.name,capacity:buildingItem.capacity})
  };
  const handleEditInfo = async(e) => {
    try{
      await axios.post("http://localhost:8000/updateCarParkInfo",{
        updateInfo
      })
      .then(res =>{
        if (res.data.message == "updateCarParkSuccess"){
          console.log("can save")
          setOpen(false)
          navigate("/manage-carpark")
          toast.success("Successfully Update Car Park info")
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

  useEffect(() => {
    axios.get('http://localhost:8000/carparkbuilding')
      .then(response => {
        setBuildings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(buildings);

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
          <VStack divider={<Divider />} borderColor="white" space={3}>
            <HStack alignContent="left">
              {titles.map((title, index) => (
                <Text
                  key={index}
                  color="white"
                  flexWrap="wrap"
                  justifyContent="space-between"
                  flex={1}
                >
                  {title}
                </Text>
              ))}
            </HStack>

            <VStack divider={<Divider />} space={3}>
              {buildings.map((building, index) => (
                <HStack key={building._id}>
                  <Text color="white" justifyContent="space-between" flex={1}>
                    {index + 1}
                  </Text>
                  <Text color="white" justifyContent="space-between" flex={1}>
                    {building.name}
                  </Text>
                  <Text color="white" justifyContent="space-between" flex={1}>
                    {building.capacity}
                  </Text>
                  <HStack justifyContent="space-between" flex={1}>
                    <Link
                      style={{ cursor: "pointer" }}
                      onPress={() => openModal("center", building)}
                      _text={{
                        color: "#F79520",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                    >
                      Edit
                    </Link>
                    <Text color="white"> | </Text>
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
            </VStack>
            <VStack alignItems={"flex-end"}>
              <Pressable
                onHoverIn={() => setHover(isHover)}
                onHoverOut={() => setHover(!isHover)}
              >
                <Link href="/manage-carpark/add">
                  <Button bg={isHover ? "white" : "#F79520"}>
                    <HStack alignItems="center" rounded="2">
                      <FontAwesomeIcon icon={faAdd} size="sm" color="black" />
                      <Text fontSize="12" color="black" marginLeft="5">
                        Add
                      </Text>
                    </HStack>
                  </Button>
                </Link>
              </Pressable>
            </VStack>
          </VStack>
          <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                safeAreaTop={true}
              >
                <Modal.Content maxWidth="350" {...styles[placement]}>
                  <Modal.CloseButton />
                  <Modal.Header>Edit Info</Modal.Header>
                  <Modal.Body>
                    <form action="POST" method="/updateInfo">
                    <FormControl>
                      <FormControl.Label>Name</FormControl.Label>
                      <Input value={updateInfo.name || buildingItem.name} onChangeText={value => setUpdateInfo({...buildingItem.name, name:value})}
                      />
                    </FormControl>
                    {/* <FormControl mt="3" >
                      <FormControl.Label>Google Plus Code</FormControl.Label>
                      <Input isDisabled onChangeText={value => setupdateInfo({...buildingItem.address, address:value})}
                        value={buildingItem.address }
                      />
                    </FormControl> */}
                    <FormControl mt="3" >
                      <FormControl.Label>Capacity</FormControl.Label>
                      <Input type="text" value={updateInfo.capacity || buildingItem.capacity}
                         onChangeText={value => setUpdateInfo({...buildingItem.capacity, capacity:value})}
                      />
                    </FormControl>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onPress={handleEditInfo}
                      >
                        Save
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
                
              </Modal>
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
        <ManageCarParkPage />
      </Center>
    </NativeBaseProvider>
  );
};
