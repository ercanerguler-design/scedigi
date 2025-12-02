'use client'

import { CheckCircle2, Circle, Plus, Trash2, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: string
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', description: '' })

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/crm/tasks')
      const data = await response.json()
      if (Array.isArray(data)) {
        setTasks(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async () => {
    if (!newTask.title.trim()) return

    try {
      await fetch('/api/crm/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, status: 'todo' })
      })
      setShowModal(false)
      setNewTask({ title: '', priority: 'medium', description: '' })
      fetchTasks()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleComplete = async (task: Task) => {
    try {
      await fetch(`/api/crm/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: task.status === 'completed' ? 'todo' : 'completed' })
      })
      fetchTasks()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/crm/tasks/${id}`, { method: 'DELETE' })
      fetchTasks()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-slate-400',
    urgent: 'bg-purple-500'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Görevler</h3>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 hover:bg-primary-50 text-primary-600 rounded-lg transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-slate-500 py-8">Henüz görev yok</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <button onClick={() => toggleComplete(task)}>
                {task.status === 'completed' ? (
                  <CheckCircle2 className="text-green-600" size={20} />
                ) : (
                  <Circle className="text-slate-400" size={20} />
                )}
              </button>
              <div className="flex-1">
                <p className={`text-sm ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900 font-medium'}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-xs text-slate-600 mt-1">{task.description}</p>
                )}
              </div>
              <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`} />
              <button
                onClick={() => handleDelete(task.id)}
                className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Yeni Görev</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Görev başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Detaylar..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Öncelik</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                  <option value="urgent">Acil</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border rounded-lg hover:bg-slate-50"
                >
                  İptal
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
