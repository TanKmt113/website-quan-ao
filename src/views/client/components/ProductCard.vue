<template>
  <CardItem :data="props.data"></CardItem>
</template>
<script setup>
import CardItem from "./CardItem.vue";
const props = defineProps(["data"]);
</script>
<style></style>
