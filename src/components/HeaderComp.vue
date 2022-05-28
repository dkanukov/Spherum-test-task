<template>
  <div>
    <v-container>
      <v-row class="justify-space-around align-center">

        <v-col class="v-col-6">
          <h1 class="header__icon">
            Магазин книг
          </h1>
        </v-col>
        <v-spacer/>
        <v-col class="v-col-5 v-col-md-3 v-col-lg-3">
          <h3>Баланс: {{}}</h3>
        </v-col>
      </v-row>
    </v-container>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "HeaderComp"
}
</script>

<style scoped>
  .header__icon {
    position: relative;
  }

  .header__icon::before {
    position: absolute;
    content: "";
    bottom: 0px;
    width: 40px;
    height: 40px;
    background-image: url(../assets/Icon.svg);
    left: -50px;
  }
</style>
