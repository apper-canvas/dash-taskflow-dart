import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className }) => {
  const [query, setQuery] = useState("")
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query)
    }, 300)
    
    return () => clearTimeout(debounceTimer)
  }, [query, onSearch])
  
  return (
    <Input
      icon="Search"
      iconPosition="left"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={className}
    />
  )
}

export default SearchBar