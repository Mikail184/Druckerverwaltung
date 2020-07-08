<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-toolbar-title class="absolute-center">
          Druckerverwaltung
        </q-toolbar-title>
        <!-- Shows either Login or Register Button depending wether User is logged in or not (from Localstorage) -->
         <q-btn v-if= "!loggedIn" to="/auth" class="absolute-right" color="primary" icon-right="login" label="Login" unelevated />
         <q-btn v-if= "loggedIn" @click="logoutUser" class="absolute-right" color="primary" icon-right="clear" label="Logout" unelevated />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
      </q-tabs>
    </q-footer>

    <q-drawer
      persistent
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-secondary"
      >
      <q-list dark>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { openURL } from 'quasar'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'MyLayout',
    data () {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        navs: [
          {
            label: 'Todo',
            icon: 'list',
            to: '/'
          },
          {
            label: 'Details etc.',
            icon: 'read_more',
            to: '/settings'
          }
        ]
      }
    },
    computed: {
      ...mapState('auth', ['loggedIn'])
    },
    methods: {
      ...mapActions('auth', ['logoutUser']),
      openURL
    }
  }
</script>

<style lang="scss">
// Hides footer if screen size is below 768px
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }
  
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
