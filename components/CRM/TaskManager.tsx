'use client'

import { CheckCircle2, Circle, Plus } from 'lucide-react'
import { useState } from 'react'

export function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Ahmet ile follow up yap', completed: false, priority: 'high' },
    { id: 2, title: 'Zeynep\'e teklif gönder', completed: false, priority: 'medium' },
    { id: 3, title: 'Toplantı notlarını kaydet', completed: true, priority: 'low' },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-slate-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Görevler</h3>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? (
                <CheckCircle2 className="text-green-600" size={20} />
              ) : (
                <Circle className="text-slate-400" size={20} />
              )}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {task.title}
              </p>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              task.priority === 'high' ? 'bg-red-600' :
              task.priority === 'medium' ? 'bg-yellow-600' : 'bg-slate-400'
            }`} />
          </div>
        ))}
      </div>
    </div>
  )
}
