<template>
  <v-app>
    <v-container fill-height fluid grid-list-xl>
      <v-layout wrap>
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
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import statsCard from '../components/statsCard.vue';

export default {
  name: "App",
  components: {statsCard},
  data() {
    return {
    };
  }
};
</script>