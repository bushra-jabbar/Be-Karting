const mongoose = require('mongoose');
const Product = require('./models/Product');

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/kartingDB')
    .then(async () => {
        console.log("Connected to DB...");
        
        // Purana data saaf karna
        await Product.deleteMany({});

        // Professional Racing Data
        const racingProducts = [
            { name: "Arai GP-7 FRP", price: 950, category: "Gear", image: "arai.jpg", description: "Snell SA2020 rated professional racing helmet." },
            { name: "Alpinestars KMX-9 V2", price: 280, category: "Apparel", image: "suit.jpg", description: "Certified karting suit with advanced airflow." },
            { name: "Bridgestone YDS Tires", price: 220, category: "Tires", image: "tires.jpg", description: "Set of 4 high-grip slick tires for dry tracks." },
            { name: "Sparco Land Gloves", price: 95, category: "Gear", image: "gloves.jpg", description: "Suede palm for maximum steering wheel grip." },
            { name: "OMP KS-3 Shoes", price: 110, category: "Apparel", image: "shoes.jpg", description: "Lightweight karting shoes with thin sole for pedal feel." },
            { name: "Bell RS7 Carbon", price: 1200, category: "Gear", image: "bell.jpg", description: "Ultra-light carbon fiber helmet for F1 standards." },
            { name: "Mojo D2 Tires", price: 190, category: "Tires", image: "mojo.jpg", description: "Standard Rotax Max karting tires." },
            { name: "Tillett T11 Seat", price: 250, category: "Gear", image: "seat.jpg", description: "Rigid fiberglass racing seat for better handling." },
            { name: "MyChron 5S Dash", price: 550, category: "Gear", image: "mychron.jpg", description: "GPS lap timer and data logger for karting." },
            { name: "Bengio Bumper V2", price: 180, category: "Gear", image: "rib.jpg", description: "Hand-made rib protector for maximum safety." }
        ];

        await Product.insertMany(racingProducts);
        console.log("✅ 10 Professional Products Added Successfully!");
        process.exit();
    })
    .catch(err => console.log(err));