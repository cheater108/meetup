import api from "./api";

const getSlots = async (date: string) => {
    const result = await api.get(`/slots`, {
        params: { date },
    });

    return result.data;
};

const bookSlot = async (date: string, ind: number) => {
    const result = await api.post("/bookSlot", { date, slot_id: ind });
    return result.data;
};

const getLastDay = async () => {
    const result = await api.get("/lastday");
    return result.data;
};

export { getSlots, bookSlot, getLastDay };
