import { onRequest } from "firebase-functions/https";
import express from "express";
import { bookSlot, getLastDay, getSlots } from "./controllers/slots";

const app = express();

app.get("/slots", getSlots);
app.post("/bookSlot", bookSlot);

app.get("/lastday", getLastDay);

export const api = onRequest(app);
