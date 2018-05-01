<template>
  <div class="home">
    <img class="" src="../../assets/icon-logo.jpg" height="150" width="150"/>
    <h1>author: BOB</h1>
    <a class="link" href="https://github.com/Henry-boter/vue-contacts">GitHub</a>
    <router-link to="/contacts" tag="a" class="link">demo</router-link>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to start'
    }
  }
}
</script>
<style scoped>
.home{
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f6f6f6;
}
  .link{
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    color: #333333;
    margin: 10px 0;
  }
</style>
