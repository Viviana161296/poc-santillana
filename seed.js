const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  connectionString: process.env.VITE_SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  try {
    await client.connect();

    // Insert data into thematic_axes table
    await client.query(`
      INSERT INTO thematic_axes (id, name, description) VALUES
      (1, 'Mathematics', 'Mathematical concepts and theories'),
      (2, 'Science', 'Scientific principles and discoveries');
    `);

    // Insert data into topics table
    await client.query(`
      INSERT INTO topics (id, name, thematic_axis_id) VALUES
      (1, 'Algebra', 1),
      (2, 'Geometry', 1),
      (3, 'Physics', 2),
      (4, 'Chemistry', 2);
    `);

    // Insert data into contents table
    await client.query(`
      INSERT INTO contents (id, title, topic_id, content) VALUES
      (1, 'Linear Equations', 1, 'Introduction to linear equations...'),
      (2, 'Triangles', 2, 'Properties of triangles...'),
      (3, 'Newton\'s Laws', 3, 'Understanding Newton\'s laws of motion...'),
      (4, 'Periodic Table', 4, 'Overview of the periodic table...');
    `);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
}

seedDatabase(); 