import express from "express";
import router_of_patient from "./routes/patientRoutes.js";
import router_of_doctor from "./routes/doctorRoutes.js";
import cors from "cors";

const app = express();
const PORT = 3001;

//  יש מנגנון אבטחה שחוסם אתרים אחרים מלגשת לדומיין זה
//  לכן צריך לאפשר גישה לדומיין הרצוי
//  במקרה שלנו מדובר בדומיין של הלקוח
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/patients", router_of_patient);
app.use("/api/doctors", router_of_doctor);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
