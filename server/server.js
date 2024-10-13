import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/posts", async (req, res) => {
  try {
    const result = await db.query(
      // "SELECT * FROM posts ORDER BY created_at DESC"
      "SELECT Posts.id, Users.name, Posts.feedbacktype, Posts.comments FROM Posts JOIN Users ON Posts.user_id = Users.id ORDER BY Posts.created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/feedback-types", async (req, res) => {
  const suggestionTpyes = ["General", "Suggestion", "Complaint", "Compliment"];
  res.json(suggestionTpyes);
});

app.post("/posts", async (req, res) => {
  const { name, email, feedbacktype, comments } = req.body;

  console.log("name", name);
  console.log("email", email);
  console.log("comments", comments);
  if (!(name && email && comments)) {
    return res
      .status(400)
      .json({ message: "Name, email and comments are required" });
  } else {
    try {
      let user_id = 1;

      // check user with same email address exists
      const user_search_result = await db.query(
        "SELECT * FROM Users WHERE email = $1",
        [email]
      );

      if (user_search_result.rowCount == 0) {
        console.log("no user found with email address", email);
        // if no, then insert new user,
        // and then assign the id of the newly created user to user_id variable
        let user_insert_result = await db.query(
          "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
          [name, email]
        );
        user_id = user_insert_result.rows[0].id;
      } else {
        console.log("user_search_result", user_search_result);
        user_id = user_search_result.rows[0]["id"];
      }

      // if yes, then assign the id to user_id variable

      const result = await db.query(
        "INSERT INTO posts (user_id, feedbackType, comments) VALUES ($1, $2, $3) RETURNING *",
        [user_id, feedbacktype || "General", comments]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ message: "Error creating post" });
    }
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { feedbacktype, comments } = req.body;
  const updatePosts = await db.query(
    "UPDATE posts SET feedbacktype = $1, comments = $2  WHERE id = $3 RETURNING *",
    [feedbacktype, comments, id]
  );
  console.log(updatePosts);
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const deletePosts = await db.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );
  console.log(deletePosts);
  res.status(200).json(deletePosts.rows);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
