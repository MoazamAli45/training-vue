<script setup>
import { useTasksStore } from "@/stores/taskStore";
import Task from "@/components/Task.vue";
import Filter from "./components/Filter.vue";
import Modal from "./components/Modal.vue";

const store = useTasksStore();
store.$subscribe((mutation, state) => {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
});
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>Tasks Manager</h1>
      </div>
      <div class="header-side">
        <button class="btn secondary" @click="store.openModal()">
          Add Task
        </button>
      </div>
    </div>

    <Filter />
    <div class="tasks">
      <Task v-for="task in store.filteredTasks" :key="task.id" :task="task" />
    </div>

    <Modal v-if="store.showModal"
      ><div class="add-task">
        <h3>Add a new task</h3>
        <input
          type="text"
          name="title"
          placeholder="Enter a title..."
          v-model="store.newTask.name"
        /><br />
        <textarea
          name="description"
          rows="4"
          placeholder="Enter a description..."
          v-model="store.newTask.description"
        /><br />
        <button class="btn gray" @click="store.addNewTask">Add Task</button>
      </div></Modal
    >
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 100%;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
    border: 1px solid var(--gray-color);
    border-radius: 10px;
  }

  button {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
