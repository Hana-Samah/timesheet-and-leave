import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { taskRouter } from "./Routes/TaskRoute.js"; // إضافة المسار للمهام
import { leaveRouter } from "./Routes/LeaveRoute.js"; // ✅ استيراد مسار الإجازات
import path from "path";

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // تأكد من إضافة DELETE هنا
    credentials: true
}));

app.use(express.json());
app.use('/auth', adminRouter);  // مسار الـ admin
app.use('/auth', taskRouter);   // مسار الـ tasks
app.use('/auth', leaveRouter);   // ✅ تفعيل مسار الإجازات
app.use("/uploads", express.static("public/uploads"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
