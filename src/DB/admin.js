const pool = require("./connect").pool;

// get all user
async function getUsers() {
    const query = `SELECT IDUser, User_name, Mail, role FROM user_table;`;
    const [result] = await pool.query(query);
    return [result];
}

//delete user via id 
async function deleteUser(iduser) {
    const query = `DELETE FROM user_table WHERE IDUser = ?;`;
    const [result] = await pool.query(query,[iduser]);
    return result;
}

// update prive via id
async function changePrice(idfood, new_price) {
    try {
        const query = `UPDATE food SET Price = ? WHERE IDFood = ?`;
        const [result] = await pool.query(query, [new_price, idfood]);
        
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: `Price updated for IDFood = ${idfood}`,
                updatedRows: result.affectedRows
            };
        } else {
            return {
                success: false,
                message: `No food found with IDFood = ${idfood}`,
                updatedRows: result.affectedRows
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error updating price',
            error: error.message
        };
    }
}

// update info via id
async function updateDetail_info(idfood, new_info) {
    try {
        const query = `UPDATE food SET info_Detail = ? WHERE IDFood = ?`;
        const [result] = await pool.query(query, [new_info, idfood]);
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: `Info detail updated for IDFood = ${idfood}`,
                updatedRows: result.affectedRows
            };
        } else {
            return {
                success: false,
                message: `No food found with IDFood = ${idfood}`,
                updatedRows: result.affectedRows
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error updating info detail',
            error: error.message
        };
    }
}

// Function to change the status of an order to 1
async function changeStatusToOne(idOrder) {
    const connection = await pool.getConnection(); // Get connection for transaction

    try {
        await connection.beginTransaction(); // Start transaction

        // Get order details (Amount and IDFood) from the order_detail table
        const getOrderQuery = `SELECT IDFood, Amount FROM order_detail WHERE IDOrder = ? AND status = 0`; // Ensure we are updating only non-processed orders
        const [orderDetails] = await connection.query(getOrderQuery, [idOrder]);

        if (orderDetails.length === 0) {
            await connection.rollback(); // Rollback transaction if no order found
            return {
                success: false,
                message: `No order found with IDOrder = ${idOrder} or it has already been processed`,
            };
        }

        const { IDFood, Amount: orderedAmount } = orderDetails[0];

        // Update order status to 1 in the order_detail table
        const updateStatusQuery = `UPDATE order_detail SET status = 1 WHERE IDOrder = ?`;
        const [statusResult] = await connection.query(updateStatusQuery, [idOrder]);

        // Decrease the corresponding food amount in the food table
        const updateFoodAmountQuery = `UPDATE food SET Amount = Amount - ? WHERE IDFood = ?`;
        const [foodResult] = await connection.query(updateFoodAmountQuery, [orderedAmount, IDFood]);

        // Commit the transaction if everything goes well
        await connection.commit();

        return {
            success: true,
            message: `Order status updated to 1 and food amount adjusted for IDOrder = ${idOrder}`,
            updatedRows: statusResult.affectedRows,
            foodUpdated: foodResult.affectedRows,
        };
    } catch (error) {
        // Rollback the transaction if any error occurs
        await connection.rollback();
        return {
            success: false,
            message: 'Error updating order status or adjusting food amount',
            error: error.message,
        };
    } finally {
        connection.release(); // Release the connection back to the pool
    }
}

//Function to get all order
// Function to get all orders with user information
async function getAllOrders() {
    const query = `
        SELECT 
            IDOrder,
            general_info_order.IDUser,
            User_name,
            Address,
            Date,
            Payment
        FROM 
            general_info_order 
        INNER JOIN 
            user_table 
        ON 
            general_info_order.IDUser = user_table.IDUser;
    `;

    try {
        const [result] = await pool.query(query);
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error retrieving orders',
            error: error.message,
        };
    }
}

// Function to get order details with food information based on IDOrder
async function getOrderDetails_via_IDOrder(IDOrder) {
    const query = `
        SELECT 
            IDOrder,
            food.IDFood,
            Food,
            order_detail.Amount,
            food.Price,
            status
        FROM 
            order_detail 
        JOIN 
            food 
        ON 
            order_detail.IDFood = food.IDFood
        WHERE 
            IDOrder = ?;
    `;

    try {
        const [result] = await pool.query(query, [IDOrder]);
        if (result.length > 0) {
            return {
                success: true,
                data: result,
            };
        } else {
            return {
                success: false,
                message: `No order details found for IDOrder = ${IDOrder}`,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error retrieving order details with food information',
            error: error.message,
        };
    }
}


module.exports = {
    getUsers,
    changePrice,
    updateDetail_info,
    deleteUser,
    changeStatusToOne,
    getAllOrders,
    getOrderDetails_via_IDOrder
};
