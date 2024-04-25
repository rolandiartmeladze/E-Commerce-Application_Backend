
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
require('dotenv').config();
const ObjectId = require("mongoose").Types.ObjectId;

// Import utility functions
const createNewUser = require("./tools/CreateNewUser");
const createNewProduct = require("./tools/CreateNewProduct");

const link = 'mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/my-shop';

const app = express();
const PORT = process.env.PORT || 3001; 
const MONGODB_URI = process.env.MONGODB_URI || link ; 

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 


let Users;
let Products;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("Connected to MongoDB");
    app.listen(PORT, () => {console.log(`Backend server is running on port ${PORT}`);});
    Users = mongoose.connection.db.collection("users");
    Products = mongoose.connection.db.collection("products");
  })
  .catch(error => console.error("Error connecting to MongoDB:", error));


// Middleware to handle async errors
const asyncMiddleware = fn => (req, res, next) => {Promise.resolve(fn(req, res, next)).catch(next);};

// Define routes
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "public", "index.html"));});





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './media'); // Save files to the './media' directory
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); 
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });


// მოთხოვნა ინახავს მომხმარებლის მიერ არჩეულ ფოტოს ძირითად საქაღალდეში ./media

app.post('/upload', upload.single('image'), (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }
      console.log('File uploaded successfully:', req.file.originalname);
      res.status(200).json({ message: 'წარმატებით აიტვირთა' });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file' });
  }

});



// მოთხოვნა ამოწმებს ბაზაში არსბულ უნუკალურ მომხმარებლებს
  app.get("/Members", asyncMiddleware(async (req, res) => {
    const Members = await mongoose.connection.db.collection("users").find().toArray();
    res.status(200).json(Members);
  }));

    // მოთხოვნა ქმნის ახალ მომხმარებელს მონაცემტა ბაზაშე users კოლექციაში
      app.post("/register", asyncMiddleware(async (req, res) => {
        const newUser = await createNewUser(req.body);
        res.status(201).json(newUser);
      }));

        // მოთხოვნა ქმნის ახალ პროდუქტს შეყვანილი მონაცემების შესაბამისად
          app.post("/createProduct", asyncMiddleware(async (req, res) => {
            const newProduct = await createNewProduct(req.body);
            await mongoose.connection.db.collection("users").updateOne(
              { email: req.body.email },
              { $push: { products: newProduct._id } }
            );
            res.status(201).json(newProduct._id);
          }));



          // მომხმარებლის მიერ სასურველი პროდუქტტტის ფავრიტად მონიშვნა
          app.post("/FavoritProduct", asyncMiddleware(async (req, res) => {
            const userId = req.body.userId;
            const favoritsFromFrontend = req.body.favorits;

            const Member = await mongoose.connection.db.collection("users").findOne({ _id: new ObjectId(userId) });
            const favoritsFromBackend = Member.favorits;
            

            if(favoritsFromFrontend && favoritsFromFrontend.length >0){

            favoritsFromFrontend.forEach(element => {
                if (!favoritsFromBackend.includes(element)) {
                    favoritsFromBackend.push(element);
                }
            });
            
            for (let i = favoritsFromBackend.length - 1; i >= 0; i--) {
                if (!favoritsFromFrontend.includes(favoritsFromBackend[i])) {
                    favoritsFromBackend.splice(i, 1);
                }
            }
            
          }
            
            await mongoose.connection.db.collection("users").updateOne(
                { _id: new ObjectId(userId) },
                { $set: { favorits: favoritsFromBackend } }
            );
            
            res.status(200).json(favoritsFromBackend);
        
            console.log("Updated Favorits:", favoritsFromBackend);
        }));


            // ამოწმებს ბაზაში პროდუქტების არსებობას და აბრუნებს შესაბამის შედეგს
              app.get("/checkProducts", asyncMiddleware(async (req, res) => {
                const products = await mongoose.connection.db.collection("products").find().toArray();
                  if (products.length > 0) { res.status(200).json(products); } 
                    else { res.status(404).json({ message: "No products found" });}
              }));

                //  მოთხოვნა ამოწმებს მომხმარებლის მიერ საძიები ველში 
                //  შეყვანილ მონაცემებს ბაზაში არსებულ მონაცემებთან 
                // აბრუნებს დადებით შედეგს
                  app.get('/findProduct', asyncMiddleware(async (req, res) => {
                                  try {
                                      const findInput = req.query.FindInput; 
                                          if (!findInput) {return res.status(400).json({ error: 'Enter a search term' });}
                                      const products = await mongoose.connection.db.collection("products")
                                          .find({ "name": { $regex: findInput, $options: 'i' } }) 
                                          .toArray();
                                      res.status(200).json(products);
                                  } catch (error) {
                                      console.error('Error filtering products:', error);
                                      res.status(500).json({ error: 'Internal server error' });
                                  }
                          }));

                    // ამოწმებს მომხმარებლის მიერ შეყვანილ მეილსა და პაროლს ბაზაში არსებულ მონაცემებთან 
                    //აბრუნებს მომხმარებლის მონაცმებს და ქმნის შესაბამის ნონაცემებს ლოკალურ მეხსიერებაში
                      app.post('/login', async (req, res) => {
                        const { email, password } = req.body;
                        try {
                          const user = await mongoose.connection.db.collection("users").findOne({ email });
                          const passwordMatch = await bcrypt.compare(password, user.password);
                          if (!user || !passwordMatch) { return res.status(401).json({ message: 'Invalid email or password' }); }
                          res.json({ user });
                        } catch (error) {
                          console.error('Login error:', error);
                          res.status(500).json({ message: "Internal Server Error" });
                        }
                      });

                        // მოთხოვნა ამოწმებს და აბრუნებს ავტორიზებულ მომხარებელს
                            app.get('/user', asyncMiddleware(async (req, res) => {
                                const token = req.query.token; 
                                if (!token) {return res.status(401).json({ message: 'Token is required' });}
                              try {                            
                                const user = await mongoose.connection.db.collection("users").find().toArray();
                                    const activeUser = user.find(activ => activ._id.equals(token)); 
                                      if (!user) {return res.status(404).json({ message: 'User not found' });}
                                      res.json(activeUser);
                              } catch (error) {
                                  console.error('Error retrieving user data:', error);
                                  res.status(500).json({ message: 'Internal server error' });
                              }
                            }));


                            // კატეგორიების მიხედვით გაფილტვრა
                            app.get('/sortedcategory', asyncMiddleware(async (req, res) => {
                                try {
                                  const category = req.query.category;
                                  const sortedProducts = await mongoose.connection.db.collection("products")
                                        .find({ "category": category })
                                        .toArray();

                                  if (sortedProducts.length === 0) {
                                    return res.status(404).json({ error: 'No products found for the given category' });
                                  }
                                
                                  res.json(sortedProducts);

                                } catch (error) {
                                  console.log('not found')
                                }
                            }));

                                // პროდუქტის მნახველთა რადენობის განახლება

                                app.post('/updateView/:id', asyncMiddleware(async (req, res) => {
                                        try {
                                          const productId = req.params.id;
                                          const product = await Products.updateOne(
                                            { _id: new ObjectId(productId) },
                                            { $inc: { view: 1 } }
                                        );

                                        const viewProduct = await Products.findOne({ _id: new ObjectId(productId) });


                                          res.json(viewProduct);
                                        } catch (error) {
                                            res.status(500).send(error).json()
                                        }

                                }))


                                
                      
                      
                                    // ეს მოთხოვნა აბრინებს მონაცემთა ბაზიდან მომხმარებლის მიერ 
                                    // კალათაში დამატებულ პროდუცტებს
                                app.post('/checkCartItems', asyncMiddleware(async (req, res) =>{
                                    try {
                                        const incart = req.body.incart;

                                      const product = await Products.find().toArray();
                                      const productsInCart = product.filter(item => incart.includes(String(item._id)));

                                      console.log(productsInCart);
                                      
                                      res.json(productsInCart);

                                    } catch (error) {
                                      
                                    }
                                }))


                                      // ეს მოთხოვნა ანახლებს მომხმარებლის მიერ პროდუქტის კალათაში დამატებას 
                                      //ან დამატებული პროდუცტის კალათიდან წაშლას
                                  app.post('/addCarItem/:id', asyncMiddleware(async (req, res) => {
                                    try {                                    
                                      const userID = req.params.id;
                                      const productID = req.body.itemId;

                                     const user = await Users.findOne({ _id: new ObjectId(userID) });

                                      if (user.incart) { 
                                          const index = user.incart.indexOf(productID);
                                        if (index === -1) { 
                                          await Users.updateOne(
                                            { _id: new ObjectId(userID) }, 
                                            { $push: { incart: productID } }
                                          ); 
                                        } else { 
                                            await Users.updateOne(
                                              { _id: new ObjectId(userID) }, 
                                              { $pull: { incart: productID } }
                                            ); 
                                          }
                                      } else { 
                                          await Users.updateOne(
                                            { _id: new ObjectId(userID) }, 
                                            { $set: { incart: [productID] } }
                                          ); 
                                        }
                                            const updateduser = await Users.findOne({_id : new ObjectId(userID)});
                                            const updatedincart = updateduser.incart;

                                     res.json(updatedincart);

                                    } catch (error) {
                                      
                                    }
                                  }))

// Catch-all route for handling undefined routes
app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "public", "index.html"));});

  // Error handling middleware
  app.use((err, req, res, next) => { console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });});

