<template>
  <div>
    <example-introduction/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExampleIntroduction from '@c/example/ExampleIntroduction.vue'

export default {
  name: 'Home',
  components: {
    ExampleIntroduction
  },
  created () {
    console.log(this.$HttpApi)
  }
}
</script>
