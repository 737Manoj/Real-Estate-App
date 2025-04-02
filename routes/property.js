
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/properties
// @description    Get all properties
// @access  Public
router.get('/', propertyController.getAllProperties);

// @route   GET api/properties/featured
// @description    Get featured properties
// @access  Public
router.get('/featured', propertyController.getFeaturedProperties);

// @route   GET api/properties/:id
// @description    Get property by ID
// @access  Public
router.get('/:id', propertyController.getPropertyById);

// @route   POST api/properties
// @description    Create a property
// @access  Admin
router.post('/', [auth, admin], propertyController.createProperty);

// @route   PUT api/properties/:id
// @desc    Update a property
// @access  Admin
router.put('/:id', [auth, admin], propertyController.updateProperty);

// @route   DELETE api/properties/:id
// @description    Delete a property
// @access  Admin
router.delete('/:id', [auth, admin], propertyController.deleteProperty);

module.exports = router;