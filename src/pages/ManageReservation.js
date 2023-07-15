import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
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
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import LeftMenu from "../component/LeftMenu";
import axios from "axios";

const ManageReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [approvedReservations, setApprovedReservations] = useState([]);
  const [rejectedReservations, setRejectedReservations] = useState([]);
  const [cancelledReservation, setCancelledReservations] = useState([]);
  const [overdueReservation, setOverdueReservations] = useState([]);
  const [isError, setIsError] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [placement, setPlacement] = useState(undefined);
  const [rejectForm, setRejectForm] = useState({
    reason: "",
  });
  const [selectedReservation, setSelectedReservation] = useState({
    user_id: "",
    email: "",
    name: "",
    reservedAt: "",
    lotName: "",
  });

  const titles = ["No", "User", "Parking Lot", "Time", "Status", "Action"];

  useEffect(() => {
    axios
      .get("http://localhost:3500/retrieveReservation")
      .then((response) => {
        setReservations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("reserve", reservations);

  useEffect(() => {
    axios
      .get("http://localhost:3500/retrieveOverdueReservation")
      .then((response) => {
        setOverdueReservations(response.data);
        console.log("res", response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/retrieveCancelledReservation")
      .then((response) => {
        setCancelledReservations(response.data);
        console.log("res", response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/retrieveApprovedReservation")
      .then((response) => {
        setApprovedReservations(response.data);
        console.log("res", response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3500/retrieveRejectedReservation")
      .then((response) => {
        setRejectedReservations(response.data);
        console.log("res", response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

  const handleApproval = async () => {
    console.log(selectedReservation);
    try {
      await axios
        .post("http://localhost:3500/approveReservation", {
          selectedReservation,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message == "success") {
            setOpen(false);
            toast.success("A reservation is approved");
            emailjs
              .send(
                "service_xjy1zon",
                "template_2fn595c",
                {
                  message: selectedReservation.lotName,
                  to_name: selectedReservation.name,
                  to_email: selectedReservation.email,
                },
                "9cyFZLyhCSuXc8DuF"
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            setOpen(false);
            toast.error("Something is wrong");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const sendRejectEmail = (sR, rF) => {
    console.log("called");
    emailjs
      .send(
        "service_xjy1zon",
        "template_964hc3j",
        {
          to_name: sR.name,
          message: rF.reason,
          to_email: sR.email,
        },
        "9cyFZLyhCSuXc8DuF"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  const handleReject = async () => {
    if (rejectForm.reason.length <= 0) {
      setIsError({ ...isError, name: "Enter reason." });
    } else {
      try {
        await axios
          .post("http://localhost:3500/rejectReservation", {
            selectedReservation,
            rejectForm,
          })
          .then((response) => {
            console.log(response);
            if (response.data.message == "rejected") {
              setOpen2(false);
              toast.info("A reservation is rejected!");
              sendRejectEmail(selectedReservation, rejectForm);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              setOpen(false);
              toast.error("Something is wrong");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openApproveModal = (placement, reservation) => {
    setOpen(true);
    setPlacement(placement);
    setSelectedReservation({
      user_id: reservation.user_id,
      name: reservation.user,
      email: reservation.user_email,
      reservedAt: reservation.reservedAt,
      lotName: reservation.parkingLotName,
    });
  };

  const openRejectModal = (placement, reservation) => {
    setOpen2(true);
    setPlacement(placement);
    setSelectedReservation({
      name: reservation.user,
      email: reservation.user_email,
      reservedAt: reservation.reservedAt,
      lotName: reservation.parkingLotName,
    });
  };

  return (
    <Center w="100%">
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
          <Text color="white" fontWeight={"bold"} fontSize={20} mb={4}>
            Pending Reservation Requests ({reservations.length})
          </Text>

          <VStack divider={<Divider />} borderColor="white" space={3} mb={2}>
            {reservations.length != 0 ? (
              <HStack alignContent="left">
                {titles.map((title, index) => (
                  <Text
                    key={index}
                    color="white"
                    justifyContent="space-between"
                    flex={1}
                    minWidth={200}
                  >
                    {title}
                  </Text>
                ))}
              </HStack>
            ) : (
              <></>
            )}
            <VStack divider={<Divider />} space={3} mt={2}>
              {reservations.map((reservation, index) => (
                <HStack key={reservation._id}>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                  >
                    {index + 1}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                  >
                    {reservation.user}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                  >
                    {reservation.parkingLotName}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                  >
                    {reservation.reservedAt}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                    textTransform="uppercase"
                  >
                    {reservation.approvalStatus}
                  </Text>
                  <HStack justifyContent="space-between" flex={1}>
                    <Link
                      style={{ cursor: "pointer" }}
                      onPress={() => openApproveModal("center", reservation)}
                      _text={{
                        color: "#F79520",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                    >
                      Approve
                    </Link>
                    <Text color="white"> | </Text>
                    <Link
                      style={{ cursor: "pointer" }}
                      onPress={() => openRejectModal("center", reservation)}
                      _text={{
                        color: "red.300",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                    >
                      Reject
                    </Link>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </VStack>

          <Text color="white" fontWeight={"bold"} fontSize={20}>
            Approved Requests ({approvedReservations.length})
          </Text>

          <VStack divider={<Divider />} borderColor="white" space={3} mb={2}>
            <VStack divider={<Divider />} space={3} mt={4}>
              {approvedReservations.map((approvedReservations, index) => (
                <HStack key={approvedReservations._id}>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={100}
                  >
                    {index + 1}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                    flex={1}
                  >
                    {approvedReservations.reservedAt}
                  </Text>
                  <Text color="white" minWidth={200} flex={1}>
                    {approvedReservations.user}
                  </Text>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={200}
                    flex={1}
                  >
                    {approvedReservations.parkingLotName}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          {/* Rejected Request */}
          {/* <Text color="white" fontWeight={"bold"} fontSize={20}>
            Rejected Requests ({rejectedReservations.length})
          </Text>

          <VStack divider={<Divider />} borderColor="white" space={3} mb={2}>
            <VStack divider={<Divider />} space={3} mt={4}>
              {rejectedReservations.map((rejectedReservations, index) => (
                <HStack key={rejectedReservations._id} alignItems={"center"}>
                  <Text
                    color="white"
                    justifyContent="space-between"
                    minWidth={50}
                  >
                    {index + 1}
                  </Text>
                  <Text color="white" minWidth={200}>
                    {rejectedReservations.user}
                  </Text>
                  <Text color="white" justifyContent="space-between" flex={1}>
                    {rejectedReservations.parkingLotName}
                  </Text>
                  <HStack justifyContent="space-between" minWidth={200}>
                    <Text color="white" fontWeight={"bold"}>
                      Reason:{" "}
                    </Text>
                    <Text color="white">
                      {rejectedReservations.rejectReason}
                    </Text>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </VStack> */}
          {/* Cancelled Request */}
          {/* <Text color="white" fontWeight={"bold"} fontSize={20} mb={4}>
            Cancelled Requests ({cancelledReservation.length})
          </Text> */}
          {/* Overdue Request */}
          {/* <Text color="white" fontWeight={"bold"} fontSize={20} mb={4}>
            Overdue Requests ({overdueReservation.length})
          </Text> */}

          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            safeAreaTop={true}
          >
            <Modal.Content maxWidth="350" {...styles[placement]}>
              <Modal.CloseButton />
              <Modal.Header>
                <HStack alignItems={"center"}>
                  <FontAwesomeIcon icon={faCircleCheck} color="green" />
                  <Text mr={3}>{""}</Text>
                  Confirm Approval
                </HStack>
              </Modal.Header>
              <Modal.Body>
                <Box>
                  <Text>
                    Reservation request from : {selectedReservation.name}
                  </Text>
                  <Text>
                    Reservation request at : {selectedReservation.reservedAt}
                  </Text>
                  <Text>
                    Reservation request for : {selectedReservation.lotName}
                  </Text>
                </Box>
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
                  <Button colorScheme="green" onPress={handleApproval}>
                    Approve
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Modal
            isOpen={open2}
            onClose={() => setOpen2(false)}
            safeAreaTop={true}
          >
            <Modal.Content maxWidth="350" {...styles[placement]}>
              <Modal.CloseButton />
              <Modal.Header>
                <HStack alignItems={"center"}>
                  <FontAwesomeIcon icon={faExclamationCircle} color="red" />
                  <Text mr={3}>{""}</Text>
                  Reject Request
                </HStack>
              </Modal.Header>
              <Modal.Body>
                <Box>
                  <Text>
                    Reservation request from : {selectedReservation.name}
                  </Text>
                  <Text>
                    Reservation request at : {selectedReservation.reservedAt}
                  </Text>
                  <Text>
                    Reservation request for : {selectedReservation.lotName}
                  </Text>
                  <FormControl isInvalid={"name" in isError}>
                    <Text mt={2} color={"red.500"}>
                      Reason
                    </Text>
                    <Input
                      onChangeText={(value) =>
                        setRejectForm({ ...rejectForm, reason: value })
                      }
                    />
                    {"name" in isError ? (
                      <FormControl.ErrorMessage>
                        {isError.name}
                      </FormControl.ErrorMessage>
                    ) : (
                      <FormControl.HelperText>
                        Please enter reason.
                      </FormControl.HelperText>
                    )}
                  </FormControl>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setOpen2(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="red" onPress={handleReject}>
                    Reject
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
        <ManageReservation />
      </Center>
    </NativeBaseProvider>
  );
};
