import { Alert, AlertIcon, Box, grid, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/TaskManager/task.action';
import { BiLoaderCircle } from "react-icons/bi";

const UserAssignedTask = () => {
    const { loading, error, tasks } = useSelector((store) => store.taskManager);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [assignedTask, setAssignedTask] = useState([]);


    useEffect(() => {
        dispatch(getTasks());
        setEmail(localStorage.getItem('email'));
    }, []);

    useEffect(() => {
        if (tasks) {
            let filterTasks = tasks.filter((ele) => {
                return ele.assign == email
            })
            setAssignedTask(filterTasks)
        };
    }, [tasks]);


    return (
        <Box>

            <Heading textAlign={"center"} mb="20px">
                Overview of Assigned Task to {email}
            </Heading>
            {loading && (
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    {" "}
                    <BiLoaderCircle fontSize={"34px"} />{" "}
                </Box>
            )}
            {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Alert status='error' w="300px" >
                    <AlertIcon />
                    {`Something went Wrong`}
                </Alert>
            </Box>}

            {assignedTask && <Box>
                <Heading fontSize={"21px"} textAlign="center">Total Tasks: {assignedTask.length}</Heading>
                <Box display={"grid"} gap="20px" gridTemplateColumns={{ base: "repeat(4,1fr)", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", xl: "repeat(4,1fr)", "2xl": "repeat(4,1fr)" }} textAlign="center" m="3% 0">
                    {assignedTask && assignedTask.map((ele) =>
                        <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" padding={"10px"}>
                            <Text fontSize={"20px"}>{`Bug/Task: ${ele.task}`}</Text>
                            <Text>{`Status: ${ele.status}`}</Text>
                            <Text>{`Severity: ${ele.severity}`}</Text>
                        </Box>
                    )}
                </Box>
            </Box>}


        </Box>
    );
}

export default UserAssignedTask;