

require('dotenv').config();

const uri = process.env.MONGODB_URI;
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const createNewUser = require('./tools/CreateNewUser');
const createNewProduct = require('./tools/CreateNewProduct');

const app = express();
const PORT = process.env.PORT || 80;

const baselink = "mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/";
const basename = "TestUserBataBase";
// const uri = baselink + ('my-shop');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../')));

const asyncMiddleware = fn => (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); };


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');


    app.get('/Activeuser', asyncMiddleware(async (req, res) => {
      try {
        const Advance = await mongoose.connection.db.collection("users").find().toArray();
        if(Advance){res.status(200).json(Advance);}
      } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Internal Server Error" });
            }
          }));




        // მოთხოვნა ქმნის ახალ მომხმარებელს მონაცემტა ბაზაშე users კოლექციაში
    app.post("/register", asyncMiddleware(async (req, res) => {
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
    }));

    // მოთხოვნა ქმნის ახალ პროდუქტს შეყვანილი მონაცემების შესაბამისად
    app.post("/createProduct", asyncMiddleware(async (req, res) => {
      try {
         const userid = req.body.userID;
        const newProduct = await createNewProduct(req.body);
          res.status(201).json(newProduct._id);


          if(newProduct){

            await mongoose.connection.db.collection("users").updateOne(
              { email: req.body.email },
              { $push: { products: newProduct._id } }
          );


          }

          console.log(newProduct._id);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }));



        // ამოწმებს ბაზაში პროდუქტების არსებობას და აბრუნებს შესაბამის შედეგს
    app.get('/checkProducts',asyncMiddleware(async (req, res) => {
      try {
        const products = await mongoose.connection.db.collection("products").find().toArray();
        if (products.length > 0) { res.status(200).json(products); } 
        else { res.status(404).json({ message: 'No products found' }); }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
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
