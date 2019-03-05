<template>
    <v-card class="chart-mainCard elevation-8">
        <line-chart 
            v-if="type == 'line'"
            class="chart-chart"
            :download="true"
            :colors="['#00C853']"
            :data="data"
        ></line-chart>
        <pie-chart
            v-else-if="type == 'pie'"
            class="chart-chart"
            :download="true"
            :donut="true"
            :data="data"
        ></pie-chart>
        <column-chart
            v-else-if="type == 'column'"
            class="chart-chart"
            :download="true"
            :donut="true"
            :colors="['#00C853']"
            :data="data"
        ></column-chart>
        <v-card-text>
            <v-divider class="pb-2"></v-divider>
            <div class="title font-weight-light font-italic text-xs-center text-uppercase pb-2">{{title}}</div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  props: {
    color: {
      default: "primary",
      type: String
    },
    icon: {
      default: "error",
      type: String
    },
    title: {
      default: "#Title#",
      type: String
    },
    type: {
      default: "line",
      type: String
    },
    data: {// eslint-disable-next-line
      default: { "1": 10, "2": 5, "3": 15, "4": 30, "5": 5 },
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>
    
<style>
.chart-mainCard {
  margin-bottom: 24px;
  margin-top: 12px;
  border-radius: 10px;
}
.chart-chart {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>