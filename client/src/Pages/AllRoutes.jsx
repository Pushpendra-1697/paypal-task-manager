import { Box } from '@chakra-ui/react';
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Dashboard from './Dashboard';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Signin />}></Route>
      </Routes>
    </Box>
  );
}

export default AllRoutes;