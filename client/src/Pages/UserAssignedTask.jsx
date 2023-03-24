import { Alert, AlertIcon, Box, grid, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/TaskManager/task.action';
import { BiLoaderCircle } from "react-icons/bi";
import { Line, Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

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


    let total_Todo = 100, total_Progress = 100, total_Done = 100;
    for (let ele of assignedTask) {
        if (ele.status == "Todo") {
            total_Todo++;
        } else if (ele.status == "Progress") {
            total_Progress++;
        } else {
            total_Done++;
        }
    }
    
    let status = ["Todo", "Progress", "Done"];
    let No_of_status = [total_Todo, total_Progress, total_Done];

    var chart = {
        labels: status.map((ele) => {
            return ele;
        }),
        datasets: [
            {
                label: "Status of Tasks",
                data: status.map((ele) => {
                    return ele;
                }),
                backgroundColor: createColor(255)
            },
            {
                label: "Number of Tasks according to status",
                data: No_of_status.map((ele) => {
                    return ele;
                }),
                backgroundColor: createColor(255)
            }
        ],
        borderColor: "black",
        borderWidth: 1
    };
    const [chartStatus, setChartStatus] = useState(chart);

    

    function random(num) {
        return Math.floor(Math.random() * num);
    };
    function createColor(num) {
        return `rgb(${random(num)}, ${random(num)}, ${random(num)})`;
    };

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

            <Box ml={{ base: 0, sm: "10%", md: "20%", xl: "23%", "2xl": "23%" }} w="500px" mt={"5%"} display="flex" gap={"20px"} flexDirection={{ base: "column", sm: "column", md: "column", xl: "row", "2xl": "row" }}>
                <Box><Line data={chartStatus} /></Box>
                <Box><Pie data={chartStatus} /></Box>
            </Box>

        </Box>
    );
}

export default UserAssignedTask;






// import { Box, Img, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import { Chart } from 'chart.js/auto';

// const Portfolio = () => {
//     const [buyStock, setBuyStock] = useState([]);
//     useEffect(() => {
//         getBuyStock();
//     }, []);

//     const getBuyStock = async () => {
//         try {
//             let res = await fetch(`https://render-si4e.onrender.com/buyStock`);
//             res = await res.json();
//             if (res !== undefined) {
//                 setBuyStock(res)
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     console.log(buyStock);

//     var chart = {
//         labels: buyStock.map((ele) => {
//             return ele.total_shares
//         }),
//         datasets: [
//             {
//                 label: "Company Name",
//                 data: buyStock.map((ele) => {
//                     return ele.company_name
//                 }),
//                 backgroundColor: "rgb(255, 45, 54)"
//             },
//             {
//                 label: "cost_per_share",
//                 data: buyStock.map((ele) => {
//                     return ele.cost_per_share
//                 }),
//                 backgroundColor: "rgb(255, 45, 54)"
//             }
//         ],
//         borderColor: "black",
//         borderWidth: 1
//     };
//     const [chartStock, setChartStock] = useState(chart);

//     var total_shares_of_user = 0;
//     for (let ele of buyStock) {
//         total_shares_of_user += ele.total_shares;
//     };

//     return (
//         <Box>
//             <Box w="500px">
//                 <Line data={chartStock} />
//                 <Pie data={chartStock} />
//             </Box>
//         </Box>
//     );
// };

// export default Portfolio;