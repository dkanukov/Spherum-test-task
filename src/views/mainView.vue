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
                  @pushData="addToCart"
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
          <v-card
              class="mt-5"
              v-for="book in cart"
              :key="book.id">
            <v-row>
              <v-col class="v-col-8">
                <v-row>
                  <v-card-title>{{book.name}}</v-card-title>
                </v-row>
                <v-row>
                  <v-card-text>{{book.numberInCart}} шт.</v-card-text>
                </v-row>
                <v-row>
                  <v-card-title>{{ book.cartDisplayPrice }}</v-card-title>
                </v-row>
              </v-col>
              <v-col class="align-self-center">
                <v-btn
                    color="error"
                    @click="removeFromCart(book.id)"
                >Удалить</v-btn>
              </v-col>
            </v-row>

          </v-card>
          <v-row>
            <v-col class="mt-3">
              <v-divider/>
              <v-row class="justify-center">
                <h2 class="mt-5 d-block">{{ totalCartCost }} руб.</h2>
              </v-row>
              <v-row class="justify-center">
                <v-btn
                    :disabled="totalCartCost === 0"
                    @click="buyBooks"
                    color="success"
                    size="large"
                    class="mt-5 jusify-center"
                >
                  Оформить заказ
                </v-btn>
              </v-row>

            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-alert
      v-show="alert"
      type="success"
      transition="scale-transition"
  >
    Покупка прошла успешно!
  </v-alert>
  <v-alert
      v-show="alert_error"
      type="error"
      transition="scale-transition"
  >
    Недостаточно средств на счету!
  </v-alert>
</template>

<script>
import HeaderComp from "@/components/HeaderComp";
import CardComp from "@/components/CardComp";
import {mapGetters, mapMutations} from "vuex";
export default {
  name: "mainView",
  components: {
    HeaderComp,
    CardComp
  },
  data() {
    return {
      cart: [],
      defaultData: [],
      booksDefaultCategories: [],
      bookCategories: [],
      sortedBooks: [],
      sortBy: "ASC",
      searchInput: "",
      selectedCategory: "",
      alert: false,
      alert_error: false,
    }
  },
  methods: {
    ...mapMutations(["setNewBalance"]),
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
    addToCart(data) {
      if (this.cart.find(book => (book.name === data.name && true) || false)) {
        const book = this.cart.find(book => book.name === data.name);
        book.numberInCart += 1;
        book.cartDisplayPrice = book.price * book.numberInCart;
      } else {
        this.cart.push(data);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(id) {
      const book = this.cart.find(book => book.id === id);
      if (book.numberInCart > 1) {
        book.numberInCart -= 1;
        book.cartDisplayPrice = book.price * book.numberInCart;
      } else {
        this.cart.splice(this.cart.indexOf(book), 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    buyBooks() {
      if (this.getBalance > this.totalCartCost) {
        console.log("Покупка совершена");
        this.setNewBalance(this.totalCartCost);
        this.cart = [];
        this.alert = true;
        localStorage.setItem("cart", JSON.stringify(this.cart));
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      } else {
        console.log("Недостаточно средств");
        this.alert_error = true;
        setTimeout(() => {
          this.alert_error = false;
        }, 3000);
      }
    }
  },
  watch: {
    selectedCategory() {
      this.sortBooks();
    }
  },
  computed: {
    totalCartCost() {
      return this.cart.reduce((acc, book) => acc + book.cartDisplayPrice, 0);
    },
    ...mapGetters(["getBalance"])
  },
  created() {
    this.fetchBooks();
    this.fetchCategories();
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }
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

  .v-alert {
    position: fixed;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
</style>
