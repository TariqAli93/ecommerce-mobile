<template>
<MainLayout :toolbar="true" :backbutton="true" :navigation="true" :search="false" className="profile" title="الملف الشخصي">
    <div class="profile--body">
        <div class="profile--body--tabs">
            <ul>
                <li><button class="active" data-target="myInfo"><i class="im im-user-male"></i> <span>معلوماتي</span></button></li>
                <li><button data-target="myProducts"><i class="im im-shopping-cart"></i> <span>منتجاتي</span></button></li>
            </ul>
        </div>

        <div class="profile--body--content">
            <div class="profile--body--content--tab active" id="myInfo">
                <ul>
                    <li v-for="i in 6" :key="i">
                        <span>البريد الالكتروني: </span>
                        <span>tariqali9300@gmail.com</span>
                    </li>
                </ul>
            </div>

            <div class="profile--body--content--tab" id="myProducts">
                <ul>
                    <li v-for="i in 6" :key="i">
                        <span>منتجاتي: </span>
                        <span>tariqali9300@gmail.com</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</MainLayout>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            products: []
        }
    },

    mounted() {
        this.tabs();
    },
    methods: {
        tabs() {
            let tab = document.querySelectorAll('.profile--body--tabs ul li button');
            let tabContent = document.querySelectorAll('.profile--body--content--tab');
            let activeTab = '';
            tab.forEach((elem, index) => {
                elem.addEventListener('click', (e) => {
                    tab.forEach(element => {
                        element.classList.remove('active');
                    });

                    elem.classList.add('active');
                    activeTab = elem.getAttribute('data-target');

                    tabContent.forEach(tabElem => {
                        tabElem.classList.remove('active');
                    });

                    document.getElementById(activeTab).classList.add('active');
                });
            });
        }
    },
}
</script>

<style lang="scss">
@import '../variables.scss';

.page--profile {
    margin-bottom: 90px;
}

.profile {
    margin-bottom: 90px;

    &--body {
        &--tabs {
            display: block;
            padding: 0;
            background: $secondary;

            ul {
                display: flex;
                align-items: center;
                justify-content: center;

                li {
                    width: 100%;
                    display: flex;
                    align-items: stretch;
                    justify-content: stretch;
                    flex: 0 0 50%;
                    padding: 0 10px;

                    button {
                        display: flex;
                        width: 100%;
                        align-items: center;
                        justify-content: center;
                        padding: 10px 0px;
                        border: none;
                        outline: none;
                        box-shadow: none;
                        background: transparent;
                        border-radius: 0px;
                        color: $primary;
                        position: relative;

                        i {
                            margin-left: 10px;
                        }

                        &:before {
                            content: "";
                            position: absolute;
                            width: 0%;
                            height: 2px;
                            background: $primary;
                            bottom: 0;
                            right: 0;
                            left: 0;
                            margin: 0 auto;
                            visibility: hidden;
                            opacity: 0;
                            transition: all ease-in-out 300ms;
                        }

                        &.active {
                            &:before {
                                content: "";
                                width: 100%;
                                visibility: visible;
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }

        &--content {
            display: block;

            &--tab {
                display: none;

                &.active {
                    display: block;
                }

                ul {
                    display: block;

                    li {
                        &:not(:last-child) {
                            border-bottom: 1px solid rgba(black, .10);
                        }

                        padding: 20px 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
}
</style>
