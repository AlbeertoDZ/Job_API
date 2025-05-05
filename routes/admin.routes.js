const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin.controller")

//GET --> http://localhost:3000/users
router.get('/users', adminControllers.getUsersAdmin);




module.exports = router;