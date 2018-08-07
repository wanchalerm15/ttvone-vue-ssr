<template>
    <div class="container">
        <h1>This is home page</h1>
        <ul>
            <li v-for="item of items" :key="item.id">
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["items"])
  },
  asyncData({ store }) {
    return store.dispatch("set_items");
  }
};
</script>

<style scoped>
li {
  display: block;
  background-color: #42b983;
  width: 250px;
  margin: 5px auto;
  padding: 5px;
  color: white;
}
</style>

