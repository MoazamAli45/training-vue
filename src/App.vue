<script setup>
import { ref, onMounted } from 'vue'

const message = ref('Vue Jobs')
const status = ref('active')
const lists = ref(['Vue Developer'])

const newTask = ref('')

const changeStatus = () => {
  if (status.value === 'active') {
    status.value = 'inactive'
  } else {
    status.value = 'active'
  }
}

const addTask = () => {
  if (newTask.value.trim() !== '') {
    lists.value.push(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  lists.value.splice(index, 1)
}

//  When Mounted
onMounted(async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    const data = await response.json()
    const dataTitles = data.map((task) => task.title)

    lists.value = dataTitles.slice(0, 10)
  } catch (error) {
    console.log(error, 'ERROR')
  }
})
</script>

<template>
  <h1>{{ message }}</h1>
  <p v-if="status === 'active'">Status: Active</p>
  <p v-else-if="status === 'inactive'">Status: Inactive</p>
  <p v-else>Status: Inactive</p>
  <button @click="changeStatus">Toggle Status</button>
  <form @submit.prevent="addTask">
    <label for="newTask">New Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>
  <ul>
    <li v-for="(list, index) in lists" :key="list">
      {{ list }}

      <button @click="deleteTask(index)">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  padding: 2rem;
  color: #333;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

ul {
  list-style: none;
  padding-top: 20px;
  margin-bottom: 1rem;
}

li {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

li:hover {
  background-color: #f0f0f0;
}

button {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #36956f;
}

form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
}

input[type='text'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
</style>
