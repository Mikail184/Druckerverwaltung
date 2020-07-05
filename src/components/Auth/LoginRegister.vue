<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{tab | capitalFirst }} in order to use this webpage or contact Mike
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        ref="email"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        lazy-rules
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid Email-address!']"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        type="password"
        ref="password"
        class="col"
        outlined
        v-model="formData.password"
        label="Password"
        stack-label
        lazy-rules
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  props: ['tab'],
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if(!this.$refs.email.hasError && !this.$refs.password.hasError) {
          if(this.tab == 'login') {
            this.loginUser(this.formData)
          }
          else {
            this.registerUser(this.formData)
          }
      }
    },
    isValidEmailAddress(email) {
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    capitalFirst(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
};
</script>

<style>
</style>