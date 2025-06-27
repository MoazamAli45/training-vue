<script>
export default {
  data() {
    return {
      message: 'Vue Jobs',
      status: 'inactive',
      lists: [
        { id: 1, title: 'Vue Developer', company: 'Tech Corp', location: 'Remote' },
        { id: 2, title: 'Frontend Engineer', company: 'Web Solutions', location: 'New York' },
        { id: 3, title: 'Full Stack Developer', company: 'Innovatech', location: 'San Francisco' },
      ],
    }
  },
  methods: {
    changeStatus() {
      this.status = this.status === 'active' ? 'inactive' : 'active'
    },
  },
}
</script>

<template>
  <h1>{{ message }}</h1>
  <p v-if="status === 'active'">Status: Active</p>
  <p v-else-if="status === 'inactive'">Status: Inactive</p>
  <p v-else>Status: Inactive</p>

  <ul>
    <li v-for="list in lists" :key="list.id">
      {{ list.title }} at {{ list.company }} - {{ list.location }}
    </li>
  </ul>
  <button @click="changeStatus">Toggle Status</button>
</template>
