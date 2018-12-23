<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-info" style="padding: 3px"></i>{{messagetitle}}</h3>
    <table align="center">
      <tr>
        <td>
          <p>This web app was made by Mathew Peder</p>
          <p>This is a basic workout scheduling and</p>
          <p>Progress tracking web app.</p>
          <p>For more information, visit my github <a href ="https://github.com/mathew-peder/WorkoutApp1">here</a></p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data () {
    return {
      messagetitle: ' About Us '
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
