import { cn } from "@/utils/cn"

const CategoryPill = ({ 
  category, 
  active = false, 
  onClick, 
  count,
  className 
}) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
        "transition-all duration-200 hover:scale-105 active:scale-95",
        "border border-opacity-30",
        active 
          ? `bg-gradient-to-r text-white shadow-md` 
          : `bg-white hover:bg-opacity-80 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md`,
        className
      )}
      style={{
        backgroundColor: active ? category.color : undefined,
        borderColor: category.color,
        background: active ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)` : undefined
      }}
    >
<span className="flex-1">{category.name}</span>
      {count !== undefined && (
        <span className={cn(
          "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0",
          active ? "bg-white bg-opacity-30 text-white" : "bg-gray-100 text-gray-600"
        )}>
          {count}
        </span>
      )}
    </button>
  )
}

export default CategoryPill