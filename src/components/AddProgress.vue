<template>
  <div id="app">
  <h2 class="ui header" id="title">Add Progress</h2>
  <form @submit.prevent="submit" class="ui form">
    <div class="six fields">
      <div class="field" :class="{ 'form-group--error': $v.date.$error }">
        <label class="label">Date </label>
        <input class="form__input" v-model.trim="date"/>
      </div>
      <div class="field" :class="{ 'form-group--error': $v.gender.$error }">
        <label class="label">Gender </label>
        <input class="form__input" v-model.trim="gender"/>
      </div>
      <div class="field" :class="{ 'form-group--error': $v.age.$error }">
        <label class="label">Age </label>
        <input class="form__input" v-model.trim="age"/>
      </div>
      <div class="field" :class="{ 'form-group--error': $v.weight.$error }">
        <label class="label">Weight </label>
        <input class="form__input" v-model.trim="weight"/>
      </div>
      <div class="field" :class="{ 'form-group--error': $v.height.$error }">
        <label class="label">Height </label>
        <input class="form__input" v-model.trim="height"/>
      </div>
      <div class="field" :class="{ 'form-group--error': $v.waist.$error }">
        <label class="label">Waist </label>
        <input class="form__input" v-model.trim="waist"/>
      </div>
    </div>
    <p>
      <button class="ui positive button" type="submit" :disabled="submitProgress === 'PENDING'">Add Progress</button>
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
  name: 'AddProgress',
  data () {
    return {
      date: '',
      gender: '',
      age: '',
      weight: '',
      height: '',
      waist: '',
      submitStatus: null
    }
  },
  validations: {
    date: {
      required,
      format: ('2018-10-10')
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
        this.submitProgress = 'ERROR'
      } else {
        // do your submit logic here
        this.submitProgress = 'PENDING'
        setTimeout(() => {
          this.submitProgress = 'OK'
          let progress = {
            date: '',
            gender: '',
            age: '',
            weight: '',
            height: '',
            waist: ''
          }
          this.progress = progress
          console.log('Submitting in DonationForm : ' +
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
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }

  h2, label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
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
