const express = require('express')
const router = express.Router()

// import db connection
const connection = require('../config/db');

router.get('/', (req,res)=>{
    return res.status(200).json({ message: 'API Calling.....' });
})

// table creation query 

// CREATE TABLE product (
//     product_id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(200),
//     price FLOAT,
//     image TEXT
// );

// CREATE TABLE cart (
//     cart_id INT AUTO_INCREMENT PRIMARY KEY,
//     product_id INT,
//     title VARCHAR(200),
//     price FLOAT,
//     image TEXT,
//     quantity INT DEFAULT 1
// );



// product Add to cart 
router.post("/addtocart", async (req, res) => {
    const { product_id, title, price, image } = req.body;

    try {
        // Check if product is already in cart
        const [existing] = await connection.execute(
            "SELECT * FROM cart WHERE product_id = ?",
            [product_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ success: false, message: "Product already in cart" });
        }

        // Insert into cart table
        const insertQuery = `
            INSERT INTO cart (product_id, title, price, image)
            VALUES (?, ?, ?, ?)
        `;
        await connection.execute(insertQuery, [product_id, title, price, image]);

        res.status(201).json({ success: true, message: "Product added to cart" });

    } catch (err) {
        console.error("Insert Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get("/cart", async (req, res) => {
  try {
    const [result] = await connection.execute("SELECT * FROM cart");
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// Delete Product 

router.delete('/delete/:id', async (req, res)=>{
    try{
        var id = req.params.id

        var sql = `delete from cart where cart_id = ${id}`

        const result = await connection.execute(sql)

        return res.status(200).json({ message: "Product Deleted...", success: true });

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error...", success: false });
    }

})




module.exports = router;