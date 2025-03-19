import express from 'express';
import cors from 'cors';
import { adminRouter } from './Routes/AdminRoute.js';
import { taskRouter } from './Routes/TaskRoute.js';  // مسار المهام

const app = express();

// إعدادات CORS للسماح بالوصول من الـ React App
app.use(cors({
    origin: 'http://localhost:5173',  // عنوان تطبيق الـ React
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // تأكد من إضافة DELETE هنا
    credentials: true  // لتخزين الكوكيز
}));

app.use(express.json());  // لتحويل الـ JSON إلى كائنات جافا سكريبت

// ربط المسارات
app.use('/auth', adminRouter);  // مسار الـ adminlogin
app.use('/auth', taskRouter);   // مسار إضافة المهام

// تشغيل السيرفر
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
