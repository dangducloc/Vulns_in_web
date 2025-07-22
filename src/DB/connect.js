require('dotenv').config();
const mysql = require('mysql2');

// Variables for pool
const host = process.env.DB_HOST || "mysql";
const user = process.env.DB_USER || "root";
const db = process.env.DB_NAME || "LINUS_OSS";
const pass = process.env.DB_PASS || "linh";

// Create the pool for connection to database

const pool = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: db
}).promise();

// Main functions for api

// Get all cakes
async function get_all_cakes(pool) {
    const qr = `
	SELECT IDFood,Food,Price,TypeID,Amount,img_src,info_Detail,Type 
	FROM food JOIN type_of_food 
	ON TypeID = type_of_food.IDType;`
    const [rs] = await pool.query(qr);
    return rs;
}

// Get cake by id 
async function get_cake(pool, id) {
    const qr = `
	SELECT IDFood,Food,Price,TypeID,Amount,img_src,info_Detail,Type 
	FROM food JOIN type_of_food 
	ON TypeID = type_of_food.IDType
	WHERE IDFood = ${id};`
    const [rs] = await pool.query(qr);
    return rs;
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Sign up
async function signUp(pool, name, pass, mail, tel) {
    const sql = "INSERT INTO user_table(User_name,Mail,Phone,Pass) VALUES (?,?,?,?)";
    const rs = await pool.query(sql, [name, mail, tel, pass]);
    return rs
    // console.log("inserted")
}

//Login 
async function Login(pool, name, pass) {
    const [rs] = await pool.query("SELECT * FROM user_table WHERE User_name = ? AND Pass = ?", [name, pass]);
    return rs[0];
}
////////////////////////////////////////Cart functions////////////////////////////////////////////////


//Check if item in cart
async function checkItemInCart(pool, userID, foodID) {
    const query = `
        SELECT * FROM cart
        WHERE UserID = ? AND IDFood = ?;
    `;
    const [rows] = await pool.query(query, [userID, foodID]);
    return rows.length > 0 ? rows[0] : null; // Return the item if found, otherwise null
}

//Add to card
async function addCart(pool, userID, foodID) {
    try {
        // Use the helper function to check if the item is already in the cart
        const existingItem = await checkItemInCart(pool, userID, foodID);
        let quantity = 1; // Default quantity when adding a new item
        let arr_Food = await get_all_cakes(pool); // Get all cakes
        let foodItem = arr_Food.find(item => item.IDFood === foodID); // Get food item by ID

        if (!foodItem) {
            throw new Error(`Food with ID ${foodID} not found`);
        }

        let price = foodItem.Price; // Get price from the selected food item
        let total = price * quantity; // Calculate total

        if (!existingItem) {
            // Item not in cart, insert new item
            const insertCartQuery = `
                INSERT INTO cart (UserID, IDFood, Amount, Price, Total)
                VALUES (?, ?, ?, ?, ?)
            `;
            await pool.query(insertCartQuery, [userID, foodID, quantity, price, total]);
            return { status: 'added', userID, foodID, quantity, price, total };
        } else {
            // Item exists in cart, update the quantity
            quantity = existingItem.Amount + 1;
            total = price * quantity;

            const updateCartQuery = `
                UPDATE cart 
                SET Amount = ?, Total = ?
                WHERE UserID = ? AND IDFood = ?
            `;
            await pool.query(updateCartQuery, [quantity, total, userID, foodID]);
            return { status: 'updated', userID, foodID, quantity, price, total };
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { status: 'error', message: 'An error occurred while adding to the cart.', error };
    }
}

//remove item from cart 
async function rm_itemFromCart(pool, iduser, idfood) {
    try {
        // Use the helper function to check if the item exists in the cart
        const existingItem = await checkItemInCart(pool, iduser, idfood);

        if (!existingItem) {
            return { status: 'not_found', message: `Item with food ID ${idfood} for user ${iduser} not found in cart.` };
        }

        // Item exists, proceed with deletion
        const deleteQuery = `
            DELETE FROM cart 
            WHERE UserID = ? AND IDFood = ?;
        `;
        await pool.query(deleteQuery, [iduser, idfood]);

        return { status: 'deleted', message: `Item with food ID ${idfood} has been removed from the cart.` };
    } catch (error) {
        console.error('Error deleting from cart:', error);
        return { status: 'error', message: 'An error occurred while deleting the item from the cart.', error };
    }
}

//Update item amount
async function updateItem(pool, userID, foodID, quantity) {
    try {
        // Check if the item exists in the cart
        const existingItem = await checkItemInCart(pool, userID, foodID);

        if (!existingItem) {
            return { status: 'not_found', message: `Item with food ID ${foodID} for user ${userID} not found in cart.` };
        }

        // Get the price of the food item
        const price = existingItem.Price;

        // Calculate the total
        const total = price * quantity;

        // Prepare the update query
        const updateQuery = `
            UPDATE cart 
            SET Amount = ?, Total = ? 
            WHERE UserID = ? AND IDFood = ?;
        `;

        const values = [quantity, total, userID, foodID];

        // Execute the update query
        await pool.query(updateQuery, values);

        return { status: 'updated', userID, foodID, quantity, price, total };
    } catch (error) {
        console.error('Error updating item in cart:', error);
        return { status: 'error', message: 'An error occurred while updating the item in the cart.', error };
    }
}

async function getCart(pool, idUser) {
    const sql = `
        SELECT 
            cart.UserID,
            food.Food,
            cart.IDFood,
            cart.Price,
            food.amount AS left_amount,
            cart.Amount,
            food.img_src,
            Type,
            (cart.Amount * cart.Price) AS Total
        FROM cart INNER JOIN food 
        ON cart.IDFood = food.IDFood
        INNER JOIN user_table 
        ON cart.UserID = user_table.IDUser
        INNER JOIN type_of_food 
        ON food.TypeID = type_of_food.IDType
        WHERE cart.UserID = ?;
    `;

    try {
        const [results] = await pool.query(sql, [idUser]);
        return results;
    } catch (error) {
        console.error('Error retrieving cart:', error);
        throw new Error('Failed to retrieve cart data');
    }
}
///////////////////////////////Comments functions////////////////////////////////

//get Comments via cakeid
async function showComments(pool, foodId) {
    try {
        const query = `
        SELECT 
            comment.idBL, 
            comment.IDUser, 
            comment.IDFood, 
            user_table.User_name, 
            food.Food, 
            comment.Comment, 
            comment.Date 
        FROM 
            comment 
        INNER JOIN 
            food ON comment.IDFood = food.IDFood 
        INNER JOIN 
            user_table ON comment.IDUser = user_table.IDUser 
        WHERE 
            comment.IDFood = ?
        ORDER BY 
            comment.Date DESC;
        `;

        const [results] = await pool.query(query, [foodId]);

        // Check if any comments exist for the given foodId
        if (results.length === 0) {
            return { success: false, message: "No comments found for this food." };
        }

        return { success: true, comments: results };

    } catch (error) {
        // Handle any errors that may occur during the query
        return { success: false, message: `Error retrieving comments: ${error.message}` };
    }
}


//post comments
async function postComment(pool, userId, foodId, commentText) {
    try {
        // Input validation to avoid SQL injection or invalid inputs
        if (!userId || !foodId || !commentText || commentText.trim() === "") {
            throw new Error("Invalid input. Please provide valid user ID, food ID, and comment.");
        }

        const query = `
        INSERT INTO comment(IDUser, IDFood, Comment) 
        VALUES (?, ?, ?);`;

        const values = [userId, foodId, commentText];

        // Execute the query
        const [result] = await pool.query(query, values);

        // Return success message
        return {
            success: true,
            message: 'Comment posted successfully.',
            commentId: result.insertId // Return the ID of the newly inserted comment if needed
        };
    } catch (error) {
        // Error handling for database or input issues
        return {
            success: false,
            message: `Failed to post comment: ${error.message}`
        };
    }
}

async function deleteComment(pool, idComment) {
    const del = `DELETE FROM comment WHERE idBL = ?;`;
    try {
        const [result] = await pool.query(del, [idComment]);
        return result;
    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
}

async function checkOut(pool, idUser, address, payment) {
    try {
        // Validate inputs
        const validPayments = ['Credit Card', 'Debit Card', 'Cash'];
        if (!idUser || !address || !payment) {
            return { error: true, msg: "User ID, address, and payment method are required." };
        }

        if (!validPayments.includes(payment)) {
            return { error: true, msg: "Payment must be Credit/Debit Card or Cash." };
        }

        // Fetch cart details by user ID
        const cartData = await getCart(pool, idUser);
        if (!cartData || cartData.length === 0) {
            return { error: true, msg: "Your cart is empty!" };
        }

        // Prepare cart data for insertion
        const cartItems = cartData.map(item => ({
            IDFood: item.IDFood,
            Amount: item.Amount,
            Price: item.Price
        }));

        // Insert into the general order information table and retrieve the order ID
        const insertGeneralQuery = `INSERT INTO general_info_order (IDUser, Address, Payment) VALUES (?,?,?)`;
        const [generalResult] = await pool.query(insertGeneralQuery, [idUser, address, payment]);
        const orderId = generalResult.insertId;

        // Prepare the order details data for bulk insertion
        const orderDetails = cartItems.map(item => [orderId, item.IDFood, item.Amount, item.Price]);

        // Insert order details into the database
        const insertDetailQuery = `INSERT INTO order_detail (IDOrder, IDFood, Amount, Price) VALUES ?`;
        await pool.query(insertDetailQuery, [orderDetails]);

        // Clear the user's cart after successful order placement
        await pool.query(`DELETE FROM cart WHERE UserID = ?`, [idUser]);

        return { success: true, msg: "Order placed successfully!" };
    } catch (error) {
        // Return a meaningful error message in case of failure
        return { error: true, msg: "Error processing checkout.", details: error.message };
    }
}



module.exports = {
    pool,
    get_all_cakes,
    get_cake,
    //login and signup
    Login,
    signUp,
    //cart 
    addCart,
    rm_itemFromCart,
    updateItem,
    getCart,
    //comments
    postComment,
    showComments,
    deleteComment,
    //checkOut
    checkOut,
};
