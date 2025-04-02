
const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ date: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get featured properties
exports.getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ featured: true }).sort({ date: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }
    
    res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create property (Admin only)
exports.createProperty = async (req, res) => {
  const { name, description, price, location, image, featured } = req.body;

  try {
    const newProperty = new Property({
      name,
      description,
      price,
      location,
      image,
      featured: featured || false
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update property (Admin only)
exports.updateProperty = async (req, res) => {
  const { name, description, price, location, image, featured } = req.body;

  // Build property object
  const propertyFields = {};
  if (name) propertyFields.name = name;
  if (description) propertyFields.description = description;
  if (price) propertyFields.price = price;
  if (location) propertyFields.location = location;
  if (image) propertyFields.image = image;
  if (featured !== undefined) propertyFields.featured = featured;

  try {
    let property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Update
    property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: propertyFields },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete property (Admin only)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    await property.remove();
    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(500).send('Server error');
  }
};