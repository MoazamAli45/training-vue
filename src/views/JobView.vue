<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { VueSpinnerDots } from 'vue3-spinners'

const route = useRoute()
const toast = useToast()
const router = useRouter()
const state = reactive({
  isloading: true,
  jobData: {},
})

const jobId = route.params.id

const deleteHandler = async (jobId) => {
  try {
    await axios.delete(`/api/jobs/${jobId}`)
    toast.success('Job Deleted Successfully')

    router.push('/jobs')
  } catch (error) {
    toast.error(error.message)
  }
}

onMounted(async () => {
  try {
    const res = await axios(`/api/jobs/${jobId}`)

    state.jobData = res?.data
    console.log('State', state?.jobData)
  } catch (error) {
    console.log(error, 'ERROR')
    toast.error(error.message)
    router.push('/jobs')
  } finally {
    state.isloading = false
  }
})
</script>

<template>
  <div v-if="state.isloading" class="flex items-center justify-center h-[60vh]">
    <VueSpinnerDots class="text-green-500" size="50" />
  </div>
  <section v-else class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ state.jobData?.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.jobData.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state?.jobData.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>

            <p class="mb-4">
              {{ state.jobData.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.jobData.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.jobData.company.name }}</h2>

            <p class="my-2">
              {{ state.jobData.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.jobData.company.contactEmail }}</p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.jobData.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/1`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="deleteHandler(state.jobData.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
