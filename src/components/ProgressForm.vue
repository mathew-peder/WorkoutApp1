<template>
  <div id="app">
    <h2 class="ui header" id="title">Edit Progress</h2>
    <form @submit.prevent="submit" class="ui form">
      <div class="six fields">
        <div class="field" :class="{ 'form-group--error': $v.date.$error }">
          <label class="label">Date (YYYY-MM-DD)</label>
          <label>
            <input class="form__input" v-model.trim="date"/>
          </label>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.gender.$error }">
          <label class="label">Gender (M/F/O)</label>
          <label>
            <input class="form__input" v-model.trim="gender"/>
          </label>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.age.$error }">
          <label class="label">Age </label>
          <label>
            <input class="form__input" v-model.trim="age"/>
          </label>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.weight.$error }">
          <label class="label">Weight (kg)</label>
          <label>
            <input class="form__input" v-model.trim="weight"/>
          </label>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.height.$error }">
          <label class="label">Height (cm)</label>
          <label>
            <input class="form__input" v-model.trim="height"/>
          </label>
        </div>
        <div class="field" :class="{ 'form-group--error': $v.waist.$error }">
          <label class="label">Waist (in)</label>
          <label>
            <input class="form__input" v-model.trim="waist"/>
          </label>
        </div>
      </div>
      <p>
        <button class="ui positive button" type="submit" :disabled="submitProgress === 'PENDING'">Add Edit</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Progress</p>
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
import { required, between } from 'vuelidate/lib/validators'
import workoutservice from '../Services/workoutservice'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  name: 'EditProgress',
  data () {
    return {
      date: '',
      gender: '',
      age: '',
      weight: '',
      height: '',
      waist: '',
      submitStatus: null,
      errors: []
    }
  },
  validations: {
    date: {
      required
    },
    gender: {
      required
    },
    age: {
      required,
      between: between(16, 100)
    },
    weight: {
      required,
      between: between(10, 1000)
    },
    height: {
      required,
      between: between(10, 1000)
    },
    waist: {
      required,
      between: between(10, 100)
    }
  },
  methods: {
    submitProgress: function (progress) {
      workoutservice.postProgress(progress)
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
          let progress = {
            date: this.date,
            gender: this.gender,
            age: parseInt(this.age),
            weight: parseInt(this.weight),
            height: parseInt(this.height),
            waist: parseInt(this.waist)
          }
          this.progress = progress
          this.submitProgress(this.progress)
          console.log('Submitting in ProgressForm : ' +
              JSON.stringify(this.progress, null, 5))
          this.$emit('progress-is-created-updated', this.progress)
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
