import { useState } from "react";
import { TimeSlot } from "../utils/timeslots";
import ConfirmSlot from "./ConfirmSlot";
import CustomSpinner from "./CustomSpinner";

function Slots({
    timeslots,
    date,
    refreshSlots,
    loading,
    available,
}: {
    timeslots: TimeSlot[];
    date: string;
    refreshSlots: () => void;
    loading: boolean;
    available: number;
}) {
    const [modal, setModal] = useState(false);
    const [slotId, setSlotId] = useState(0);

    function handleClick(id: number) {
        setSlotId(id);
        setModal(true);
    }
    return (
        <div className="flex flex-col h-[180px] md:h-full md:w-[300px]">
            <p className="text-center text-2xl font-semibold antialiased">
                {available > 0 ? "⏰ Select a slot" : "❌ No slots available"}
            </p>
            {loading ? (
                <div className="flex-1 flex justify-center items-center">
                    <CustomSpinner />
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto mt-2 flex flex-col items-center gap-2">
                    {timeslots.map((timeslot, ind) => {
                        if (timeslot.isBooked) {
                            return (
                                <div
                                    key={ind}
                                    className="text-center p-4 w-[200px] bg-slate-500 text-white font-semibold rounded-md hover:opacity-80 cursor-pointer ml-3"
                                >
                                    Slot Booked
                                </div>
                            );
                        }
                        return (
                            <div
                                key={ind}
                                className="text-center p-4 w-[200px] bg-sky-500 text-white font-semibold rounded-md hover:opacity-80 cursor-pointer ml-3"
                                onClick={() => handleClick(ind)}
                            >
                                {timeslot.time}
                            </div>
                        );
                    })}
                </div>
            )}
            {modal && (
                <ConfirmSlot
                    slot_id={slotId}
                    setModal={setModal}
                    date={date}
                    refreshSlots={refreshSlots}
                />
            )}
        </div>
    );
}

export default Slots;
