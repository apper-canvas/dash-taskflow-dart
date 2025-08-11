import { motion } from "framer-motion"

const Loading = ({ className }) => {
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i)
  
  return (
    <div className={`space-y-4 ${className}`}>
      {skeletonItems.map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="flex space-x-2">
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14" />
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading