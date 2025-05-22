const { MongoClient } = require('mongodb');

async function seedUser() {
  try {
    const uri = "mongodb+srv://machinebox:machinebox@machinebox.gtwl6.gcp.mongodb.net/?retryWrites=true&w=majority&appName=machinebox";
    const client = new MongoClient(uri);

    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('job-board');
    const usersCollection = db.collection('users');
    const jobsCollection = db.collection('jobs');

    // Check if user already exists
    // const existingUser = await usersCollection.findOne({ email: 'test@example.com' });
    // if (existingUser) {
    //   console.log('Test user already exists');
    //   await client.close();
    //   return;
    // }

    // // Create test user
    // const testUser = {
    //   email: "test@example.com",
    //   password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpwBAK.p.RlMXG", // password is 'test123'
    //   name: "Test User",
    //   role: "user"
    // };
    const jobMeta =

    {
      id: 2,
      title: "Junior Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      description: "We are looking for an experienced Senior Software Engineer to join our team. The ideal candidate will have a strong background in web development and a passion for creating high-quality, scalable applications.",
      requirements: [
        "5+ years of experience in software development",
        "Strong proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/GCP/Azure)",
        "Excellent problem-solving and communication skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health, dental, and vision insurance",
        "401(k) matching",
        "Flexible work hours and remote work options",
        "Professional development opportunities"
      ],
      aboutCompany: {
        description: "Tech Corp is a leading technology company focused on building innovative solutions for businesses worldwide. We're committed to creating a diverse and inclusive workplace where everyone can thrive.",
        size: "50-200 employees",
        industry: "Technology",
        location: "San Francisco, CA"
      }
    }
    // await usersCollection.insertOne(testUser);
    // console.log('Test user created successfully');
    await jobsCollection.insertOne(jobMeta);
    console.log('Jobs are created');

    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
}

seedUser(); 