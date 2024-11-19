const CustomInput = ({ label, type = "text", placeholder, ...props }) => {
    return (
      <div className="w-full max-w-md">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 text-gray-900
                   transition-all duration-200 ease-in-out"
          {...props}
        />
      </div>
    );
  };
  
  export default CustomInput;