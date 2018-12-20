<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Add Schedule</label>
      <select id="paymenttype" name="paymenttype" class="form-control"
              type="text" v-model="paymenttype">
        <option value="null" selected disabled hidden>Choose Payment Type</option>
        <option value="Direct">Direct</option>
        <option value="PayPal">PayPal</option>
        <option value="Visa">Visa</option>
      </select>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
      <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 1000)</label>
      <input class="form__input" type="decimal" v-model.trim="amount"/>
    </div>
    <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 1000</div>
    <div class="form-group" :class="{ 'form-group--error': $v.message.$error }">
      <label class="form__label">Personal Message</label>
      <input class="form__input" placeholder="enter some message here" v-model.trim="$v.message.$model"/>
    </div>
    <div class="error" v-if="!$v.message.required">Message is Required</div>
    <div class="error" v-if="!$v.message.minLength">Message must have at least {{$v.message.$params.minLength.min}} letters.</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ donationBtnTitle }}</button>
    </p>
    <p>
      <a href="#/donations" class="btn btn-primary btn1" role="button">Manage Donations</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Donation!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Donating...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, between } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'Progress',
  props: ['progressBtnTitle', 'Progress'],
  data () {
    return {
      messagetitle: ' Add Progress ',
      message: this.progress.message,
      date: this.progress.date,
      gender: this.progress.gender,
      age: this.progress.date,
      weight: this.progress.weight,
      height: this.progress.height,
      waist: this.progress.waist,
      submitStatus: null
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(5)
    },
    amount: {
      required,
      between: between(1, 1000)
    }
  },
  methods: {
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
          var progress = {
            date: this.date,
            gender: this.gender,
            age: this.age,
            weight: this.weight,
            height: this.height,
            waist: this.waist
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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
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
