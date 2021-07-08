
app.component('product-display', {

    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="product-display">
        <div class="product-container">
            <div class="product-image" :disabled='!inStock':class="{disabledimage: !inStock}">
                <img :src="image">
            </div>
            <div class="product-info">
                <h1 >{{title}}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>
                <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle":style="{backgroundColor:variant.color}"></div>
                <p>   
                <button class=" button " :disabled='!inStock':class="{disabledButton: !inStock}" @click="addToCart ">Add to Cart</button>
                    
                        
                <button class=" button " :disabled='!inStock':class="{disabledButton: !inStock}" @click="DeleteToCart ">Delete to Cart</button>
                </p>       
                  
            </div>
        </div>
    </div>`
    ,
    data() {
        return {
            product: 'Shoes',
            brand: 'SE 331',
            inventory: 100,
            onSale: false,
            // details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ],
            activeClass: true,
            selectedVariant: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        DeleteToCart() {
            this.$emit('delete-to-cart', this.variants[this.selectedVariant].id)
        },
        updateImage(variantImage) {
            this.image = variantImage
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        updateonSale() {
            this.onSale = !this.onSale
            console.log(this.onSale)
        }
    },
    computed: {
        title() {
            if (this.variants[this.selectedVariant].quantity > 0) {
                return this.brand + ' ' + this.product + ' is on sale'
            } else {
                return this.brand + ' ' + this.product + ' is not on sale'
            }
        },
        titleonsale() {
            return this.brand + ' ' + this.product + ' is on sale'
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 30
        }
    }
})

app.component('product-detail', {
    props: {
        details: {
            type: Array,

        }
    },
    template:
        /*html*/
        `<ul>
            <li v-for="detail in showdetail">{{detail}}</li>
        </ul>`
    ,
    computed: {
        showdetail() {
            if (this.details) {
                return this.details
            }
        }
    }
})