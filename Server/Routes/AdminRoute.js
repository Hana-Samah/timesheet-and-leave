import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// مسار تسجيل دخول الـ Admin
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    
    con.query(sql, [req.body.email, req.body.password], (err, results) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" });
        }
        
        if (results.length > 0) {
            const email = results[0].email;
            const token = jwt.sign(
                { role: "admin", email: email },
                "jwt_secret_key",
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password!" });
        }
    });
});

export { router as adminRouter };
