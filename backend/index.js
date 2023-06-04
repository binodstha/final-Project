import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gmar",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/admin/auth/sign-in", (req, res) => {
  const query = "SELECT * FROM user WHERE username = ? ";
  const values = [req.body.username];
  try {
    db.query(query, [...values], (err, data) => {
      if (err) {
        const errorArray = [];
        const errorCode = err.code || "Unknown";
        const errorTitle = "Database Error";
        const errorDetail =
          err.message || "An error occurred while processing your request.";
        errorArray.push({
          code: errorCode,
          title: errorTitle,
          detail: errorDetail,
        });
        return res.status(500).json({ errors: errorArray });
      }
      let passMatch = false;
      if (typeof data[0] !== "undefined") {
        passMatch = bcrypt.compareSync(req.body.password, data[0].password); // true
      }
      if (typeof data[0] !== "undefined" && passMatch) {
        return res.status(201).json({ message: "User created successfully." });
      } else {
        const errorArray = [];
        const errorCode = "Unknown";
        const errorTitle = "Login Error";
        const errorDetail = "Invalid Username or password";
        errorArray.push({
          code: errorCode,
          title: errorTitle,
          detail: errorDetail,
        });
        return res.status(500).json({ errors: errorArray });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/admin/auth/sign-up", (req, res) => {
  const query =
    "INSERT INTO user(`username`, `email`, `firstname`, `lastname`, `password`) VALUES (?)";
  const hashPassword = bcrypt.hashSync(req.body.password, 12);

  const values = [
    req.body.username,
    req.body.email,
    req.body.firstname,
    req.body.lastname,
    hashPassword,
  ];
  try {
    db.query(query, [values], (err, data) => {
      if (err) {
        const errorArray = [];
        const errorCode = err.code || "Unknown";
        const errorTitle = "Database Error";
        const errorDetail =
          err.message || "An error occurred while processing your request.";
        errorArray.push({
          code: errorCode,
          title: errorTitle,
          detail: errorDetail,
        });

        return res.status(500).json({ errors: errorArray });
      }
      // User created successfully
      return res.status(201).json({ message: "User created successfully." });
    });
  } catch (error) {
    console.log("catch error", error);
  }
});

// Fetch a category
app.get("/admin/categories", (req, res) => {
  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;

  db.query("SELECT * FROM categories", (error, results) => {
    console.log(error);
    if (error) {
      res
        .status(500)
        .json({ error: "Error retrieving categories from database" });
    } else {
      const categories =
        page && limit
          ? results.slice(startIndex, startIndex + limit)
          : results.map((result) => {
              delete result.desc;
              return result;
            });
      const response = {
        results: categories,
        pagination: {
          currentPage: parseInt(page),
          totalCategories: results.length,
        },
      };

      if (startIndex > 0) {
        response.pagination.previous = {
          page: parseInt(page) - 1,
          limit: parseInt(limit),
        };
      }

      if (startIndex + limit < results.length) {
        response.pagination.next = {
          page: parseInt(page) + 1,
          limit: parseInt(limit),
        };
      }
      res.json(response);
    }
  });
});

// Create a category
app.post("/admin/categories", (req, res) => {
  const q = "INSERT INTO categories(`title`, `desc`) VALUES (?)";

  const values = [req.body.title, req.body.desc];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Delete a category
app.delete("/admin/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  db.query(
    "DELETE FROM categories WHERE id = ?",
    categoryId,
    (error, result) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error deleting category from database" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Category not found" });
      } else {
        res.json({ message: "Category deleted successfully" });
      }
    }
  );
});

// Create a geodata
app.post("/admin/geodata", (req, res) => {
  const q =
    "INSERT INTO geodata(`name`, `category_id`, `detail`, `lat`, `lng`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.category_id,
    req.body.details,
    req.body.lat,
    req.body.lng,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/admin/geodata", (req, res) => {
  const { page, limit } = req.query;
  const startIndex = (page - 1) * limit;
  db.query(
    "SELECT geodata.*, categories.title as category FROM geodata INNER JOIN categories ON geodata.category_id = categories.id",
    (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error retrieving categories from database" });
      } else {
        const geodata =
          page && limit
            ? results.slice(startIndex, startIndex + limit)
            : results.map((result) => {
                delete result.desc;
                return result;
              });
        const response = {
          results: geodata,
          pagination: {
            currentPage: parseInt(page),
            totalCategories: results.length,
          },
        };

        if (startIndex > 0) {
          response.pagination.previous = {
            page: parseInt(page) - 1,
            limit: parseInt(limit),
          };
        }

        if (startIndex + limit < results.length) {
          response.pagination.next = {
            page: parseInt(page) + 1,
            limit: parseInt(limit),
          };
        }
        res.json(response);
      }
    }
  );
});

//geodata by category id and search
app.get("/admin/geodata-search", (req, res) => {
  const { category_id, search } = req.query;

  let query = "SELECT * FROM geodata ";

  if (category_id && !search) {
    query += "WHERE category_id = ?";
    db.query(query, [category_id], (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error retrieving geodata from database" });
      } else {
        const response = {
          results: results,
        };

        res.json(response);
      }
    });
  } else if (!category_id && search) {
    query += "WHERE name LIKE ? OR detail LIKE ?";
    const wildcardSearch = `%${search}%`;
    db.query(query, [wildcardSearch, wildcardSearch], (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error retrieving geodata from database" });
      } else {
        const response = {
          results: results,
        };

        res.json(response);
      }
    });
  } else if (category_id && search) {
    query += "WHERE category_id = ? AND (name LIKE ? OR detail LIKE ?)";
    const wildcardSearch = `%${search}%`;
    db.query(
      query,
      [category_id, wildcardSearch, wildcardSearch],
      (error, results) => {
        if (error) {
          res
            .status(500)
            .json({ error: "Error retrieving geodata from database" });
        } else {
          const response = {
            results: results,
          };

          res.json(response);
        }
      }
    );
  } else {
    // No search parameters provided, return all geodata
    db.query(query, (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error retrieving geodata from database" });
      } else {
        const response = {
          results: results,
        };

        res.json(response);
      }
    });
  }
});

//geodata by category id and search suggestion
app.get("/admin/geodata-search-suggestion", (req, res) => {
  const { category_id, search } = req.query;
  const suggestionLength = req.query.length || 5; // Default suggestion length is 5

  let query = "SELECT * FROM geodata ";

  if (category_id && !search) {
    query += "WHERE category_id = ?";
    db.query(query, [category_id], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error retrieving geodata from database" });
      } else {
        const response = {
          suggestions: results.slice(0, suggestionLength).map(result => result.name),
        };

        res.json(response);
      }
    });
  } else if (!category_id && search) {
    query += "WHERE name LIKE ? OR detail LIKE ?";
    const wildcardSearch = `%${search}%`;
    db.query(query, [wildcardSearch, wildcardSearch], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error retrieving geodata from database" });
      } else {
        const response = {
          suggestions: results.slice(0, suggestionLength).map(result => result.name),
        };

        res.json(response);
      }
    });
  } else if (category_id && search) {
    query += "WHERE category_id = ? AND (name LIKE ? OR detail LIKE ?)";
    const wildcardSearch = `%${search}%`;
    db.query(query, [category_id, wildcardSearch, wildcardSearch], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error retrieving geodata from database" });
      } else {
        console.log(results)
        const response = {
          suggestions: results.slice(0, suggestionLength).map(result => result.name),
        };

        res.json(response);
      }
    });
  } else {
    // No search parameters provided, return all geodata
    db.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error retrieving geodata from database" });
      } else {
        console.log(results)
        const response = {
          results: results,
          suggestions: results.slice(0, suggestionLength).map(result => result.title),
        };

        console.log(response)

        res.json(response);
      }
    });
  }
});


// Delete a geodata
app.delete("/admin/geodata/:id", (req, res) => {
  const geodataId = req.params.id;

  db.query("DELETE FROM geodata WHERE id = ?", geodataId, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error deleting category from database" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.json({ message: "Category deleted successfully" });
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
