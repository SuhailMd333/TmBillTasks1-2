import React from 'react'

const NoTaskToShow = () => {
  return (
<div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-dashed border-gray-200 dark:border-gray-700 min-h-[200px]">
  <svg 
    className="w-12 h-12 mb-4 text-gray-400 dark:text-gray-500" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
    />
  </svg>
  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">
    No tasks to show here
  </h3>
  {/* <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[300px]">
    {showAddButton ? (
      <>
        Get started by <button 
          className="text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
          onClick={onAddClick}
        >
          adding your first task
        </button>
      </>
    ) : (
      "All caught up! Enjoy your day."
    )}
  </p> */}
</div>  )
}

export default NoTaskToShow