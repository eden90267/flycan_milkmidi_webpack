<style lang="scss" src="@/css/app.scss">
</style>

<style scoped>
.time{
  font-size: 100px;
}
</style>


<template>

<div id="app">
  <h1>hi vuejs</h1>
  <button @click="clickHandler">Click</button>
  <img src="~logo.png" />
  <p class="time">{{count}}</p>
</div>

</template>

<script>

export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    clickHandler() {
      this.count += 1;
    },
  },
};
</script>

