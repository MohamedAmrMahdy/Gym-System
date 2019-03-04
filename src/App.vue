<template>
  <v-app>
    <v-navigation-drawer dark app fixed width="260" class="elevation-8">
      <v-list expand class="pt-5 mt-4">
        <template v-for="item in menuItems">
          <v-subheader
            v-if="item.header"
            :key="item.title"
            class="text-uppercase font-weight-light"
          >{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="item.title"></v-divider>
          <v-list-tile v-else :key="item.title" :to="item.path" ripple="ripple">
            <v-list-tile-action>
              <v-icon medium>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-uppercase">{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="caption text-capitalize">{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed app clipped-left color="primary elevation-5" style="border-bottom-left-radius: 20px">
        
        <v-toolbar-side-icon >
          <v-icon >fitness_center</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="text-uppercase">Gym System</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-light font-italic text-uppercase">{{$route.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon >
          <v-icon >refresh</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menuItems: [
        {
          icon: "dashboard",
          title: "DashBoard",
          subtitle: "contain all info and stats",
          path: "/"
        },
        {
          icon: "account_circle",
          title: "Profile",
          subtitle: "show Your Profile",
          path: "/profile"
        },
        {
          divider: true
        },
        {
          header: "Main Control"
        },
        {
          icon: "people",
          title: "Customers",
          subtitle: "shows All Customers",
          path: "/customers"
        },
        {
          icon: "rss_feed",
          title: "subscriptions",
          subtitle: "shows subscriptions types",
          path: "/subscriptions"
        },
        {
          icon: "work",
          title: "Staff",
          subtitle: "Shows All Staff Members",
          path: "/staff"
        },
        {
          divider: true
        },
        {
          header: "Others"
        },
        {
          icon: "library_books",
          title: "Documentation",
          subtitle: "",
          path: "/documentation"
        },
        {
          icon: "help",
          title: "Contact",
          subtitle: "",
          path: "/contact"
        },
        {
          icon: "info",
          title: "About System",
          subtitle: "",
          path: "/about"
        },
        {
          icon: "tune",
          title: "Settings",
          subtitle: "",
          path: "/settings"
        }
      ]
    };
  }
};
</script>
