<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="schedule" :fields="fields" >
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editProgress(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteProgress(props.row._id)"></a>
      </v-client-table>
    <!--<div id="app1">-->
    <!--<div class="col-7" v-for="workout in schedule" :key="workout._id">-->
      <!--{{workout._id}}-->
      <!--{{workout.sunday}}-->
      <!--{{workout.monday}}-->
      <!--{{workout.tuesday}}-->
      <!--{{workout.wednesday}}-->
      <!--{{workout.thursday}}-->
      <!--{{workout.friday}}-->
      <!--{{workout.saturday}}-->
    <!--</div>-->
  <!--</div>-->
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
      schedule: [
        'sunday.workout', 'sunday.reps',
        'monday.workout', 'monday.reps',
        'tuesday.workout', 'tuesday.reps',
        'wednesday.workout', 'wednesday.reps',
        'thursday.workout', 'thursday.reps',
        'friday.workout', 'friday.reps',
        'saturday.workout', 'saturday.reps'],
      errors: [],
      columns: [
        '_id',
        'sunday.workout', 'sunday.reps',
        'monday.workout', 'monday.reps',
        'tuesday.workout', 'tuesday.reps',
        'wednesday.workout', 'wednesday.reps',
        'thursday.workout', 'thursday.reps',
        'friday.workout', 'friday.reps',
        'saturday.workout', 'saturday.reps'
      ],
      options: {
        fields:
        [
          {
            'sunday': {
              workout: 'Workout',
              reps: 'Reps'
            },
            monday: {
              workout: 'Workout',
              reps: 'Reps'
            },
            tuesday: {
              workout: 'Workout',
              reps: 'Reps'
            },
            wednesday: {
              workout: 'Workout',
              reps: 'Reps'
            },
            thursday: {
              workout: 'Workout',
              reps: 'Reps'
            },
            friday: {
              workout: 'Workout',
              reps: 'Reps'
            },
            saturday: {
              workout: 'Workout',
              reps: 'Reps'
            }
          }
        ]
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
