function CustomSpinner() {
    return (
        <div className="outer_spinner flex flex-col justify-center items-center w-[40px] h-[40px] overflow-hidden relative rounded-full">
            <div className="bg-white w-[35px] h-[35px] absolute rounded-full z-10"></div>
            <div className="inner_spinner w-[50px] h-[20px] bg-sky-500 spinner_class"></div>
        </div>
    );
}

export default CustomSpinner;
