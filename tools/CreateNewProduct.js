
const Product = require('../models/Product');


// ფუნქცია ქმნის ახალ მომხარებელს 
// მონაცემტა ბაზის შესაბამის კოლექციაში
async function CreateNewProduct(productData) {
    try {
                    // იქმნებ ახალი მომხმარებლის იბიექტი
                    const newProduct = new Product({
                        name: productData.name,
                        email: productData.email,
                        phone: productData.phone,
                        address: productData.address,
                        image: []
                    });

                        // ობიექტი ინახება მონაცემთა ბაზაში
                        await newProduct.save();

            return newProduct;
        } 
    catch (error) { throw error; }
}

module.exports = CreateNewProduct;
