<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "mainView",
  data() {
    return {

    }
  },
  methods: {
    async fetchBooks() {
      const responce = await fetch("http://45.8.249.57/bookstore-api/books", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: '{"filters": {}}'
      });
      const result = await responce.json();
      console.log(result);
    }
  },
  mounted() {
    this.fetchBooks();
  }
}
</script>

<style scoped>

</style>
