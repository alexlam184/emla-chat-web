export const RadioButton = ({ type, id, name, label, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className={`flex bg-gray-100 text-gray-700 rounded-md p-6 my-3  hover:bg-indigo-300 cursor-pointer  ${
        checked ? "bg-indigo-600" : "bg-white"
      }`}
    >
      <input
        className="hidden"
        type={type}
        id={id}
        value={id}
        name={name}
        aria-label={label}
        aria-checked={checked}
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`group text-lg font-medium hover:text-white ${
          checked ? "text-white" : "text-indigo-600"
        }`}
      >
        {label}
      </span>
    </label>
  );
};
