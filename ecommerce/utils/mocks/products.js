    const productsMock = [
        {
        name: "Red shoes",
        price: "30",
        image:
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e44599932dce6b8440e26fb91e10a69&auto=format&fit=crop&w=800&q=60",
        tags: ["expensive", "brown"]
        },
        {
            name: "Black bike",
            price: "399",
            image:
                "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53d820e6622fadd53b8638d60f468ccd&auto=format&fit=crop&w=800&q=60",
            tags: ["white", "cheap"]
        }
    ];
    
    function filteredProductsMock(tag) {
        return productsMock.filter(product => product.tags.includes(tag));
    }
    
    class ProductsServiceMock {
        async getProducts() {
        return Promise.resolve(productsMock);
        }
    
        async createProduct() {
        return Promise.resolve("6bedb1267d1ca7f3053e2875");
        }
    }
    
    module.exports = {
        productsMock,
        filteredProductsMock,
        ProductsServiceMock
    };