<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="app1">
    <v-client-table :columns="columns" :data="schedule" :options="options">
    </v-client-table>
  </div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueTables from 'vue-tables-2'
import workoutservice from '../Services/workoutservice'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Schedule',
  data () {
    return {
      messagetitle: ' Schedule List ',
      schedule: [],
      errors: [],
      columns: ['_id', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      options: {
        headings: {
          _id: 'ID',
          Sunday: 'Sunday',
          Monday: 'Monday',
          Tuesday: 'Tuesday',
          Wednesday: 'Wednesday',
          Thursday: 'Thursday',
          Friday: 'Friday',
          Saturday: 'Saturday'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadSchedules()
  },
  methods: {
    loadSchedules: function () {
      workoutservice.fetchAllSchedules()
        .then(response => {
          this.schedule = response.data
          console.log(this.schedule)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
