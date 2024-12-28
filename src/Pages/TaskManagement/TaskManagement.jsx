import React, { useState } from 'react';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', deadline: '', priority: 'normal', assignedTo: '' });

  // Function to add a new task
  const addTask = () => {
    if (newTask.title && newTask.assignedTo) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', deadline: '', priority: 'normal', assignedTo: '' }); // Reset form
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Admin Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Tasks</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="border rounded-lg p-2 w-full mb-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="date"
          className="border rounded-lg p-2 w-full mb-2"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="border rounded-lg p-2 mb-2"
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
        <input
          type="text"
          placeholder="Assigned To"
          className="border rounded-lg p-2 w-full mb-2"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        />
        <button onClick={addTask} className="bg-blue-600 text-white rounded-lg p-2">Add Task</button>
      </div>

      {/* Task List Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Current Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-bold">{task.title}</h4>
                <p>Assigned To: {task.assignedTo} | Deadline: {task.deadline} | Priority: {task.priority}</p>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <ul className="list-disc pl-5">
          {tasks.length === 0 ? (
            <li>No pending tasks.</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id}>
                {task.title} is due on {task.deadline} and assigned to {task.assignedTo}.
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskManagement; 