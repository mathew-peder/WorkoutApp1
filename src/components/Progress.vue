<!--<Adds the data from the back end to a table on the front end using columns, ddata and option headings
Also adds the edit and delete buttons to the end of each progress. The buttons call the delete and edit functions
These buttons are referenced from the code given in the labs>-->
<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="app1">
    <v-client-table :columns="columns" :data="progress" :options="options">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editProgress(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteProgress(props.row._id)"></a>
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
COMPLETE
Adds the objects from the document to a table as columns, then adds the data from the document
under the column names. Also adds the edit and remove functions for the buttons.
Currently all filtering and searching works for progress.
 */
export default {
  name: 'Progress',
  data () {
    return {
      messagetitle: ' Progress List ',
      progress: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'date', 'gender', 'age', 'weight', 'height', 'waist', 'edit', 'remove'],
      options: {
        perPage: 10,
        headings: {
          perPage: 10,
          date: 'Date',
          gender: 'Gender',
          age: 'Age',
          weight: 'Weight',
          height: 'Height',
          waist: 'Waist',
          _id: 'ID',
          actions: 'actions'
        }
      }
    }
  },

  /*
  Fetches Progress when the component is created.
   */
  created () {
    this.loadProgress()
  },

  /*
  Methods to load the progress from the database on heroku using fetchAll. Works
  Delete a progress. Works
  Edit a progress. Slightly works, but with unintended consequence of adding a new progress
   */
  methods: {
    loadProgress: function () {
      workoutservice.fetchAllProgress()
        .then(response => {
          // JSON responses are automatically parsed.
          this.progress = response.data
          console.log(this.progress)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editProgress: function (id) {
      this.$router.params = id
      this.$router.push('editprogress')
    },
    deleteProgress: function (id) {
      workoutservice.deleteProgress(id)
        .then(response => {
          this.loadProgress()
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
