const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/admin.controller")
const authMiddleware = require("../middlewares/authMiddleware")
const isAdminMiddleware = require("../middlewares/admin")

//GET --> http://localhost:3000/users
router.get('/users', authMiddleware, isAdminMiddleware,adminControllers.getUsersAdmin);
//router.get('/users', authMiddleware, adminControllers.getUsersAdmin)


//GET --> http://localhost:3000/dashboard
router.get('/dashboard', adminControllers.getDashboardView)
//router.get("/dashboard, authMiddleware, adminControllers.getDashboardView")

//GET --> http://localhost:3000/admin vista de la home de admin
router.get('/', (req, res) => {
    res.render("homeAdmin")
})

module.exports = router;