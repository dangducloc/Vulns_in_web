const handle = require("../DB/connect");
const checkCookie = require("./checkCookie");
const pool = handle.pool;

exports.getComments = async (req, res) => {
    const idfood = req.params.idfood;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const rs = await handle.showComments(pool, idfood);
        res.status(200).send(rs);
    } else {
        res.status(401).send("fail");
    }
};


exports.postComment = async (req, res) => {
    const { idfood, commentText } = req.body;
    const check = checkCookie(req, req);
    if (check.success == true) {
        const userid = check.user.IDUser;
        const rs = await handle.postComment(pool, userid, idfood, commentText);
        res.status(201).send(rs);
    } else {
        res.status(401).send("fail");
    }
};

