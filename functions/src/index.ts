import { onRequest } from "firebase-functions/https";
import { bookSlot, getLastDay, getSlots } from "./controllers/slots";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/slots", getSlots);
app.post("/bookSlot", bookSlot);

app.get("/lastday", getLastDay);

export const api = onRequest(app);
