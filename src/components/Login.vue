<template>
  <div class="container">
    <div class="centre"></div>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style scoped>
.container{
  height: 100%;
  background:linear-gradient(45deg,#EFF7FE,#0C5460);
}
.container .centre{
  width: 407px;
  height: 255px;
  border:1px solid #ccc;
  box-shadow:0 2px 15px #eee;
  border-radius:5px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-60%);
  background:linear-gradient(210deg,#f0f8ff,#d1ecf1);
}
</style>
