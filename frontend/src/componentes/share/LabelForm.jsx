function InputForm({ htmlFor, name }) {
    return ( 
        <label
            htmlFor={htmlFor}
            className="block text-sm font-semibold text-gray-300 mb-2"
        >
            {name}
        </label>
     );
}

export default InputForm;
