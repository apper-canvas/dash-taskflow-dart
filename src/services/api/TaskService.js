import mockTasks from "@/services/mockData/tasks.json"

let tasks = [...mockTasks]

const TaskService = {
  async getAll() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...tasks]
  },
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },
  
  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    tasks.unshift(newTask)
    return { ...newTask }
  },
  
  async update(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    tasks[index] = { ...tasks[index], ...taskData }
    return { ...tasks[index] }
  },
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    tasks.splice(index, 1)
    return true
  }
}

export default TaskService