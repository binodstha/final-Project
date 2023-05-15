import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

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

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  const passw1 = "test1";
  const passw2 = "test2";
  let hashPwd = bcrypt.hashSync(passw1, 12);

  console.log(hashPwd);

  bcrypt.compare(passw1, hashPwd, function (err, result) {
    console.log(err, result);
  });

  bcrypt.compareSync;

  // bcrypt.hash(passw1, 12, function (err, hash) {
  //   hashPwd = hash
  // });
  console.log(hashPwd);
  db.query(q, (err, data) => {
    console.log(err);
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/admin/auth/sign-in", (req, res) => {
  console.log(req)
  const query =
    "SELECT * FROM user WHERE username = ? ";

  const values = [req.body.username];

  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/admin/auth/sign-up", (req, res) => {
  const query =
    "INSERT INTO user(`username`, `email`, `firstname`, `lastname`, password) VALUES (?)";
  const hashPassword = bcrypt.hashSync(req.body.password);

  const values = [
    req.body.username,
    req.body.email,
    req.body.firstname,
    req.body.lastname,
    hashPassword,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
