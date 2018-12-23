<!--<Adds the workout and reps in each day to a form to be filled out
Currently does not work>-->
<template>
  <div id="app">
    <h2 class="ui header" id="title">Add Progress</h2>
    <form @submit.prevent="submit" class="ui form">
      <div class="seven fields">
        <div class="field" :class="{ 'form-group--error': $v.sunday.$error }">
          <label class="label">Sunday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="sunday.workout"/>
          <label class="label">Sunday Reps ()</label>
          <input class="form__input" v-model.trim="sunday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.monday.$error }">
          <label class="label">Monday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="monday.workout"/>
          <label class="label">Monday Reps ()</label>
          <input class="form__input" v-model.trim="monday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.tuesday.$error }">
          <label class="label">Tuesday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="tuesday.workout"/>
          <label class="label">Tuesday Reps ()</label>
          <input class="form__input" v-model.trim="tuesday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.wednesday.$error }">
          <label class="label">Wednesday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="wednesday.workout"/>
          <label class="label">Wednesday Reps ()</label>
          <input class="form__input" v-model.trim="wednesday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.thursday.$error }">
          <label class="label">Thursday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="thursday.workout"/>
          <label class="label">Thursday Reps ()</label>
          <input class="form__input" v-model.trim="thursday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.friday.$error }">
          <label class="label">Friday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="friday.workout"/>
          <label class="label">Friday Reps ()</label>
          <input class="form__input" v-model.trim="friday.reps"/>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.saturday.$error }">
          <label class="label">Saturday Workout (YYYY-MM-DD)</label>
          <input class="form__input" v-model.trim="saturday.workout"/>
          <label class="label">Saturday Reps ()</label>
          <input class="form__input" v-model.trim="saturday.reps"/>
        </div>
      </div>
      <p>
        <button class="ui positive button" type="submit" :disabled="submitSchedule === 'PENDING'">Add Schedule</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Schedule</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Submitting</p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import workoutservice from '../Services/workoutservice'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

/*
Adding the objects as empty strings ready for input from the user.
Currently does not work
 */
export default {
  name: 'FormData',
  props: ['scheduleBtnTitle', 'schedule'],
  data () {
    return {
      messagetitle: ' Add Schedule ',
      sunday: {
        workout: '',
        reps: ''
      },
      monday: {
        workout: '',
        reps: ''
      },
      tuesday: {
        workout: '',
        reps: ''
      },
      wednesday: {
        workout: '',
        reps: ''
      },
      thursday: {
        workout: '',
        reps: ''
      },
      friday: {
        workout: '',
        reps: ''
      },
      saturday: {
        workout: '',
        reps: ''
      },
      submitStatus: null
    }
  },

  /*
  Methods for adding the user input into the document and then submitting it to the database using PUT
  The methods work, but this page is still being worked on
   */
  methods: {
    submitSchedule: function (schedule) {
      workoutservice.postSchedule(schedule)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          let schedule = {
            workout: this.workout,
            reps: parseInt(this.reps)
          }
          this.schedule = schedule
          console.log('Submitting in ScheduleForm : ' +
              JSON.stringify(this.schedule, null, 5))
          this.$emit('schedule-is-created-updated', this.schedule)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app {
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
    text-align: left;
    font-size: large;
  }

  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  button {
    width: 300px;
    font-size: x-large;
    align-items: center;
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
