<template>
  <v-card
      elevation="2"
  >
      <v-row>
        <v-col class="v-col-4">

        </v-col>
        <v-col class="v-col-8">
          <v-row>
            <v-card-title>
              Название книги
            </v-card-title>
          </v-row>
          <v-row>
            <v-card-text>
              Цена
            </v-card-text>
            <v-card-actions>
              <v-btn>
                В корзину
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardComp"
}
</script>

<style scoped>

</style>
