const bcrypt = require('bcrypt');
const User = require('../models/User');


// ფუნქცია ქმნის ახალ მომხარებელს 
// მონაცემტა ბაზის შესაბამის კოლექციაში
async function createNewUser(userData) {
    try {

            // ამოწმებს მეილი არის თუ არა ბაზაში
            // თუ უკვე არის რეგისტრირებული აბრუნებს ("Email already exists");
            const existingUser = await User.findOne({ email: userData.email });
                if (existingUser) { throw new Error("Email already exists"); }

                // ხდება მომხმარებლის მიერ შეყვანილი პაროლის დაშიფვრა ჰეშირება 
                //მონაცემების გაჟონვის თავიდანნ ასაცილებლად
                const hashedPassword = await bcrypt.hash(userData.password, 10);

                    // იქმნებ ახალი მომხმარებლის იბიექტი
                    const newUser = new User({
                        name: userData.name,
                        lastname: userData.lastname,
                        email: userData.email,
                        phone: userData.phone,
                        password: hashedPassword,
                        address: userData.address,
                        products: []
                    });

                        // ობიექტი ინახება მონაცემთა ბაზაში
                        await newUser.save();

            return newUser;
        } 
    catch (error) { throw error; }
}

module.exports = createNewUser;
