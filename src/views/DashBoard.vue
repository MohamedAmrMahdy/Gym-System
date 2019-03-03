<template>
<v-app>
  <v-container>
    <div class="title font-weight-light font-italic text-uppercase text-sm-left">{{$route.name}}</div>
    <HelloWorld />
  </v-container>
</v-app>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      HelloWorld
    }
  }
</script>
