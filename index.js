const express = require('express');
const cors = require('cors');
const path = require('path');


const { MongoClient } = require('mongodb');
const { userInfo } = require('os');

const app = express();
const PORT = process.env.PORT || 80;

            // მონაცემთა ბაზის სახელი
            
const basename = "TestUserBataBase";

const basalink = "mongodb+srv://rartmeladze:rartmeladze@cluster0.ngnskbi.mongodb.net/";

// const basalink = "You Bata Base link";

const uri = basalink + basename;


                // ინსტანციის შექმნა : თქვენ ქმნით ახალ ეგზემპლარს MongoClientთქვენი MongoDB 
                // მონაცემთა ბაზის კავშირის URI-ის (Uniform Resource Identifier) ​​და ასევე 
                // ნებისმიერი არჩევითი კონფიგურაციის ვარიანტების მიწოდებით. 
                // კავშირის URI ჩვეულებრივ მოიცავს ისეთ დეტალებს, 
                // როგორიცაა ჰოსტი, პორტი, მომხმარებლის სახელი, 
                // პაროლი და მონაცემთა ბაზის სახელი.
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const asyncMiddleware = fn => (req, res, next) => { Promise.resolve(fn(req, res, next)).catch(next); };


// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, '..', '..')));






    const withMongoClient = async (handler) => {
        try {
            await client.connect();
            await handler(client);
        } catch (error) {
            console.error('Error with MongoDB client:', error);
            // You can choose how to handle errors here, like sending an error response
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await client.close();
        }
    };


    // ეს მოთქოვნა ქმნის ახალ პროდუქტს მონაცემთა ბაზაში products 
    // შეყვანილი მონაცემებისა და უნიკალური -Id იდენტიფიკატორიტ.
        app.post('/create', asyncMiddleware(async (req, res) => {

            withMongoClient(async (client) => {
                        const newUser = req.body;
                        const result = await client.db("TestUserBataBase").collection("products").insertOne(newUser);
                        console.log(`New user created with the following id: ${result.insertedId}`);
                        const user = await client.db("TestUserBataBase").collection("products").findOne({ _id: result.insertedId });
                        console.log("New user created:", user);
                        res.status(200).json({ message: 'დაემატა მომხმარებელი', user });
                    });
        


        }));



        // add basice advance info in defolt maininfo/advance

        app.post('/changeAdvance', asyncMiddleware(async (req, res) => {
            const dbName = "maininfo"; 
            const collectionName = "advance"; 
            

            withMongoClient(async (client) => {
                const AdvanceInfo = req.body;
                const database = client.db(dbName);
                const collection = database.collection(collectionName);
        
                const { insertedId } = await collection.insertOne(AdvanceInfo);
                console.log(`New advance information created with the following id: ${insertedId}`);
        
                const Advance = await collection.findOne({ _id: insertedId });
                console.log("New advance information created:", Advance);
        
                res.status(200).json({ message: 'დაემატა წინადადება', Advance });
            });
        }));
        








                // Handle PUT request to update user advance info
// app.put('/changeAdvance', asyncMiddleware(async (req, res) => {
//     const userId = req.params.id; 
//     const updatedInfo = req.body; 

//     withMongoClient(async (client) => {
//         try {
//             // Update user advance info in the database
//             const result = await client.db("TestUserBataBase").collection("UserAdvanceInfo")
//                 .updateOne({ _id: '65f9f25c89fc88a6d39f8d9f' }, { $set: updatedInfo });

//             if (result.modifiedCount === 0) {
//                 // If no user was updated, return a 404 error
//                 res.status(404).json({ message: 'User not found' });
//             } else {
//                 // If user was updated successfully, return success message and updated info
//                 const updatedAdvance = await client.db("TestUserBataBase").collection("UserAdvanceInfo")
//                     .findOne({ _id: userId });
//                 res.status(200).json({ message: 'User info updated successfully', updatedAdvance });
//             }
//         } catch (error) {
//             console.error('Error updating user info:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     });
// }));







        app.get('/checkAdvance', asyncMiddleware(async (req, res) => {
            withMongoClient(async (client) => {
            const Advance = await client.db("maininfo").collection("advance").find().toArray();
                if(Advance){res.status(200).json(Advance); 
                    console.log(Advance[0].more);                    
                    console.log(Advance[0].basice);                    
                }
                else { res.status(404).json({ message: 'No Advance found' });}
            })

        }));

        app.get('/checkProducts', asyncMiddleware(async (req, res) => {

            withMongoClient(async (client) => {
            const products = await client.db("TestUserBataBase").collection("products").find().toArray();
                if (products.length > 0) {res.status(200).json(products); 
                    // console.log(users) 
                } 
                else {res.status(404).json({ message: 'No users found' });}
            }) 

        }));


        

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', '..', 'index.html')); });

app.listen(PORT, () => { console.log(`Backend server is running on port ${PORT}`); });

