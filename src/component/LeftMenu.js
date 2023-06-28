import React, { useState } from "react";
import { VStack, Box, Text, Pressable } from "native-base";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LeftMenu = () => {
  const [permission, setPermission] = useState(
    localStorage.getItem("level") == 2 ? true : false
  );

  const styles = {
    textDecoration: "none",
    color: "white",
  };

  const [box1Color, setBox1Color] = useState("blue.400");
  const [box2Color, setBox2Color] = useState("blue.400");
  const [box3Color, setBox3Color] = useState("blue.400");
  const [box4Color, setBox4Color] = useState("blue.400");

  const handleBox1Click = () => {
    setBox1Color("#F79520");
  };

  const handleBox2Click = () => {
    setBox2Color("#F79520");
  };

  const handleBox3Click = () => {
    setBox3Color("#F79520");
  };

  const handleBox4Click = () => {
    setBox4Color("#F79520");
  };

  return (
    <VStack space={2}>
      <Pressable onPressIn={handleBox1Click}>
        <Box bg={box1Color} p={2}>
          <Link to="/home" style={styles}>
            Home
          </Link>
        </Box>
      </Pressable>
      <Pressable onPressIn={handleBox2Click}>
        <Box bg={box2Color} p={2}>
          <Link to="/manage-reservation" style={styles}>
            Manage Parking Lot Reservation
          </Link>
        </Box>
      </Pressable>
      <Pressable onPressIn={handleBox3Click}>
        <Box bg={box3Color} p={2}>
          <Link to="/manage-carpark" style={styles}>
            Manage Car Park Building
          </Link>
        </Box>
      </Pressable>
      <Pressable onPressIn={handleBox4Click}>
        <Box bg={box4Color} p={2} display={permission ? "none" : ""}>
          <Link to="/manage-user" style={styles}>
            Manage Admin
          </Link>
        </Box>
      </Pressable>
      {/* <Box bg="blue.400" p={2}>
        <Text>Menu Item 3</Text>
      </Box> */}
    </VStack>
  );
};

export default LeftMenu;
