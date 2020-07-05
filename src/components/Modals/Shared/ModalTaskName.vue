<template>
  <div class="row q-ma-sm">
    <q-input
      autofocus
      class="col"
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Serial Number"
      ref="SN_Name"
    />
  </div>
</template>

<script>
export default {
    props: ['name']
};
</script>

<style>
</style>