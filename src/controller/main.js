const handle = require('../DB/connect.js');
const pool = handle.pool;

//get all cakes controller
exports.getCakes = async function (req, res) {
    try {
        const list = await handle.get_all_cakes(pool);
        res.send(list);
    } catch (error) {
        console.error('Error fetching cakes:', error);
        res.status(500).send('An error occurred while fetching cakes.');
    }
};

//get cakes by id controller 
exports.getCake = async function (req, res) {
    const id = req.params.id;
    try {
        const cake = await handle.get_cake(pool, id);
        if (cake[0]) {
            res.send(cake);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.send({
            error: true,
            msg: error
        })
    }
}

// Sign-up controller
exports.signUp = async (req, res) => {
    const { name, pass, mail, tel } = req.body;

    try {
        const result = await handle.signUp(pool, name, pass, mail, tel);
        res.status(201).json({ message: "User registered successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: "Error during sign-up", details: error });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { name, pass } = req.body;

    try {
        const user = await handle.Login(pool, name, pass);
        if (user) {
            const result = {success: true,message: "Login successful",user};
            const jsonString = JSON.stringify(result);
            const base64Encoded1 = Buffer.from(jsonString).toString('base64');
            const base64Encoded2 = Buffer.from(base64Encoded1).toString('base64');
            res.cookie('user', `${base64Encoded2}.`, { maxAge: 3600000, httpOnly: true });//milisecond
            res.status(200).json(result);
        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error during login", details: error });
    }
};
