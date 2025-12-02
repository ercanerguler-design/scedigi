'use client'

import { CheckCircle2, Circle, Plus, X, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  priority: string
  status: string
  dueDate?: string
  contactId?: string
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/crm/tasks')
      const data = await response.json()
      if (response.ok) {
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const newStatus = task.status === 'completed' ? 'todo' : 'completed'
    
    // Optimistic update
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ))

    // TODO: Add API endpoint for updating task
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/crm/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })

      if (response.ok) {
        setShowCreateModal(false)
        setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' })
        fetchTasks()
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Görevler</h3>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <Plus size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-primary-600" size={32} />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-slate-600 py-8">Henüz görev yok</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <button onClick={() => toggleTask(task.id)}>
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="text-green-600" size={20} />
                  ) : (
                    <Circle className="text-slate-400" size={20} />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-sm ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' || task.priority === 'urgent' ? 'bg-red-600' :
                  task.priority === 'medium' ? 'bg-yellow-600' : 'bg-slate-400'
                }`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">Yeni Görev</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Öncelik</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                  <option value="urgent">Acil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
              >
                Görev Oluştur
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
