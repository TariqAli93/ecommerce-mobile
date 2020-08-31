<template>
  <v-app id="app">
    <main class="main">
      <div class="server-status" v-if="!isServerOnline">
        <img src="./assets/images/nowifi.png" />
        <h1>نعتذر عن هذا الخطأ</h1>
        <p>حدث خطأ في الاتصال بالخادم يرجى التحقق من اتصالك بالانترنت و المحاولة مرة اخرى</p>
        <v-btn color="secondary" depressed rounded large @click="$router.go('/')">
          <span>اعد المحاولة</span>
        </v-btn>
      </div>
      <router-view v-else></router-view>
    </main>
  </v-app>
</template>
<script>
  export default {
    data() {
      return {
        isServerOnline: true,
      }
    },

    mounted() {
      this.axios.get('products')
      .then(data => {
        this.isServerOnline = true;
      }).catch(err => {
        this.isServerOnline = false;
        console.error(err)
      });
    }
  }
</script>

<style lang="scss">
$secondary: #EB9486;
$primary:#272838;
.server-status {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $primary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $secondary;
  z-index: 2000000;
  text-align: center;

  h1 {
    text-align: center;
    margin-bottom: 10px;
    font-weight: 900;
  }

  p {
    display: block;
    text-align: center;
    margin-bottom: 10px;
    font-weight: 500;
  }

  img {
    display: block;
    max-width: 120px;
    margin-bottom: 10px;
  }

  span {
    color: $primary;
    font-weight: 300;
  }
}

</style>