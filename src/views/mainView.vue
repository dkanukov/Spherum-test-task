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
                @click="sortByPrice"
              >
                Сортировка цен
              </h3>
            </v-col>
            <v-col class="align-self-center v-col-5 v-col-sm-5">
              <v-select
                  :items="bookCategories"
                  label="Категория"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <v-col class="v-col-11">
            <v-text-field
                class="search__field"
            />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="mt-5 v-col-12 v-col-lg-6"
              v-for="book in defaultData"
              cols="6"
              :key="book"
            >
              <card-comp
                  :name = book.name
                  :author-name = book.authorName
                  :price = book.price
                  :cover-url = book.coverUrl
                  :category-id = book.categoryId

              />
            </v-col>
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
      booksDefaultData: [],
      bookCategories: [],
      sortedBooks: []
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
      this.defaultData = await responce.json();
    },
    async fetchCategories() {
      const responce = await fetch("http://45.8.249.57/bookstore-api/books/categories", {
        method: "GET"
      });
      this.booksDefaultData = await responce.json();
      for (let i = 0; i < this.booksDefaultData.length; i++) {
        this.bookCategories[i] = this.booksDefaultData[i].name;
      }
    },
    async sortByPrice() {
      const responce = await fetch("http://45.8.249.57/bookstore-api/books", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: '{"filters": {' +
            '"search": "",' +
            '"sortPrice": "DESC"}}'
      });
      this.sortedBooks = await responce.json();
      console.log(this.sortedBooks)
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
