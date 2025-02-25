const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Veritabanı Bağlantısı
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_app"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL'e bağlanıldı...");
});

// Kullanıcı Giriş İşlemi
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Kullanıcıyı veritabanından bul
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(401).send("Geçersiz email veya şifre.");
        }

        const user = result[0];

        // Şifreyi doğrula
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(401).send("Geçersiz email veya şifre.");
            }

            // JWT token oluştur
            const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
            res.json({ token });
        });
    });
});

// Kullanıcı Kaydı İşlemi
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    // Şifreyi hashle
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Kullanıcıyı veritabanına kaydet
        db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err, result) => {
            if (err) throw err;
            res.send("Kayıt başarılı!");
        });
    });
});

app.listen(3000, () => {
    console.log("Sunucu 3000 portunda çalışıyor...");
});
