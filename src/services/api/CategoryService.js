import mockCategories from "@/services/mockData/categories.json"

let categories = [...mockCategories]

const CategoryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...categories]
  },
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const category = categories.find(category => category.Id === parseInt(id))
    if (!category) {
      throw new Error("Category not found")
    }
    return { ...category }
  },
  
  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      ...categoryData,
      createdAt: new Date().toISOString()
    }
    
    categories.push(newCategory)
    return { ...newCategory }
  },
  
  async update(id, categoryData) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = categories.findIndex(category => category.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Category not found")
    }
    
    categories[index] = { ...categories[index], ...categoryData }
    return { ...categories[index] }
  },
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = categories.findIndex(category => category.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Category not found")
    }
    
    categories.splice(index, 1)
    return true
  }
}

export default CategoryService