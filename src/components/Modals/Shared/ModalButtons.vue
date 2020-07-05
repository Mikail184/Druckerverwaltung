<template>
    <q-card-actions align="right">
        <q-btn
            label="Save"
            color="primary"
            type="submit"
            :disable="!name"
            v-close-popup
        />
    </q-card-actions>    
</template>

<script>
export default {
    props: ['name']
}
</script>

<style>

</style>