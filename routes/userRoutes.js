const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');

router.post(
  '/api/users',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Provide a valid email'),
    body('age').optional().isInt({ min: 0, max: 120 }).withMessage('Age must be between 0 and 120')
  ],
  validate,
  userController.createUser
);

router.get('/api/users', userController.getAllUsers);

router.get(
  '/api/users/:id',
  [param('id').isMongoId().withMessage('Invalid MongoDB ID')],
  validate,
  userController.getUserById
);

router.put(
  '/api/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid MongoDB ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Provide a valid email')
  ],
  validate,
  userController.updateUser
);

router.delete(
  '/api/users/:id',
  [param('id').isMongoId().withMessage('Invalid MongoDB ID')],
  validate,
  userController.deleteUser
);

module.exports = router;