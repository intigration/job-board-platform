const { MongoClient } = require('mongodb');

async function seedUser() {
  try {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('job-board');
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      await client.close();
      return;
    }
    
    // Create test user
    const testUser = {
      email: "test@example.com",
      password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpwBAK.p.RlMXG", // password is 'test123'
      name: "Test User",
      role: "user"
    };
    
    await usersCollection.insertOne(testUser);
    console.log('Test user created successfully');
    
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
}

seedUser(); 