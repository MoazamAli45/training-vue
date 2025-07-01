import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        name: "Website design",
        description:
          "Define the style guide, branding and create the webdesign on Figma.",
        completed: true,
      },
      {
        id: 2,
        name: "Website development",
        description: "Develop the portfolio website using Vue JS.",
        completed: false,
      },
      {
        id: 3,
        name: "Hosting and infrastructure",
        description:
          "Define hosting, domain and infrastructure for the portfolio website.",
        completed: false,
      },
      {
        id: 4,
        name: "Composition API",
        description:
          "Learn how to use the composition API and how it compares to the options API.",
        completed: true,
      },
      {
        id: 5,
        name: "Pinia",
        description: "Learn how to setup a store using Pinia.",
        completed: true,
      },
      {
        id: 6,
        name: "Groceries",
        description: "Buy rice, apples and potatos.",
        completed: false,
      },
      {
        id: 7,
        name: "Bank account",
        description: "Open a bank account for my freelance business.",
        completed: false,
      },
    ]
  );

  const filterBy = ref("");

  const showModal = ref(false);

  const newTask = reactive({
    completed: false,
  });

  const setFilter = (newFilter) => {
    filterBy.value = newFilter;
  };

  const filteredTasks = computed(() => {
    if (filterBy.value === "done") {
      return tasks.value.filter((task) => task.completed);
    } else if (filterBy.value === "todo") {
      return tasks.value.filter((task) => !task.completed);
    }
    return tasks.value;
  });

  const openModal = () => {
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  const addNewTask = () => {
    if (newTask.name && newTask.description) {
      const newId = tasks.value.length + 1;
      tasks.value.push({
        id: newId,
        name: newTask.name,
        description: newTask.description,
        completed: newTask.completed,
      });
      newTask.name = "";
      newTask.description = "";
      closeModal();
    } else {
      alert("Please fill in all fields.");
    }
  };
  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    showModal,
    openModal,
    closeModal,
    newTask,
    addNewTask,
  };
});
