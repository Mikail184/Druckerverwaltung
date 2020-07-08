<template>
  <!-- updateTask marks the clicked task as completed, see store-tasks.js -->
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough' : task.completed }" v-html="$options.filters.searchHighlight(task.name, search)"></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <!-- Click.stop stops the click handler from the parent (completed) -->
        <q-btn @click.stop="showEditTask = true" flat round dense color="primary" icon="edit" />
        <q-btn @click.stop="promptToDelete(id)" flat round dense color="red-10" icon="delete" />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :id="id"></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  computed: {
    ...mapState('tasks', ['search'])
  },
  filters: {
    // https://jsfiddle.net/HubertWang/t5ac1quc/
    searchHighlight(value, search) {
      if(search) {
        let searchRegExp = new RegExp(search, 'ig')
        return value.replace(searchRegExp, (match) => {return '<span class="bg-yellow-6">' + match + '</span>'})
      }
      return value
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    // https://quasar.dev/vue-components/dialog
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          ok: {
            push: true,
            color: "positive"
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    }
  },
  components: {
    'edit-task': require('components/Modals/EditTask').default
  }
};
</script>

<style>
.button-yes {
  color: #162447;
}
</style>