// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');

// const axios = require('axios');


// // const router = express.Router();
// const bcrypt = require("bcrypt");


// const createNewUser = require('./tools/CreateNewUser');
// const createNewProduct = require('./tools/CreateNewProduct');



// const { MongoClient } = require('mongodb');

// const { ObjectId } = mongoose.Types;

// const objectId = new ObjectId();
// const { userInfo } = require('os');

// const app = express();
// const PORT = process.env.PORT || 80;

//         //mongosse atlas base link
//         const basalink = "mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/";
            
// const basename = "TestUserBataBase";


// // const basalink = "You Bata Base link";

// const uri = basalink + basename;

// const newbase = basalink + ('my-shop');






// const asyncMiddleware = fn => (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); };


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// app.use(express.static(path.join(__dirname, '../public')));








///////////////////////////////////////////////
// _______________________________
// აქამდე


// app.use(express.static(path.join(__dirname, '../')));





// const addnewuser = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // const withMongoClient = async (handler) => {
    //     try {
    //         await client.connect();
    //         await handler(client);
    //     } catch (error) {
    //         console.error('Error with MongoDB client:', error);
    //         // You can choose how to handle errors here, like sending an error response
    //         res.status(500).json({ message: 'Internal server error' });
    //     } finally {
    //         await client.close();
    //     }
    // };



    




                // app.get('/checkAdvance', asyncMiddleware(async (req, res) => {
                //     withMongoClient(async (client) => {
                //     const Advance = await client.db("maininfo").collection("advance").find().toArray();
                //         if(Advance){res.status(200).json(Advance); 
                //             console.log(Advance[0].more);                    
                //             console.log(Advance[0].basice);                    
                //         }
                //         else { res.status(404).json({ message: 'No Advance found' });}
                //     })

                // }));



        // ეს მოთხოვნა ქმნის ახალ პროდუქტს მონაცემთა ბაზაში => products 
        // შეყვანილი მონაცემებისა და უნიკალური -Id იდენტიფიკატორიტ.
        // app.post('/create', asyncMiddleware(async (req, res) => {

        //     withMongoClient(async (client) => {
        //                 const newUser = req.body;
        //                 const result = await client.db("TestUserBataBase").collection("products").insertOne(newUser);
        //                 console.log(`New user created with the following id: ${result.insertedId}`);
        //                 const user = await client.db("TestUserBataBase").collection("products").findOne({ _id: result.insertedId });
        //                 console.log("New user created:", user);
        //                 res.status(200).json({ message: 'დაემატა მომხმარებელი', user });
        //             });

        // }));



        // ფუნქცია აბრუნებს ბაზაში არსებული პროდუქტების სიას
        // გვერდის ჩატვირთვის ან მონაცემების განახლების შემთხვევაში

        // app.get('/checkProducts', asyncMiddleware(async (req, res) => {

        //     withMongoClient(async (client) => {
        //     const products = await client.db("TestUserBataBase").collection("products").find().toArray();
        //         if (products.length > 0) {res.status(200).json(products);} 
        //         else {res.status(404).json({ message: 'No users found' });}
        //     }) 

        // }));

        //add news

        // ძიების ფუნქცია იღებს მოხმარებლის მიერ შეყვანილს საძიებო სიტყვას 
        // აბრუნებს შედებს მონაცემთაბ ბაზიდან თუ პროდუქტის სახელი დაემთხვევა
        // მომხმარებლის მიერ შეყვანილ მონაცემებს

        // app.get('/findProduct', asyncMiddleware(async (req, res) => {

        //     withMongoClient(async (client) => {
        //         try {
        //             const findInput = req.query.FindInput; 

        //                 if (!findInput) {return res.status(400).json({ error: 'Enter a search term' });}

        //             const products = await client.db("TestUserBataBase").collection("products")
        //                 .find({ "Name": { $regex: findInput, $options: 'i' } }) 
        //                 .toArray();

        //             res.status(200).json(products);
        //         } catch (error) {
        //             console.error('Error filtering products:', error);
        //             res.status(500).json({ error: 'Internal server error' });
        //         }
        //     });

        // }));






    
        // app.put('/SaleProduct/:productId', async (req, res) => {
        //     const productId = req.params.productId;
        //     const newQuantity = req.query.newQuantity;
        //     try {
        //         // Update the product quantity
        //         await withMongoClient(async (client) => {
        //             const db = client.db(basename);
        //             const productsCollection = db.collection("products");
        //             const updatedProduct = await productsCollection.findOneAndUpdate(
        //                 { _id: ObjectId(productId) },
        //                 { $set: { quantity: parseInt(newQuantity) } },
        //                 { returnOriginal: false }
        //             );
        //             res.status(200).json(updatedProduct.value);
        //         });
        //     } catch (error) {
        //         console.error("Error handling request:", error);
        //         res.status(500).json({ error: 'Internal server error' });
        //     }
        // });
    

        // mongoose.connect(basalink, { useNewUrlParser: true, useUnifiedTopology: true })









//         mongoose.connect(newbase)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Your code here


//         app.post("/register", asyncMiddleware(async (req, res) => {
        
//                 try {

//                     const existingUser = await User.findOne({ email: req.body.email });
//                         if (existingUser) {
//                             return res.status(400).json({ message: "Email already exists" });
//                         }
//                         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         // Create new user
//         const newUser = new User({
//             name: req.body.name,
//             lastname: req.body.lastname,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: hashedPassword,
//             address: req.body.address
//         });
//         await newUser.save();
//         res.status(201).json( newUser );
//         console.log(newUser)
//                 } catch (error) {
//                     console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//                 }
//         }));

//     })
//     .catch((error) => {
//       console.error('Error connecting to MongoDB:', error);
//     });






////////////////////////////////////////////////////////////
// __________________________________________________________
// working



// const name = "my-shop";
// const linki = basalink + name;



//         mongoose.connect(linki, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => {console.log('Connected to MongoDB');
    
//                     //work
//                 app.post("/register", asyncMiddleware(async (req, res) => {
//                     try {
//                         const newUser = await createNewUser(req.body);
//                         res.status(201).json(newUser);
//                         console.log(newUser);
//                     } 
//                     catch (error) { console.error(error);
//                         if (error.message === "Email already exists") {res.status(400).json({ message: error.message });} 
//                         else {res.status(500).json({ message: "Internal Server Error" });}
//                     }
//                 }));
        

//                 app.post("/createProduct", asyncMiddleware(async (req, res) => {
//                     try {
//                         const NewProduct = await createNewProduct(req.body);
//                         res.status(201).json(NewProduct);
//                         console.log(NewProduct);
//                     } 
//                     catch (error) { console.error(error);
//                          res.status(500).json({ message: "Internal Server Error" });
//                     }
//                 }));



//                     //work 
//                 app.get('/Activeuser', asyncMiddleware(async (req, res) =>{

//                     try {
//                         const Advance = await mongoose.connection.db.collection("users").find().toArray();
//                         if(Advance){res.status(200).json(Advance[0]);}
//                     } 
//                     catch (error) { res.status(500).json({ message: "Internal Server Error" });}
//                  }));



//                  //work checked product
//                  app.get('/checkProducts', asyncMiddleware(async (req, res) => {
                    

//                     try {
//                         const products = await mongoose.connection.db.collection("products").find().toArray();
//                             if (products.length > 0) {res.status(200).json(products);} 
//                             else {res.status(404).json({ message: 'product not found' });}
//                     }
//                     catch (error) {res.status(500).json({ message: "Internal Server Error" });}
        
//                     }));
        
//             })
//             .catch((error) => {console.error('Error connecting to MongoDB:', error);});
    



// app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../public/index.html')); });

// app.listen(PORT, () => { console.log(`Backend server is running on port ${PORT}`); });











const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const createNewUser = require('./tools/CreateNewUser');
const createNewProduct = require('./tools/CreateNewProduct');

const app = express();
const PORT = process.env.PORT || 80;

const baselink = "mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/";
const basename = "TestUserBataBase";
const uri = baselink + basename;
const newbase = baselink + ('my-shop');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));

mongoose.connect(newbase, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    app.post("/register", async (req, res) => {
      try {
        const newUser = await createNewUser(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        if (error.message === "Email already exists") {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });

    app.post("/createProduct", async (req, res) => {
      try {
        const newProduct = await createNewProduct(req.body);
        res.status(201).json(newProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.get('/Activeuser', async (req, res) => {
      try {
        const users = await mongoose.connection.db.collection("users").find().toArray();
        if (users.length > 0) {
          res.status(200).json(users[0]);
        } else {
          res.status(404).json({ message: 'No active user found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.get('/checkProducts', async (req, res) => {
      try {
        const products = await mongoose.connection.db.collection("products").find().toArray();
        if (products.length > 0) {
          res.status(200).json(products);
        } else {
          res.status(404).json({ message: 'No products found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../'));
    });

    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
