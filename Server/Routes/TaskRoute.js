import express from 'express';
import con from '../utils/db.js';

const router = express.Router();

// إضافة مهمة جديدة
router.post('/task', (req, res) => {
    const { date, check_in, check_out, sit_name, description } = req.body;

    const sql = "INSERT INTO tasks (date, check_in, check_out, sit_name, description) VALUES (?, ?, ?, ?, ?)";
    
    con.query(sql, [date, check_in, check_out, sit_name, description], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Database error" });
        }
        return res.json({ Status: true, Message: "Task added successfully!" });
    });
});

// استرجاع المهام
router.get('/tasks', (req, res) => {
    const sql = "SELECT * FROM tasks";
    
    con.query(sql, (err, results) => {
        if (err) {
            return res.json({ Status: false, Error: "Database error" });
        }
        return res.json(results);  // إرسال النتائج إلى العميل
    });
});
// تحديث مهمة معينة
router.put('/task/:id', (req, res) => {
    const { date, check_in, check_out, sit_name, description } = req.body;
    const sql = "UPDATE tasks SET date = ?, check_in = ?, check_out = ?, sit_name = ?, description = ? WHERE id = ?";
    
    con.query(sql, [date, check_in, check_out, sit_name, description, req.params.id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Database error" });
        }
        return res.json({ Status: true, Message: "Task updated successfully!" });
    });
});

// حذف مهمة معينة
router.delete('/task/:id', (req, res) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Database error" });
        }
        return res.json({ Status: true, Message: "Task deleted successfully!" });
    });
});

export { router as taskRouter };
