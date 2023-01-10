<template>
    <div class="page-category">
        <div class="columns is-12">
            <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
            <ProductBox v-for="product in category.products" v-bind:key="product.id" v-bind:product="product" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from "bulma-toast";
import ProductBox from '@/components/ProductBox.vue';
export default {
    name: "Category",
    components: {
        ProductBox
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name == "Category") {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categoryId = this.$route.params.category_id
            this.$store.commit('setIsLoading', true)
            await axios.get(`/api/category/${categoryId}/`).then(response => {
                this.category = response.data
                document.title = this.category.name + " | Tento Shop"

            }).catch(error => {
                console.log(error)
                toast({
                    message: "Somthing went wrong, Please try again.",
                    type: "is-danger",
                    dismissable: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'buttom-right'
                })
            })
            this.$store.commit('setIsLoading', false)

        }
    }
}
</script>