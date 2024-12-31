import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../firestore";
import { Request, Response } from "express";
import {
    getInitialDateData,
    isWithinDaysLimit,
    limitDate,
} from "../utils/helpers";

const getSlots = async (req: Request, res: Response) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date not provided" });

    const dateStr = Date.parse(date.toString());
    if (isNaN(dateStr)) return res.status(400).json({ error: "Invalid Date" });

    const userRef = doc(db, "users", "Z3bfxQg0J1YhD2GCFLLE");
    const user = await getDoc(userRef);
    const no_of_days = user.get("no_of_days");

    if (!isWithinDaysLimit(no_of_days, date as string)) {
        console.log("ran inside if");
        return res.status(400).json({
            error: `Day selected is beyond limit of ${no_of_days} days.`,
        });
    }

    const datesRef = collection(db, "users", "Z3bfxQg0J1YhD2GCFLLE", "dates");
    const slots = query(datesRef, where("date", "==", date.toString()));
    const slotSnapshot = await getDocs(slots);

    if (slotSnapshot.empty) {
        await setDoc(
            doc(db, "users", "Z3bfxQg0J1YhD2GCFLLE", "dates", date as string),
            getInitialDateData(date as string)
        );

        return res.json(getInitialDateData(date as string));
    }

    return res.json(slotSnapshot.docs[0].data());
};

const bookSlot = async (req: Request, res: Response) => {
    const { date, slot_id } = req.body;
    if (!date) return res.status(400).json({ error: "Date not provided" });

    const dateStr = Date.parse(date.toString());
    if (isNaN(dateStr)) return res.status(400).json({ error: "Invalid Date" });

    const datesRef = collection(db, "users", "Z3bfxQg0J1YhD2GCFLLE", "dates");
    const slots = query(datesRef, where("date", "==", date.toString()));
    const slotSnapshot = await getDocs(slots);

    if (slotSnapshot.empty) {
        return res.status(404).json({ error: "Given date doesn't exits" });
    }

    const dateDoc = slotSnapshot.docs[0].data();
    if (dateDoc.slots[slot_id].isBooked) {
        return res.status(400).json({
            error: `Slot ${dateDoc.slots[slot_id].time} is already booked`,
        });
    }

    dateDoc.slots[slot_id].isBooked = true;
    dateDoc.available -= 1;

    const dateRef = doc(db, "users", "Z3bfxQg0J1YhD2GCFLLE", "dates", date);
    await setDoc(dateRef, dateDoc);

    return res.status(201).json({ message: "Slot booked successfully" });
};

const getLastDay = async (req: Request, res: Response) => {
    const userRef = doc(db, "users", "Z3bfxQg0J1YhD2GCFLLE");
    const userDoc = await getDoc(userRef);

    res.json({ date: limitDate(userDoc.get("no_of_days")) });
};

export { getSlots, bookSlot, getLastDay };
