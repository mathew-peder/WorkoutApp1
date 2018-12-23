<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <table align="center">
      <tr>
        <td>
          <p>Email: mat.c.peder@gmail.com</p>
          <p>Github: <a href ="https://github.com/mathew-peder/WorkoutApp1">github.com/mathew-peder</a></p>
          <p>Linkedin: <a href ="https://www.linkedin.com/in/mathew-peder-48ab01170/">My Linkedin</a></p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      messagetitle: ' Contact Us '
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
