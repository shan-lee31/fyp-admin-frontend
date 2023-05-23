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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd,faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [isHover, setHover] = useState(false);
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  // const [updateAdminInfo, setUpdateAdminInfo] = useState({
  //   name: "",
  //   _id: "",
  //   email: "",
  //   level: "",
  // });

  const openDeleteModal = (placement, adminInfo) => {
    setOpen(true);
    setPlacement(placement);
    setAdminInfo(adminInfo);
  }

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

  const handleDeleteInfo = async (recordId) => {
    console.log(recordId);
    try {
      await axios
        .delete(`http://localhost:8000/deleteUserInfo/${recordId}`)
        .then((res) => {
          if (res.data.message === "Record deleted successfully") {
            console.log("can delete");
            setOpen(false);
            window.location.reload();
            toast.success("Successfully Deleted User info");
          } else if (res.status(404)) {
            console.log("404 error");
            toast.error("Record not found");
          }
        });
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Someting went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <HStack>
              <Text
                color="white"
                flexWrap="wrap"
                flex={1}
                justifyContent="space-between"
              >
                Name
              </Text>
              <Text
                color="white"
                flexWrap="wrap"
                flex={1}
                justifyContent="space-between"
              >
                Email
              </Text>
              <Text
                color="white"
                flexWrap="wrap"
                flex={1}
                justifyContent="space-between"
                ml="5px"
              >
                Level
              </Text>
              <Text
                color="white"
                flexWrap="wrap"
                flex={1}
                justifyContent="space-between"
              >
                Action
              </Text>
            </HStack>
            <VStack divider={<Divider />} space={3}>
              {users.map((user, index) => (
                <HStack key={index} flex={1}>
                  <Text
                    color="white"
                    flexWrap="wrap"
                    flex={1}
                    justifyContent="space-between"
                  >
                    {user.name}
                  </Text>
                  <Text
                    color="white"
                    flexWrap="wrap"
                    flex={1}
                    justifyContent="space-between"
                  >
                    {user.email}
                  </Text>
                  <Text
                    color="white"
                    flexWrap="wrap"
                    flex={1}
                    justifyContent="space-between"
                    ml="5px"
                  >
                    {user.level}
                  </Text>
                  <HStack flex={1} justifyContent="space-between">
                    {/* <Link
                      _text={{
                        color: "#F79520",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                      style={{ cursor: "pointer" }}
                      onPress={() => openDeleteModal("center", user)}
                    >
                      Edit
                    </Link>
                    <Text color="white"> | </Text> */}
                    <Link
                      _text={{
                        color: "red.300",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                      style={{ cursor: "pointer" }}
                      onPress={() => openDeleteModal("center", user)}
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
                <Link href="/manage-user/add">
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
              <Modal.Header>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size="lg"
                  color="red"
                />
              </Modal.Header>
              <Modal.Body>
                <Text>
                  {" "}
                  <center>
                    Are you sure ? <br></br>
                    <br></br>
                    The record of <b> {adminInfo.name} </b> will be deleted.
                  </center>{" "}
                </Text>
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
                  <Text> {adminInfo._id} </Text>
                  <Button onPress={() => handleDeleteInfo(adminInfo._id)}>
                    Delete
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
        <ManageUserPage />
      </Center>
    </NativeBaseProvider>
  );
};
