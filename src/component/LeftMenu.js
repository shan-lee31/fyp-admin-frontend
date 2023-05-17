import React, {useState} from 'react';
import { VStack, Box, Text } from 'native-base';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const LeftMenu = () => {
const [permission,setPermission] = useState(localStorage.getItem("level") == 2 ? true : false);
const styles = {
    textDecoration:"none",
    color:'white',
    };
  return (
    <VStack space={2} >
        <Box bg="blue.400" p={2}>
        <Link to="/home" style={styles}>Home</Link>
      </Box>
      <Box bg="blue.400" p={2}>
        <Link to="/manage-carpark" style={styles}>Manage Car Park</Link>
      </Box>
      <Box bg="blue.400" p={2} display={permission ? "none" : ""}>
      <Link to="/manage-user" style={styles}>Manage User</Link>
      </Box>
      {/* <Box bg="blue.400" p={2}>
        <Text>Menu Item 3</Text>
      </Box> */}
    </VStack>
  );
};

export default LeftMenu;