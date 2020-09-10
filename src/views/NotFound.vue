<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="true" title="404" className="404" :search="false">
    <div class="empty">
        <img src="../assets/images/empty-bag-bg.png" />
        <span>لم يتم العثور على هذه الصفحة</span>
        <router-link tag="button" to="/">
            <span>العودة الى الرئيسية</span>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
            </svg>
        </router-link>
    </div>
</MainLayout>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../variables.scss';

.page--404 {
  height: calc(100vh - 100px);

  .page--content {
    height: 100%;
  }
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    padding: 20px;

    img {
        display: block;
        width: 100%;
    }

    span {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: $primary;
        text-align: center;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 3px;
        border: none;
        outline: none;
        box-shadow: none;
        background: transparent;

        span {
            font-size: 13px;
            color: $primary;
        }

        svg {
            fill: $primary;
        }
    }
}
</style>
