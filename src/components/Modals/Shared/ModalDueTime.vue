<template>
  <div class="row q-ma-sm">
    <q-input label="Due Time" outlined :value="dueTime" @input="$emit('update:dueTime', $event)">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time now-btn format24h :value="dueTime" @input="$emit('update:dueTime', $event)">
              <q-btn
                @click="$emit('update:dueTime', '')"
                label="Cancel"
                color="primary"
                flat
                v-close-popup
              />
              <q-btn class="float-right" label="OK" color="primary" flat v-close-popup />
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
    props: ["dueTime"]
};
</script>

<style>
</style>