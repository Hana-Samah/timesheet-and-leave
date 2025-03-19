import express from 'express';
import con from '../utils/db.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// إعداد `multer` لتخزين الملفات في مجلد `uploads`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/"); // حفظ الملفات في مجلد `public/uploads`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // إعادة تسمية الملف برقم زمني
    },
});

const upload = multer({ storage: storage });

// 🔹 جلب جميع طلبات الإجازة
router.get('/leaves', (req, res) => {
    con.query("SELECT * FROM leave_requests", (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

// 🔹 إضافة طلب إجازة مع إمكانية رفع ملف مرفق
router.post('/leave', upload.single("attachment"), (req, res) => {
    const { employee_name, email, start_datetime, end_datetime, leave_type, phone_number } = req.body;
    
    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null; // حفظ مسار الملف فقط

    const sql = "INSERT INTO leave_requests (employee_name, email, start_datetime, end_datetime, leave_type, phone_number, attachment) VALUES (?, ?, ?, ?, ?, ?, ?)";

    con.query(sql, [employee_name, email, start_datetime, end_datetime, leave_type, phone_number, attachmentPath], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Leave request added successfully!", attachmentPath });
    });
});

// 🔹 تحديث طلب إجازة
router.put('/leave/:id', upload.single("attachment"), (req, res) => {
    const { employee_name, email, start_datetime, end_datetime, leave_type, phone_number } = req.body;
    let attachmentPath = req.file ? `/uploads/${req.file.filename}` : req.body.attachment; // إذا لم يرفع المستخدم ملفًا جديدًا، يتم الاحتفاظ بالمرفق السابق

    const sql = "UPDATE leave_requests SET employee_name=?, email=?, start_datetime=?, end_datetime=?, leave_type=?, phone_number=?, attachment=? WHERE id=?";
    const values = [employee_name, email, start_datetime, end_datetime, leave_type, phone_number, attachmentPath, req.params.id];

    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update error" });
        return res.json({ Status: "Updated" });
    });
});

// 🔹 حذف طلب الإجازة
router.delete('/leave/:id', (req, res) => {
    const sql = "DELETE FROM leave_requests WHERE id = ?";
    con.query(sql, [req.params.id], (err, result) => {
        if (err) return res.json({ Error: "Delete error" });
        return res.json({ Status: "Deleted" });
    });
});

export { router as leaveRouter };
