const express = require('express');
const frontend = require('../controller/frontend');
const path = require('path');
const router = express.Router();

router.use("/assets",express.static(path.join(__dirname, '../assets')));
router.get("/home",frontend.index);
router.get("/detail/:id",frontend.detail);
router.get("/assets/imgs",frontend.imgs);
router.get("/login",frontend.login);
router.get("/logout",frontend.logout);
router.get("/signup",frontend.signup);
router.get("/cart",frontend.carts);
router.get("/demo",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/components.html'));
});

//admin here
router.get("/admin",frontend.dashboard);
router.get("/admin/user",frontend.admin_users);
router.get("/admin/comments",frontend.admin_comments);
router.get("/admin/comments/:id",frontend.admin_comments_detail);

module.exports = router;