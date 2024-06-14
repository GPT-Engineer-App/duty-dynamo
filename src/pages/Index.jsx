import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Checkbox, Text, IconButton, Box } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t));
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {tasks.map((t, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              <Checkbox
                isChecked={t.completed}
                onChange={() => toggleTaskCompletion(index)}
              >
                <Text as={t.completed ? "s" : "span"}>{t.text}</Text>
              </Checkbox>
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => deleteTask(index)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;