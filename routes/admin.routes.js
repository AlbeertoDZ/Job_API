const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin.controller")

//GET --> http://localhost:3000/users
router.get('/users', adminControllers.getUsersAdmin);
//router.get('/users', authMiddleware, adminControllers.getUsersAdmin)


//GET --> http://localhost:3000/dashboard
router.get('/dashboard', adminControllers.getDashboardView)
//router.get("/dashboard, authMiddleware, adminControllers.getDashboardView")

module.exports = router;