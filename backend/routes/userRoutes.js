const express = require('express');
const router = express.Router();
const {
  getUsers,
  registerUser,
  deleteUser,
  loginUser,
  getMe,
  updateUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getUsers).post(registerUser).put(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
// router.route('/:id').delete(deleteUser);
router.route('/me').get(protect, getMe);
module.exports = router;
