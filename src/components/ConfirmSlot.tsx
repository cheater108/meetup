import { useState, useEffect, useRef } from "react";
import timeslots from "../utils/timeslots";
import { bookSlot } from "../api/slots";
import toast from "react-hot-toast";

function ConfirmSlot({
    slot_id,
    setModal,
    date,
    refreshSlots,
}: {
    slot_id: number;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    date: string;
    refreshSlots: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    function handleSubmit() {
        setLoading(true);
        bookSlot(date, slot_id)
            .then((data) => {
                setLoading(false);
                setModal(false);
                refreshSlots();
                toast.success(data.message);
            })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Error booking slot");
            });
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return (
        <div
            ref={ref}
            className="fixed modal top-2 p-2 rounded-md w-[200px] bg-white shadow-custom"
        >
            <p className="text-center text-sm text-slate-500">
                Confirm booking slot for {timeslots[slot_id].time}
            </p>
            <div className="mt-3 flex gap-4 justify-center">
                {loading ? (
                    <button className="bg-sky-500 text-white p-1 px-4 rounded-md">
                        Booking...
                    </button>
                ) : (
                    <button
                        className="bg-sky-500 text-white p-1 px-4 rounded-md"
                        onClick={handleSubmit}
                    >
                        Yes
                    </button>
                )}
                <button
                    className="border-2 border-sky-500 p-1 px-4 rounded-md text-sky-500"
                    onClick={() => setModal(false)}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default ConfirmSlot;
