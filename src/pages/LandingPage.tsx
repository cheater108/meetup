import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    function handleSubmit() {
        if (name.trim().length < 1) setError(true);
        else navigate(`/book?name=${name}`);
    }
    return (
        <div className="inner p-4 rounded-md shadow-custom  self-start w-full md:max-w-sm md:self-center">
            <h1 className="text-center text-2xl font-semibold antialiased">
                Book a slot
            </h1>
            <p className="text-slate-500 mt-2">
                👋 Hi! Welcome to meetup please provide your name to book the
                available slots.
            </p>
            <input
                className={`bg-slate-100 w-full rounded-md p-2 px-4 mt-4 mb-8 ${
                    error && "border-2 border-red-600"
                }`}
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setError(false);
                }}
            />
            <button
                className=" bg-sky-500 px-4 py-2 text-white font-semibold rounded-md float-end"
                onClick={handleSubmit}
            >
                Book slot →
            </button>
        </div>
    );
}

export default LandingPage;
