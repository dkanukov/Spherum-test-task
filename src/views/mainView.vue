<template>
  <div>
    <HeaderComp/>
    <v-container fluid>
      <v-row>

        <v-col class="v-col-6">
          <v-row class="justify-sm-space-between">
            <v-col class="align-self-center v-col-xs-4 v-col-sm-5 v-col-md-4 v-col-lg-4">
              <h3
                class="pb-5 sort__btn"
                @click="toggleSortType(); sortBooks()"
              >
                Сортировка цен
              </h3>
            </v-col>
            <v-col class="align-self-center v-col-5 v-col-sm-5">
              <v-select
                  :items="booksDefaultCategories"
                  item-title="name"
                  label="Категория"
                  v-model="selectedCategory"
                  return-object
              />
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col class="v-col-11">
            <v-text-field
                class="search__field"
                v-model.trim="searchInput"
                @input="sortBooks"
            />
            </v-col>
          </v-row>
          <v-row v-if="defaultData.length !== 0">
            <v-col
              class="mt-5 v-col-12 v-col-lg-6"
              v-for="book in defaultData"
              cols="6"
              :key="book"
            >
              <card-comp
                  @addToCart="addToCartParent"
                  :name = book.name
                  :author-name = book.authorName
                  :price = book.price
                  :cover-url = book.coverUrl
                  :category-id = book.categoryId
              />
            </v-col>
          </v-row>
          <v-row v-else class="justify-center">
            <h1>Мы не смогли ничего найти :(</h1>
          </v-row>
        </v-col>

        <v-spacer/>

        <v-col class="v-col-4 pt-5">
          <h2 class="books__list">Корзина</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp";
import CardComp from "@/components/CardComp";
export default {
  name: "mainView",
  components: {
    HeaderComp,
    CardComp
  },
  data() {
    return {
      defaultData: [],
      booksDefaultCategories: [],
      bookCategories: [],
      sortedBooks: [],
      sortBy: "ASC",
      searchInput: "",
      selectedCategory: "",
    }
  },
  methods: {
    async fetchBooks() {
      const responce = await fetch("http://45.8.249.57/bookstore-api/books", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: '{"filters": {' +
            '"sortPrice": "' + this.sortBy + '"}}'
      });
      this.defaultData = await responce.json();
      // this.toggleSortType();
    },
    async fetchCategories() {
      const responce = await fetch("http://45.8.249.57/bookstore-api/books/categories", {
        method: "GET",
      });
      this.booksDefaultCategories = await responce.json();
    },
    async sortBooks() {
      console.log(this.sortBy)
      let selectedCategoryId = 0;
      if (this.selectedCategory !== "") {
        selectedCategoryId = this.booksDefaultCategories.find(category => category.name === this.selectedCategory).id;
      }
      const responce = await fetch("http://45.8.249.57/bookstore-api/books", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: '{"filters": {' +
            '"search": "' + this.searchInput + '",' +
            '"sortPrice": "' + this.sortBy + '",' +
            '"categoryId": ' + selectedCategoryId + '}}'
      });
      console.log(responce);
      this.sortedBooks = await responce.json();
      this.defaultData = this.sortedBooks;
    },
    toggleSortType() {
      this.sortBy = this.sortBy === "DESC" ? "ASC" : "DESC";
    },
    addToCartParent(data) {
      console.log(data)
    }
  },
  watch: {
    selectedCategory() {
      this.sortBooks();
    }
  },
  mounted() {
    this.fetchBooks();
    this.fetchCategories();
  }
}
</script>

<style scoped>
  .sort__btn {
    position: relative;
    cursor: pointer;
  }

  .sort__btn::after {
    position: absolute;
    content: "";
    bottom: 0;
    width: 40px;
    height: 40px;
    background-image: url(../assets/arrows.svg);
    right: 0;
    left: 150px;
  }

  .books__list {
    position: relative;
  }

  .books__list::after {
    position: absolute;
    content: "";
    bottom: 0;
    width: 40px;
    height: 40px;
    background-image: url(../assets/bucket.svg);
    right: -120px;
  }

  .search__field {
    position: relative;
  }

  .search__field::before {
    position: absolute;
    content: "";
    width: 40px;
    height: 40px;
    background-image: url(../assets/mirror.svg);
    bottom: 33px;
  }
</style>
