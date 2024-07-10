import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box, Select, Checkbox } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [categories] = useState(["Work", "Personal", "Shopping"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [statuses] = useState(["Registered", "Ongoing", "Done"]);
  const [taskStatus, setTaskStatus] = useState("Registered");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, category: selectedCategory, status: taskStatus }]);
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const filteredTasks = filterCategory
    ? tasks.filter((task) => task.category === filterCategory)
    : tasks;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.text === active.id);
        const newIndex = items.findIndex((item) => item.text === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Select placeholder="Select category" onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Select placeholder="Select status" onChange={handleStatusChange}>
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <Select placeholder="Filter by category" onChange={handleFilterCategoryChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <HStack spacing={4} width="100%">
            {statuses.map((status) => (
              <Box key={status} width="100%">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  {status}
                </Text>
                <SortableContext items={filteredTasks.filter((task) => task.status === status).map((task) => task.text)} strategy={verticalListSortingStrategy}>
                  <VStack spacing={2} width="100%">
                    {filteredTasks
                      .filter((task) => task.status === status)
                      .map((t, index) => (
                        <SortableItem key={t.text} id={t.text}>
                          <HStack width="100%" justifyContent="space-between">
                            <Checkbox
                              isChecked={t.completed}
                              onChange={() => toggleTaskCompletion(index)}
                            >
                              <Text as={t.completed ? "s" : "span"}>{t.text}</Text>
                            </Checkbox>
                            <Text>{t.category}</Text>
                            <IconButton
                              aria-label="Delete task"
                              icon={<FaTrash />}
                              onClick={() => deleteTask(index)}
                            />
                          </HStack>
                        </SortableItem>
                      ))}
                  </VStack>
                </SortableContext>
              </Box>
            ))}
          </HStack>
        </DndContext>
      </VStack>
    </Container>
  );
};

export default Index;