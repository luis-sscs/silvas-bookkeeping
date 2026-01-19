const { v4: uuidv4 } = require('uuid');

function randomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      { name: 'Web Development', type: 'service', description: 'Full-stack web development services', unit: 'hour' },
      { name: 'Mobile App Development', type: 'service', description: 'iOS and Android app development', unit: 'hour' },
      { name: 'UI/UX Design', type: 'service', description: 'User interface and experience design', unit: 'hour' },
      { name: 'Consulting', type: 'service', description: 'Technical consulting services', unit: 'hour' },
      { name: 'Software License', type: 'product', description: 'Annual software license', unit: 'license' },
      { name: 'Website Hosting', type: 'service', description: 'Managed hosting services', unit: 'month' },
      { name: 'SEO Optimization', type: 'service', description: 'Search engine optimization', unit: 'month' },
      { name: 'Training Session', type: 'service', description: 'Technical training and workshops', unit: 'session' },
      { name: 'Hardware Support', type: 'product', description: 'Computer hardware and support', unit: 'unit' },
      { name: 'Cloud Storage', type: 'service', description: 'Cloud storage subscription', unit: 'GB' }
    ];

    const productRecords = products.map((product, index) => ({
      id: uuidv4(),
      name: product.name,
      type: product.type,
      description: product.description,
      price: randomAmount(50, 500),
      sku: `SKU-${String(index + 1).padStart(4, '0')}`,
      unit: product.unit,
      isActive: Math.random() > 0.2,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('products', productRecords, { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
