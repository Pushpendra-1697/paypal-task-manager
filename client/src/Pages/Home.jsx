import { Box, Heading, Img } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center" flexDirection={"column"}>
      <Heading mb="10px">Welcome to Task Manager App</Heading>
      <Img height={"300px"} w="500px" src='https://www.zohowebstatic.com/sites/zweb/images/connect/connect-task-01.jpg' alt='Task profile' />
      <Link style={{ marginTop: "5%", borderRadius: "10px", padding: "10px", backgroundColor: "blue", color: "white" }} to={"/dashboard"}>Add New Sprint</Link>
    </Box>
  );
}

export default Home;