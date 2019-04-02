<template>
  <v-app>
    <v-container fluid grid-list-xl >
      <v-layout wrap row>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="red" icon="perm_identity" title="Customers" subTitle="12,313"></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="blue" icon="assignment_turned_in" title="Checkin today" subTitle="13"></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="indigo" icon="attach_money" title="Earning Today" subTitle="$12,313"></statsCard>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <statsCard color="teal" icon="monetization_on" title="Total Earning" subTitle="$126,313"></statsCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='column' title="Monthly Earnings" :data='data1'></chartCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='pie' title="Subscriptions" :data='data3'></chartCard>
        </v-flex>
        <v-flex lg4>
          <chartCard type='line' title="checkins" :data='data2'></chartCard>
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
  data() {
    return {
      data1:{ "June": 41000, "Feb": 20000, "March": 50000, "April": 15000, "May": 30000, "ThisMonth": 8000 },
      data2:{ "6-Days Ago": 430, "5-Days Ago": 410, "4-Days Ago": 200, "3-Days Ago": 500, "2-Days Ago": 150, "Yesterday": 300, "Today": 80 },
      data3:{ 'Daily': 244, 'Monthly': 40, '3-Months': 100, 'Yearly': 20 },
    };
  }
};
</script>