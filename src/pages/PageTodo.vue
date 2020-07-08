<template>
  <q-page class="q-pa-md">
    
    <div class="row">
        <search class="col-9 q-mr-sm"/>
        <sort class="col"/>
    </div>

    <q-banner class="text-white bg-orange-4 text-center">
      <span class="text-bold text-subtitle1">TO ACTIVATE</span> 
    </q-banner>
     
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 220px; max-width: 100%;"
    >

    <!-- https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/keys -->
    <q-list v-if="Object.keys(tasksTodo).length" separator bordered>
      <!-- Passes down the id/task into the task component -->
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
    </q-scroll-area>

    <q-banner class="text-white bg-green-4 text-center q-mt-lg">
      <span class="text-bold text-subtitle1">ACTIVATED</span> 
    </q-banner>
    <!-- https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/keys -->
    <q-list v-if="Object.keys(tasksCompleted).length" separator bordered>
      <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
    </q-list>

    <!-- Opens the  -->
    <div class="fixed-bottom-right text-center q-ma-xl no-pointer-events">
      <q-btn @click="showAddTask = true" round color="primary" class="q-mr-xl all-pointer-events" size="20px" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
		<add-task></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showAddTask: false,
       thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#862a5c',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#862a5c',
        width: '9px',
        opacity: 0.2
      }
    };
  },

  computed: {
    // 'Imports' the Getters from the store-tasks.js file
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"])
  },

  components: {
    // HTML Tags
	"task": require("components/Tasks/Task.vue").default,
	"add-task": require("components/Modals/AddTask.vue").default,
  "search": require("components/Tools/Search.vue").default,
  "sort": require("components/Tools/Sort.vue").default
  }
};
</script>

<style>
</style>
