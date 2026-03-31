<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div className="flex min-h-screen bg-slate-50">
    <Sidebar :isCollapsed="isCollapsed" @toggle="toggleSidebar" />
    
    <div className="flex-1 flex flex-col min-w-0">
      <Header />
      <main className="flex-1 p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
