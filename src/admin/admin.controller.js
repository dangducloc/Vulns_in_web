const handle = require("../DB/connect");
const admin = require("../DB/admin");
const checkCookie = require("../controller/checkCookie");
const pool = handle.pool;

// Function to delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const check = checkCookie(req, res);
        
        // Check if the user is an admin
        if (check && check.user.role === "admin") {
            const { idBL } = req.body;

            // Check if idBL is provided
            if (!idBL) {
                return res.status(400).json({ success: false, message: "ID of the comment is required." });
            }

            const result = await handle.deleteComment(pool, idBL);
            // console.log(result);
            
            // Check the result of the deletion
            if (result.affectedRows > 0) {
                return res.status(200).json({ success: true, message: "Comment deleted successfully." });
            } else {
                return res.status(404).json({ success: false, message: "Comment not found." });
            }
        } else {
            return res.status(403).json({ success: false, message: "Access denied." });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ success: false, message: "An error occurred while deleting the comment.", error: error.message });
    }
};

// Function to get all users
exports.getUsers = async (req, res) => {
    try {
        const check = checkCookie(req, res);
        
        // Check if the user is an admin
        if (check && check.user.role === "admin") {
            const users = await admin.getUsers();
            return res.status(200).json({ success: true, users });
        } else {
            return res.status(403).json({ success: false, message: "Access denied." });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching users.", error: error.message });
    }
};

// Function to delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const check = checkCookie(req, res);
        
        // Check if the user is an admin
        if (check && check.user.role === "admin") {
            const { idUser } = req.body;

            // Check if idUser is provided
            if (!idUser) {
                return res.status(400).json({ success: false, message: "ID of the user is required." });
            }

            const result = await admin.deleteUser(idUser);
            console.log(result);
            //Check the result of the deletion
            if (result.affectedRows > 0) {
                return res.status(200).json({ success: true, message: "User deleted successfully." });
            } else {
                return res.status(404).json({ success: false, message: "User not found." });
            }
        } else {
            return res.status(403).json({ success: false, message: "Access denied." });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ success: false, message: "An error occurred while deleting the user.", error: error.message });
    }
};

// Function to change the price of a food item
exports.changePrice = async (req, res) => {
    try {
        const check = checkCookie(req, res);
        
        // Check if the user is an admin
        if (check && check.user.role === "admin") {
            const { idFood, newPrice } = req.body;

            // Check if both idFood and newPrice are provided
            if (!idFood || newPrice === undefined) {
                return res.status(400).json({ success: false, message: "ID of the food and new price are required." });
            }

            const result = await admin.changePrice(idFood, newPrice);

            // Check the result of the price change
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } else {
            return res.status(403).json({ success: false, message: "Access denied." });
        }
    } catch (error) {
        console.error("Error changing price:", error);
        return res.status(500).json({ success: false, message: "An error occurred while changing the price.", error: error.message });
    }
};

// Function to update the info of a food item
exports.updateDetailInfo = async (req, res) => {
    try {
        const check = checkCookie(req, res);
        
        // Check if the user is an admin
        if (check && check.user.role === "admin") {
            const { idFood, newInfo } = req.body;

            // Check if both idFood and newInfo are provided
            if (!idFood || !newInfo) {
                return res.status(400).json({ success: false, message: "ID of the food and new info are required." });
            }

            const result = await admin.updateDetail_info(idFood, newInfo);

            // Check the result of the info update
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } else {
            return res.status(403).json({ success: false, message: "Access denied." });
        }
    } catch (error) {
        console.error("Error updating info detail:", error);
        return res.status(500).json({ success: false, message: "An error occurred while updating the info detail.", error: error.message });
    }
};

exports.changeOrderStatus = async (req, res) => {
    const check = checkCookie(req, res);
    if (check.user.role === "admin") {
        const { idOrder } = req.body;

        if (!idOrder) {
            return res.status(400).send({ success: false, message: "IDOrder is required." });
        }

        const result = await admin.changeStatusToOne(idOrder);
        res.status(result.success ? 200 : 404).send(result);
    } else {
        res.status(403).send("Access denied.");
    }
};

exports.getAllOrders = async (req, res) => {
    const check = checkCookie(req, res);
    if (check.user.role === "admin") {
        const result = await admin.getAllOrders();
        return res.status(result.success ? 200 : 500).send(result);
    } else {
        res.status(403).send("Access denied.");
    }
};

exports.getOrderDetails_via_IDOrder = async (req, res) => {
    const check = checkCookie(req, res);
    if (check.user.role === "admin") {
        const { IDOrder } = req.params;
        const result = await admin.getOrderDetails_via_IDOrder(IDOrder);
        return res.status(result.success ? 200 : 404).send(result);
    } else {
        res.status(403).send("Access denied.");
    }
};