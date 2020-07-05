<template>
  <q-card>
    <modal-header>Add Task</modal-header>

    <q-form @submit.prevent="submitTask">
      <modal-task-name :name.sync="taskToSubmit.name"></modal-task-name>
      <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>
      <modal-due-time :dueTime.sync="taskToSubmit.dueTime"></modal-due-time>
      <modal-buttons :name.sync="taskToSubmit.name"></modal-buttons>  
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitTask() {
      this.addTask(this.taskToSubmit);
    }
  },
  components: {
    'modal-header': require('components/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name': require('components/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date': require('components/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time': require('components/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons': require('components/Modals/Shared/ModalButtons.vue').default
  }
};
</script>