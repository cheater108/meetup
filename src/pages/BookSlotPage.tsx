import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Navigate, useSearchParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { TimeSlot } from "../utils/timeslots";
import Slots from "../components/Slots";
import { getLastDay, getSlots } from "../api/slots";
import { getDateInFormat } from "../utils/helpers";
import toast, { Toaster } from "react-hot-toast";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function BookSlotPage() {
    const [searchParams] = useSearchParams();
    const [date, setDate] = useState<Value>(new Date());
    const [slotsData, setSlotsData] = useState<{
        slots: TimeSlot[];
        available: number;
    }>({ slots: [], available: 16 });
    const [maxDate, setMaxDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    if (!searchParams.get("name")) return <Navigate to={"/"} />;

    function refreshSlots() {
        setLoading(true);
        getSlots(getDateInFormat(date as Date))
            .then((data) => {
                setSlotsData(data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.error || "Error fetching slots"
                );
                setLoading(false);
            });
    }

    useEffect(() => {
        refreshSlots();
    }, [date]);

    useEffect(() => {
        getLastDay().then((data) => setMaxDate(new Date(data.date)));
    }, []);

    return (
        <div className="inner py-4 md:p-4 rounded-md shadow-custom md:self-center flex flex-col md:flex-row gap-4 md:h-[352px]">
            <Toaster />
            <div className="w-[350px] flex flex-col justify-between">
                <div>
                    <h1 className="text-center text-2xl font-semibold antialiased">
                        📝 Book a slot
                    </h1>
                    <p className="text-sm text-slate-500 mt-4 p-2 md:p-0">
                        👋 Hi, {searchParams.get("name")}! please book a slot
                        according to the availability.
                    </p>
                </div>
                {date ? (
                    <p className="text-slate-500 italic text-sm p-2 md:p-0">
                        Selected date: {date?.toString().substring(0, 15)}
                    </p>
                ) : (
                    <p className="text-slate-500 italic mt-auto text-sm p-2 md:p-0">
                        Pick a date
                    </p>
                )}
            </div>
            <div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    minDate={new Date()}
                    maxDate={maxDate}
                    tileDisabled={({ date }) =>
                        date.getDay() === 0 || date.getDay() === 6
                    }
                />
            </div>
            <Slots
                date={getDateInFormat(date as Date)}
                refreshSlots={refreshSlots}
                timeslots={slotsData.slots}
                loading={loading}
                available={slotsData.available}
            />
        </div>
    );
}

export default BookSlotPage;
