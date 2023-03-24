import { Box, Heading, Img } from '@chakra-ui/react';
import React from 'react'

const Home = () => {
  return (
    <Box textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center" flexDirection={"column"}>
        <Heading mb="10px">Welcome to Task Manager App</Heading>
        <Img height={"300px"} w="500px" src='https://www.zohowebstatic.com/sites/zweb/images/connect/connect-task-01.jpg' alt='Task profile' />
    </Box>
  );
}

export default Home;