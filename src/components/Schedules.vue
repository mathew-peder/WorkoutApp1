<!--<Template to print the schedule documents and the data for each day
Also uses the same edit and delete buttons as the progress.
>-->
<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="schedule" :options="options"  >
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editSchedule(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteSchedule(props.row._id)"></a>
      </v-client-table>
  </div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueTables from 'vue-tables-2'
import workoutservice from '../Services/workoutservice'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

/*
adds the data from the schedule document to a table with named columns for the day, workout, and reps
 */
export default {
  name: 'Schedule',
  data () {
    return {
      messagetitle: ' Schedule List ',
      schedule: [],
      errors: [],
      columns: [
        '_id',
        'sunday.0.workout',
        'sunday.0.reps',
        'monday.0.workout',
        'monday.0.reps',
        'tuesday.0.workout',
        'tuesday.0.reps',
        'wednesday.0.workout',
        'wednesday.0.reps',
        'thursday.0.workout',
        'thursday.0.reps',
        'friday.0.workout',
        'friday.0.reps',
        'saturday.0.workout',
        'saturday.0.reps',
        'edit',
        'remove'
      ],
      options: {
        headings: {
          'sunday.0.workout': 'Sunday',
          'sunday.0.reps': 'Reps',
          'monday.0.workout': 'Monday',
          'monday.0.reps': 'Reps',
          'tuesday.0.workout': 'Tuesday',
          'tuesday.0.reps': 'Reps',
          'wednesday.0.workout': 'Wednesday',
          'wednesday.0.reps': 'Reps',
          'thursday.0.workout': 'Thursday',
          'thursday.0.reps': 'Reps',
          'friday.0.workout': 'Friday',
          'friday.0.reps': 'Reps',
          'saturday.0.workout': 'Saturday',
          'saturday.0.reps': 'Reps',
          _id: 'ID',
          actions: 'actions'
        }
      }
    }
  },
  // Fetches Schedule when the component is created.
  created () {
    this.loadSchedules()
  },

  /*
  Methods to load the schedules from the DB. Workd
  Delete a schedule. Works
  Edit a schedule. In progress
   */
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
    },
    editSchedule: function (id) {
      this.$router.params = id
      this.$router.push('editschedule')
    },
    deleteSchedule: function (id) {
      workoutservice.deleteSchedule(id)
        .then(response => {
          this.loadSchedules()
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
