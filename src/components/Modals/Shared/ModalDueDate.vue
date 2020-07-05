<template>
  <div class="row q-mx-sm">
    <q-input label="Due Date" outlined :value="dueDate" @input="$emit('update:dueDate', $event)">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date mask="DD.MM.YYYY" today-btn :value="dueDate" @input="$emit('update:dueDate', $event)">
              <q-btn
                @click="dueDate =''"
                label="Cancel"
                color="primary"
                flat
                v-close-popup
              />
              <q-btn class="float-right" label="OK" color="primary" flat v-close-popup />
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
    props: ['dueDate']
};
</script>

<style>
</style>