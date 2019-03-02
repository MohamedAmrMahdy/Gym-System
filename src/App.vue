<template>
  <v-app>
    <v-navigation-drawer
      app
      id="app-drawer"
      floating
      persistent
      mobile-break-point="991"
      width="320"
    >
      <v-list>
        <v-list-group
          v-for="item in menuItems"
          :key="item.title"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile avatar :to="item.path">
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ subItem.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
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
          subtitle: "Contain all info and stats",
          active: true,
          path: "/"
        },
        {
          icon: "account_circle",
          title: "Profile",
          subtitle: "Show Your Profile",
          path: "/profile"
        },
        {
          icon: "people",
          title: "Customers",
          subtitle: "Shows All Customers",
          path: "/customers",
          items: [
            {
              icon: "add_circle",
              title: "Add",
              subtitle: "Add A New Customer",
              path: "/customers/add"
            },
            {
              icon: "remove_circle",
              title: "Remove",
              subtitle: "Remove Customer",
              path: "/customers/remove"
            }
          ]
        },
        {
          icon: "work",
          title: "Staff",
          subtitle: "Shows All Staff Members",
          path: "/staff",
          items: [
            {
              icon: "add_circle",
              title: "Add",
              subtitle: "Add A New Staff",
              path: "/staff/add"
            },
            {
              icon: "remove_circle",
              title: "Remove",
              subtitle: "Remove Staff",
              path: "/staff/remove"
            }
          ]
        }
      ]
    };
  }
};
</script>
