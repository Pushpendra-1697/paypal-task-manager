import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import { addTask, deleteTask, getTasks, updateAssignee, updateTask } from "../redux/TaskManager/task.action";
import { getUsers } from "../redux/UserManager/user.action";


var totalPages = 10;
let initialState = {
  task: "",
  severity: "",
  status: '',
  assign: ''
};
const Dashboard = () => {
  const { loading, error, tasks } = useSelector((store) => store.taskManager);
  const { users } = useSelector((store) => store.userManager);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initPage = Number(searchParams.get('page')) || 1;
  const [formData, setFormData] = useState(initialState);
  const [Todos, setTodos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idTask, setIdTask] = useState('');
  const [token, setToken] = useState("");
  const [page, setPage] = useState(initPage);



  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks(page));
    setToken(localStorage.getItem('token'));
  }, [page]);

  useEffect(() => {
    setSearchParams({
      page: page,
      limit: 20
    });
  }, [page]);

  useEffect(() => {
    if (tasks) {
      let filterTodos = tasks.filter((ele) => {
        return ele.status == "Todo"
      })
      setTodos(filterTodos)
    };
    if (tasks) {
      let filterProgress = tasks.filter((ele) => {
        return ele.status == "Progress"
      })
      setProgress(filterProgress)
    };
    if (tasks) {
      let filterDone = tasks.filter((ele) => {
        return ele.status == "Done"
      })
      setDone(filterDone)
    };
  }, [tasks]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(formData));
    setFormData({
      task: "",
      severity: "",
      status: '',
      assign: ''
    });
  };

  const onSubmit1 = (e) => {
    e.preventDefault();
    dispatch(updateTask(idTask, formData));
    setFormData({
      task: "",
      severity: "",
      status: ''
    });
  };
  const handleEdit = (_id) => {
    setIdTask(_id);
    onOpen();
  };

  const handelDelete = (_id) => {
    dispatch(deleteTask(_id));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(Todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };


  const changeAssigneeFunction = (e, id) => {
    const { value } = e.target;
    dispatch(updateAssignee(id, { assign: value }));
  };



  const { task, severity, status, assign } = formData;

  if (token === null) {
    return <Navigate to="/login" />
  };

  return (
    <Box>

      <Heading textAlign={"center"} mb="20px">
        Task Manager
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





      <Box mb="40px" textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center">
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: "350px", padding: "10px", m: "auto", textAlign: "center" }}
        >
          <Input
            value={task}
            name="task"
            w="300px"
            placeholder="Task Name"
            onChange={handleChange}
          />
          <select
            style={{ width: "300px" }}
            value={severity}
            name="severity"
            onChange={handleChange}
          >
            <option value={""}>Select Severity</option>
            <option value={"Critical Severity"}>Critical Severity</option>
            <option value={"Major Severity"}>Major Severity</option>
            <option value={"Medium Severity"}>Medium Severity</option>
            <option value={"Low Severity"}>Low Severity</option>
          </select>

          <select
            style={{ width: "300px" }}
            value={assign}
            name="assign"
            onChange={handleChange}
          >
            <option value={""}>Select Assignee</option>
            {users && users.map((ele) =>
              <option value={ele.email}>{ele.email}</option>
            )}
          </select>


          <select
            style={{ width: "300px" }}
            value={status}
            name="status"
            onChange={handleChange}
          >
            <option value={""}>Select Status</option>
            <option value={"Todo"}>Todo</option>
            <option value={"Progress"}>Progress</option>
            <option value={"Done"}>Done</option>
          </select>

          <Input
            bg="goldenrod"
            color={"white"}
            width={"300px"}
            type={"submit"}
            value="Add Task"
          />
        </form>
      </Box>


      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (

            <Box display={"flex"} flexDirection={{ base: "column", sm: "column", md: "row", xl: "row", "2xl": "row" }} justifyContent={{ base: "space-evenly", sm: "center", md: "space-around", xl: "space-evenly", "2xl": "space-evenly" }} alignItems={{ base: "stretch", sm: "center", md: "unset", xl: "unset", "2xl": "stretch" }} {...provided.droppableProps} ref={provided.innerRef}>

              {Todos && <Box w={"350px"} mt="20px">
                <Heading mb="10px" bg="blue" color={"white"} p="5px" borderRadius={"8px"} textAlign="center" fontSize={"23px"}>Todo</Heading>
                {Todos && Todos.map((ele, index) =>
                  <Draggable key={ele._id} draggableId={ele._id} index={index}>
                    {(provided) => (

                      <Box display={"flex"} justifyContent="space-evenly" mt="2px" bg="blue" color={"white"} padding="8px" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Text>{ele.task}</Text>
                        <Text>{ele.severity}</Text>
                        <select style={{ backgroundColor: "blue", color: "black", width: "80px" }} onChange={(e) => changeAssigneeFunction(e, ele._id)}>
                          <option value={""}>{ele.assign}</option>
                          {users.map((el) =>
                            <option value={el.email}>{el.email}</option>
                          )}
                        </select>
                        <AiFillEdit onClick={() => handleEdit(ele._id)}></AiFillEdit>
                        <AiFillDelete onClick={() => handelDelete(ele._id)}></AiFillDelete>
                      </Box>
                    )}
                  </Draggable>
                )}
              </Box>}

              {progress && <Box mt="20px" w={"350px"}>
                <Heading mb="10px" bg="goldenrod" color={"white"} p="5px" borderRadius={"8px"} textAlign="center" fontSize={"23px"}>Progress</Heading>
                {progress && progress.map((ele, index) =>

                  <Draggable key={ele._id} draggableId={ele._id} index={index}>
                    {(provided) => (

                      <Box display={"flex"} justifyContent="space-evenly" mt="2px" bg="goldenrod" color={"white"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} padding="8px" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                        <Text>{ele.task}</Text>
                        <Text>{ele.severity}</Text>
                        <select style={{ backgroundColor: "goldenrod", color: "black", width: "80px" }} onChange={(e) => changeAssigneeFunction(e, ele._id)}>
                          <option value={""}>{ele.assign}</option>
                          {users.map((el) =>
                            <option value={el.email}>{el.email}</option>
                          )}
                        </select>
                        <AiFillEdit onClick={() => handleEdit(ele._id)}></AiFillEdit>
                        <AiFillDelete onClick={() => handelDelete(ele._id)}></AiFillDelete>
                      </Box>
                    )}
                  </Draggable>
                )}
              </Box>}

              {done && <Box mt="20px" w={"350px"}>
                <Heading mb="10px" textAlign="center" bg="green" color={"white"} p="5px" borderRadius={"8px"} fontSize={"23px"}>Done</Heading>
                {done && done.map((ele, index) =>
                  <Draggable key={ele._id} draggableId={ele._id} index={index}>
                    {(provided) => (
                      <Box display={"flex"} justifyContent="space-evenly" mt="2px" bg="green" color={"white"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} padding="8px" boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
                        <Text>{ele.task}</Text>
                        <Text>{ele.severity}</Text>
                        <select style={{ backgroundColor: "green", color: "black", width: "80px" }} onChange={(e) => changeAssigneeFunction(e, ele._id)}>
                          <option value={""}>{ele.assign}</option>
                          {users.map((el) =>
                            <option value={el.email}>{el.email}</option>
                          )}
                        </select>
                        <AiFillEdit onClick={() => handleEdit(ele._id)}></AiFillEdit>
                        <AiFillDelete onClick={() => handelDelete(ele._id)}></AiFillDelete>
                      </Box>
                    )}
                  </Draggable>
                )}
              </Box>}

              {provided.placeholder}
            </Box>

          )}
        </Droppable>
      </DragDropContext>











      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                onSubmit={onSubmit1}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Input
                  value={task}
                  name="task"
                  w="300px"
                  placeholder="Task Name"
                  onChange={handleChange}
                />
                <select
                  style={{ width: "300px" }}
                  value={severity}
                  name="severity"
                  onChange={handleChange}
                >
                  <option value={""}>Select Severity</option>
                  <option value={"Critical Severity"}>Critical Severity</option>
                  <option value={"Major Severity"}>Major Severity</option>
                  <option value={"Medium Severity"}>Medium Severity</option>
                  <option value={"Low Severity"}>Low Severity</option>
                </select>
                <select
                  style={{ width: "300px" }}
                  value={status}
                  name="status"
                  onChange={handleChange}
                >
                  <option value={""}>Select Status</option>
                  <option value={"Todo"}>Todo</option>
                  <option value={"Progress"}>Progress</option>
                  <option value={"Done"}>Done</option>
                </select>

                <Input
                  bg="goldenrod"
                  color={"white"}
                  width={"300px"}
                  type={"submit"}
                  value="Update Task"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>







      <Box display={"flex"} justifyContent="center" alignItems={"center"} gap="2px" mt="4%">
        <Button isDisabled={page <= 1} variant={"outline"} onClick={() => setPage(page - 1)} >◀️PRE</Button>
        <Button color={"red"} variant={"outline"} isDisabled={true} border="1px solid blue">{page}</Button>
        <Button variant={"outline"} isDisabled={page == totalPages} onClick={() => setPage(page + 1)}>NEXT▶️</Button>
      </Box>




      <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Link style={{ marginTop: "5%", borderRadius: "10px", padding: "10px", backgroundColor: "blue", color: "white" }} to={"/assignedTask"}>All Assigned Tasks of Logged User</Link>
      </Box>

    </Box>
  );
};

export default Dashboard;
