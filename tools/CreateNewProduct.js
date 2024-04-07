const Product = require('../models/Product');



// ფუნქცია ქმნის ახალ მომხარებელს 
// მონაცემტა ბაზის შესაბამის კოლექციაში

async function CreateNewProduct(productData) {
    try {
        const { name, email, phone, address, img, price, quantity, quantityiunit, location, owner, sale, view, currency } = productData;

        const imageArray = img.map((image, index) => ({
            url: image[`image/*${index}`]
        }));

        const newProduct = new Product({
            name: name,
            email: email,
            phone: phone,
            address: address,
            image: imageArray,
            price: price,
            quantity: quantity,
            quantityUnit: quantityiunit,
            location: location,
            owner: owner,
            sale: sale,
            view: view,
            currency: currency
        });

        await newProduct.save();


        
        return newProduct;
    } catch (error) {
        throw error;
    }
}

module.exports = CreateNewProduct;
