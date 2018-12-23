<!--<Template for Updating the progress by using a progress form as the format
Currently only adds extra progresses to the list, Can't figure out where it
goes wrong>-->
<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
          <template v-if="childDataLoaded">
            <progress-form :progress="progress" progressBtnTitle="Update Progress"
                           @progress-is-created-updated="updateProgress"></progress-form>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
import workoutservice from '../Services/workoutservice'
import ProgressForm from '../components/ProgressForm'

/*
Sets the message and the components to be used when editing a progress object.
 */
export default {
  data () {
    return {
      progress: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Progress '
    }
  },
  components: {
    'progress-form': ProgressForm
  },
  created () {
    this.getProgress()
  },

  /*
Sets the methods for getting the progress selected by id and updating the progress by id
Currently has an issue with updating the selected progress and only adds a new one
 */
  methods: {
    getProgress: function () {
      workoutservice.fetchProgress(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.progress = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Progress in Edit: ' + JSON.stringify(this.progress, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateProgress: function (progress) {
      console.log('Before PUT ' + JSON.stringify(progress, null, 5))
      workoutservice.putProgress(this.$router.params, progress)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(progress, null, 5))
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
  app {
    width: 70%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }

  h2 {
    display: inline-block;
    width: 540px;
    text-align: center;
    font-size: x-large;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: center;
    font-size: large;
  }
  button {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
    color: black;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
