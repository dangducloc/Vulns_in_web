const handle = require("../DB/connect");
const checkCookie = require("./checkCookie");
const pool = handle.pool;

exports.addItem = async (req, res) => {
    const idfood = req.body.idfood;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const userid = check.user.IDUser;
        const rs = await handle.addCart(pool, userid, idfood);
        res.status(201).send(rs);
    } else {
        res.status(401).send("fail");
    }
};

exports.updateItem = async (req, res) => {
    const { idfood, quantity } = req.body;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const userid = check.user.IDUser;
        const rs = await handle.updateItem(pool, userid, idfood, quantity);
        res.status(201).send(rs);
    } else {
        res.status(401).send("fail");
    }
};

exports.deleteItem = async (req, res) => {
    const { idfood } = req.body;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const userid = check.user.IDUser;
        const rs = await handle.rm_itemFromCart(pool, userid, idfood);
        res.status(201).send(rs);
    } else {
        res.status(401).send("fail");
    }
};

exports.getCart = async (req, res) => {
    const check = checkCookie(req, req);
    if (check.success == true) {
        const userid = check.user.IDUser;
        const rs = await handle.getCart(pool, userid);
        res.status(201).send(rs);
    } else {
        res.status(401).send("fail");
    }
};
