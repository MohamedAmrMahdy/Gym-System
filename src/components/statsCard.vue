<template>
  <v-card class="mainCard">
    <v-card dark :color="color" class="iconCard">
      <v-icon x-large class="icon">{{icon}}</v-icon>
    </v-card>
    <v-card-text>
      <div class="title font-weight-light font-italic text-xs-right text-uppercase pb-2">{{title}}</div>
      <v-divider class="pb-2"></v-divider>
      <div class="title text-xs-right font-weight-regular">{{subTitle}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      default: 'primary',
      type: String
    },
    icon: {
      default: 'error',
      type: String
    },
    title: {
      default: '#Title#',
      type: String
    },
    subTitle: {
      default: '#SubTitle#',
      type: String
    },
  },
  data() {
    return {};
  }
};
</script>
    
<style>
.mainCard{
    margin-bottom: 24px; 
    margin-top: 24px;
    border-radius: 10px;
}
.iconCard{
    border-radius: 25px;
    top: -20px;
    margin: 10px;
    position: absolute;
}
.icon{
    margin: 10px;
}
</style>