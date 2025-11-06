console.log('Testing all backend modules...\n');

const modules = [
  { name: 'routes/auth', path: './routes/auth' },
  { name: 'routes/products', path: './routes/products' },
  { name: 'routes/orders', path: './routes/orders' },
  { name: 'models/User', path: './models/User' },
  { name: 'models/Product', path: './models/Product' },
  { name: 'models/Order', path: './models/Order' }
];

modules.forEach(module => {
  try {
    require(module.path);
    console.log(`✅ ${module.name} - LOADED SUCCESSFULLY`);
  } catch (error) {
    console.log(`❌ ${module.name} - FAILED: ${error.message}`);
  }
});
