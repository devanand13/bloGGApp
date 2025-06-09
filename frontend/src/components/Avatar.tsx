
export function Avatar({name, size}:{name : string, size:string}){
    return <div className={`relative inline-flex items-center justify-center ${size=="small" ? "w-5 h-5" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size=="small" ? "text-sm" : "text-2xl"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase() }</span>
    </div>
    
}