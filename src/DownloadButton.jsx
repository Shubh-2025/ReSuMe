const Button = ({ name, onClick, disabled }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center gap-4 group h-20 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
      onClick={disabled ? undefined : onClick}
    >
      <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200" />
      <a role="button" className={`group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 ${!disabled && 'hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30'}`}>
        {name}
        <svg aria-hidden="true" viewBox="0 0 10 10" height={10} width={10} fill="none" className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2">
          <path d="M0 5h7" className="transition opacity-0 group-hover:opacity-100" />
          <path d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
        </svg>
      </a>
    </div>
  );
};

export default Button;