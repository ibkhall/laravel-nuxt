<template>
    <v-list active-color="secondary" nav>
          <template  v-for="item in links" :key="item.title"> 
          <v-list-group v-if="item.children" fluid>
              <template v-slot:activator="{ props }">
                  <v-list-item exact rounded="shaped" v-ripple v-bind="props" :prepend-icon="item.icon" :title="item.title" :value="item.title">
                  </v-list-item>
              </template>
              <template v-for="child in item.children">
                  <v-list-group v-if="child.children" class="ml-7" fluid>
                  <template v-slot:activator="{ props }">
                      <v-list-item exact rounded="shaped" v-ripple v-bind="props" :title="child.title" :value="child.title">
                          <template v-slot:prepend>
                              <v-icon size="small" start :icon="child.icon"></v-icon>
                          </template>
                      </v-list-item>
                  </template>
                  
                      <template v-for="el in child.children">
                          <v-list-item exact :to="el.to" rounded="shaped" v-ripple :title="el.title" :value="el.title">
                          <template v-slot:prepend>
                              <v-icon size="x-small" class="ml-7" start :icon="el.icon"></v-icon>
                          </template>
                      </v-list-item>
                      </template>
                  
                  </v-list-group>
                  <v-list-item exact v-else :to="child.to"  rounded="shaped"  v-ripple class="ml-7" :title="child.title" :value="child.title">
                      <template v-slot:prepend>
                                  <v-icon size="small" start :icon="child.icon"></v-icon>
                      </template>
                  </v-list-item>
              </template>
  
          </v-list-group>
          <v-list-item exact v-else rounded="shaped" :to="item.to" :prepend-icon="item.icon" :title="item.title" :value="item.title"></v-list-item>
          </template>
      </v-list>
  </template>