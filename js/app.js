new Vue({
    el: '#app',
    data: {
        isShowingCart: false,

        cart: {
            items: []
        },

        products: [
            {
                id: 1,
                name: 'Mario',
                description: 'Sos de rosii, ulei de masline, brinza Mozzarella, piept de pui, cascaval, sos de  pizza, busuioc, gogosari.',
                price: 8,
                inStock: 500
            },
            {
                id: 2,
                name: 'Barbeque',
                description: 'Bacon, piept de pui, salami, brinza Mozzarella, gogosari, sos de  pizza, busuioc, sos barbeque, ule de masline ',
                price: 8,
                inStock: 500
            },
            {
                id: 3,
                name: 'Siciliana',
                description: 'Branza mozzarella, jambon de “tambov”,ciuperci coapte, anghinare coapte, masline kalamata, sos de pizza',
                price: 9,
                inStock: 520
            },
            {
                id: 4,
                name: 'Pepperone',
                description: 'Brinza mozzarella, salam, piper iute rosu macinat, paprica, sos de pizza, busuioc, ulei de masline',
                price: 8,
                inStock: 420
            },
            {
                id: 5,
                name: 'Rancho',
                description: 'Brinza mozzarella, ardei iute, gogoșari, ciuperci proaspete, masline verzi, salami, sos de pizza, busuioc, ulei de masline.',
                price: 8,
                inStock: 480
            },
            {
                id: 6,
                name: 'Pesto',
                description: 'Sos de tomate, dovlecei copti, vinete coapte, ardei dulce, sos pesto, mousse balsamic',
                price: 10,
                inStock: 81
            }
        ]
    },

    filters: {
        currency: function(value) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    },

    methods: {
        addProductToCart: function(product) {
            var cartItem = this.getCartItem(product);

            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }

            product.inStock--;
        },

        increaseQuantity: function(cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity: function(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart: function(cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        },

        checkout: function() {
            if (confirm('Are you sure that you want to purchase these products?')) {
                this.cart.items.forEach(function(item) {
                    item.product.inStock += item.quantity;
                });

                this.cart.items = [];
            }
        },

        getCartItem: function(product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        }
    },

    computed: {
        cartTotal: function() {
            var total = 0;

            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },

        taxAmount: function() {
            return ((this.cartTotal * 10) / 100);
        }
    }
});