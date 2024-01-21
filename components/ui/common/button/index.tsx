


export default function Button({children,
     className,
     variant= "purple",
     hoverable= true,
     ...rest
    }:any){

        const variants:any={
            purple:`text-white bg-indigo-600 ${hoverable &&"hover:bg-indigo-700 hover:transition-transform duration-200"}`,
            red: `text-white bg-red-600 ${hoverable &&"hover:bg-red-700 hover:transition-transform duration-200"}`
        }
    return (
        <button 
            {...rest}
            
            className={`disabled:opacity-50 disabled:cursor-not-allowed rounded-md px-8 py-3 border text-base font-medium ${className} ${variants[variant]}`}>
            {children}
        </button>
    )
}