<template>
  <v-card
      min-width="260px"
      elevation="2"
  >
      <v-row>
        <v-col class="v-col-4">
          <v-img
              :lazy-src="coverUrl"
              height="200"
              width="150"
              :src="coverUrl"
          ></v-img>
        </v-col>
        <v-col class="v-col-8">
          <v-row>
            <v-col>
              <v-card-title style="overflow-y: auto; overflow-x: auto; height:150px">
                <p>{{name}}</p>
              </v-card-title>
            </v-col>

          </v-row>
          <v-row>
            <v-col
                class="align-self-center"
                col="3"
            >
              <v-card-text>
                {{price}} руб
              </v-card-text>
            </v-col>
            <v-col
                class="align-self-center"
            >
              <v-btn
                  @click="addToCart"
                  elevation="2"
                  color="primary"
                  size="small"
              >
                В корзину
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardComp",
  data() {
    return {
      dataName: this.$props.name,
      dataAuthorName: this.$props.authorName,
      dataPrice: this.$props.price,
      dataCategoryId: this.$props.categoryId,
      numberInCart: 1
    }
  },
  props: {
    name: String,
    authorName: String,
    price: Number,
    coverUrl: String,
    categoryId: Number
  },
  methods: {
    addToCart() {
      this.$emit("pushData", {
        name: this.dataName,
        authorName: this.dataAuthorName,
        price: this.dataPrice,
        categoryId: this.dataCategoryId,
        numberInCart: this.numberInCart,
        cartDisplayPrice: this.price
      });
    }
  },
}
</script>

<style scoped>

</style>
