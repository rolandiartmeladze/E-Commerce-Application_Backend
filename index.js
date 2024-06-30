const express = require("express");

const saleRoutes = require('./routes/saleRoutes');
const mainRoutes = require('./routes/mainRoutes');
const careRoutes = require('./routes/cartRoutes');
const sortRoutes = require('./routes/sortRoutes');
const findRoutes = require('./routes/findRoutes');
const jurnalRoutes = require('./routes/jurnalRoutes');

const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const crypto = require('crypto');
const transporter = require('./tools/emailConfig');



// const multer = require("multer");
// const fs = require("fs");
require('dotenv').config();
const ObjectId = require("mongoose").Types.ObjectId;

// Import utility functions
const createNewUser = require("./tools/CreateNewUser");
const createNewProduct = require("./tools/CreateNewProduct");
const { find } = require("./models/User");
const User = require("./models/User");

const link = 'mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/my-shop';

const app = express();
const PORT = process.env.PORT || 3001; 
const MONGODB_URI = process.env.MONGODB_URI || link ; 

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); 


const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};






app.post('/verifi', asyncMiddleware(async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body

    // Generate a 4-digit verification code
    const verificationCode = crypto.randomBytes(2).toString('hex').toUpperCase();

    // Set up mail options
    const mailOptions = {
      from: 'rartmeladze@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is ${verificationCode}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent to: ${email}`);
    res.status(200).json({ message: 'Verification email sent.' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ message: 'Failed to send verification email.' });
  }
}));








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

  app.use('/api', saleRoutes);
  app.use('/api', mainRoutes);
  app.use('/api', careRoutes);
  app.use('/api', sortRoutes);
  app.use('/api', findRoutes);
  app.use('/api', jurnalRoutes);
  


// Define routes
app.get("/", (req, res) => {res.sendFile(path.join(__dirname, "public", "index.html"));});


app.post('/addImage/:id', asyncMiddleware(async (req, res) => {
  try {
    const productId = req.params.id;
    const array = req.body;
    const product = await Products.updateOne(
      { _id: new ObjectId(productId) },
      { $push: { image: { $each: array } } }
      );

  const viewProduct = await Products.findOne({ _id: new ObjectId(productId) });


    res.json(viewProduct);
  } catch (error) {
      res.status(500).send(error).json()
  }

}));


// მოთხოვნა ამოწმებს ბაზაში არსბულ უნუკალურ მომხმარებლებს
  app.get("/Members", asyncMiddleware(async (req, res) => {
    const Members = await Users.find().toArray();
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
        await Users.updateOne(
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
const products = await Products.find().toArray();
if (products.length > 0) { res.status(200).json(products); } 
else { res.status(404).json({ message: "No products found" });}
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

app.post('/updateView/:id', asyncMiddleware(async (req, res) => {
    try {
      const productId = req.params.id;
          const product = await Products.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { view: 1 } }
          );
        const viewProduct = await Products.findOne({ _id: new ObjectId(productId) });
      res.json(viewProduct);
    } catch (error) {res.status(500).send(error).json()}
}))

app.post('/checkCartItems', asyncMiddleware(async (req, res) =>{
    try {
        const incart = req.body.incart;
        const product = await Products.find().toArray();
        const productsInCart = product.filter(item => incart.includes(String(item._id)));
      res.json(productsInCart);
    } catch (error) {}
}))




app.get('/MyInfo/:id', asyncMiddleware(async (req, res) => {
  const id = new ObjectId(req.params.id);

  try {
      const myInfo = await Users.findOne({ _id: id });
      if (!myInfo) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(myInfo);
  } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}));


app.post('/UpdateProfile/:id', asyncMiddleware(async (req, res) => {
  const id = new ObjectId(req.params.id);
  const avatarName = req.body.AvatarName;

  try {
    const MY = await Users.updateOne({ _id: id }, { $set: { avatar: [avatarName] } });
    
    const updated = await Users.findOne({ _id: id });
    
    console.log(updated);
  } catch (error) {
    
  }

}));


app.post('/favoriteItem/:id', asyncMiddleware(async (req, res) => {
  const userID = new ObjectId(req.params.id);
  const productID = req.body.itemId;

  const check = { _id: userID };

  try {
      const user = await Users.findOne(check);
      const favorites = user.favorites;

      if (favorites) {
          const index = favorites.indexOf(productID);
          if (index === -1) {
              await Users.updateOne(check, { $push: { favorites: productID } });
          } else {
              await Users.updateOne(check, { $pull: { favorites: productID } });
          }
      } else {
          await Users.updateOne(check, { $set: { favorites: [productID] } });
      }

      const result = await Users.findOne(check);
      const updatedFavorites = result.favorites;
      res.json(updatedFavorites);
      console.log(updatedFavorites);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}));


// app.post('/verifimeil', asyncMiddleware(async (req, res) =>{
//     try {
//       const { email } = req.body;
//       console.log(email);
   
//       res.status(200).json({ message: 'Email received successfully' });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// }));


// app.get('/salejurnal/:id', asyncMiddleware(async (req, res)=>{

//       try {
//         const query = req.query.sort;
//         const userId = new ObjectId(req.params.id);
//         const user = await Users.findOne({ _id: userId });
//         const time = new Date();

//         if( query === "All"){
//           if (user && Array.isArray(user.SalesJournal)) { 
//               user.SalesJournal.sort((a, b) => new Date(b.time) - new Date(a.time)); 
//             }
//            res.json(user.SalesJournal); 
//          } 

//             if( query === "day"){
//               time.setHours(0, 0, 0, 0);
//                 const todaySales = user.SalesJournal.filter(entry => {
//                   const entryDate = new Date(entry.time);
//                   return entryDate >= time;
//                 });
//               res.json(todaySales);

//              }

//           if( query === "week"){
//                 time.setDate(time.getDate() - 7);
//                 time.setHours(0, 0, 0, 0); 

//             const weekSale = user.SalesJournal.filter(entry => {
//                 const entryDate = new Date(entry.time);
//                 return entryDate >= time;
//             });

//             res.json(weekSale);
//           }

//         if( query === "month"){
//               time.setMonth(time.getMonth() - 1);
//               time.setHours(0, 0, 0, 0);
//             const monthSale = user.SalesJournal.filter(entry => {
//               const entryDate = new Date(entry.time);
//               return entryDate >= time;
//             });
//           res.json(monthSale);            
//         }
//       }  
//         catch (error) {
//           console.error('Error fetching user:', error);
//           res.status(500).json({ message: 'Internal server error' });
//         }
// }));

app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "public", "index.html"));});
  app.use((err, req, res, next) => { console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });});
