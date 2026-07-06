const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validate, authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], validate, authController.login);

router.get('/me', auth, authController.getMe);

module.exports = router;
