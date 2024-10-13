import { db } from "./server.js";

async function seedDatabase() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS Users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL
            );`
    );

    await db.query(
      `CREATE TABLE IF NOT EXISTS Posts (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                feedbackType TEXT NOT NULL,
                comments TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
    );

    await db.query(
      `INSERT INTO Users (name, email) VALUES
            ('John Doe', 'john@example.com'),
            ('Jane Smith', 'jane@example.com')
            ON CONFLICT (email) DO NOTHING;`
    );

    await db.query(
      `INSERT INTO Posts (name, feedbackType, comments) VALUES
            ('John Doe', 'Suggestion', 'I think the app should have more themes.'),
            ('Jane Smith', 'Complaint', 'The website is slow.'),
            ('John Doe', 'Compliment', 'Great customer service!')
            ON CONFLICT DO NOTHING;`
    );

    const result = await db.query(
      `SELECT Users.id AS Users.name, Users.email, 
                Posts.id AS Posts_id, Posts.feedbackType, Posts.comments, Posts.created_at
                FROM Posts
                ORDER BY Posts.created_at DESC;`
    );

    console.log("Data from database:", result.rows);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.end();
  }
}

seedData();
