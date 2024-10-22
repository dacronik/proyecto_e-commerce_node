const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/edit/:id', userController.getUser);
router.post('/update/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
