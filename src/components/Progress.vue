<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="app1">
    <v-client-table :columns="columns" :data="progress" :options="options" :slot="actions">
      <span slot="actions" slot-scope={row}>
          <button class="btn btn-warning btn-sm" v-on:click="editRow(progress.date)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" v-on:click="deleteRow(progress.date)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </span>
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
  name: 'Progress',
  data () {
    return {
      messagetitle: ' Progress List ',
      progress: [],
      errors: [],
      columns: ['date', 'gender', 'age', 'weight', 'height', 'waist', '_id', 'actions'],
      options: {
        headings: {
          date: 'Date',
          gender: 'Gender',
          age: 'Age',
          weight: 'Weight',
          height: 'Height',
          waist: 'Waist',
          _id: 'ID',
          actions: 'Actions'
        }
      }
    }
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadProgress()
  },
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
    removeProgress: function () {
      workoutservice.deleteProgress(progress.id)
    },
    editRow (rowData) {
      alert('You clicked edit on' + JSON.stringify(rowData))
    },
    deleteRow (rowData) {
      alert('You clicked delete on' + JSON.stringify(rowData))
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
