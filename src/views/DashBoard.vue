<template>
  <v-app>
    <v-container fluid grid-list-xl >
      <v-layout wrap row>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="red" icon="perm_identity" title="Customers" :subTitle=dashboardData.totalCustomers></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="blue" icon="assignment_turned_in" title="Checkin today" :subTitle=dashboardData.totalCheckinsToday></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
        <statsCard color="indigo" icon="attach_money" title="Earning Today" :subTitle=dashboardData.earningsToday></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="teal" icon="monetization_on" title="Total Earning" :subTitle=dashboardData.totalEarnings></statsCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='column' title="Monthly Earnings" :data='dashboardData.monthlyEarnings'></chartCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='pie' title="Subscriptions" :data='dashboardData.subscriptions'></chartCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='line' title="checkins" :data='dashboardData.dayCheckins'></chartCard>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import statsCard from '../components/statsCard.vue';
import chartCard from '../components/chartCard.vue';

export default {
  name: "App",
  components: {statsCard,chartCard},
  computed: {
    dashboardData: function() {
      return this.$store.getters["apiDashboard/dashboardData"];
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize: function() {
      this.$store
        .dispatch("apiDashboard/getDashboardData")
        .catch(err => console.log(err));
    },
  },
  data() {
    return {
    };
  }
};
</script>