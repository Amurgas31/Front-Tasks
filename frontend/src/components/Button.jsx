export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = "" }) => {
  // Definimos estilos base y variantes para reutilizar en todo el sitio
  const baseStyles = "px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base focus:outline-none focus:ring-2";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
    outline: "border border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-200",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};