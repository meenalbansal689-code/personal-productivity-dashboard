import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import "./Tasks.css";

const initialData = {
  todo: [],
  inProgress: [],
  done: []
};

export default function Tasks() {
  const [columns, setColumns] = useState(initialData);

  const [newTask, setNewTask] = useState({
    todo: "",
    inProgress: "",
    done: ""
  });
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("kanban"));
    if (stored) setColumns(stored);
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceItems = Array.from(columns[source.droppableId]);
    const destItems = Array.from(columns[destination.droppableId]);

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
    } else {
      destItems.splice(destination.index, 0, movedItem);
    }

    const updated = {
      ...columns,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems
    };

    setColumns(updated);
    localStorage.setItem("kanban", JSON.stringify(updated));
  };
  const addTask = (colId) => {
    if (!newTask[colId].trim()) return;

    const updated = {
      ...columns,
      [colId]: [
        ...columns[colId],
        {
          id: Date.now().toString(),
          text: newTask[colId]
        }
      ]
    };

    setColumns(updated);
    localStorage.setItem("kanban", JSON.stringify(updated));

    setNewTask({
      ...newTask,
      [colId]: ""
    });
  };
  const deleteTask = (colId, taskId) => {
    const updated = {
      ...columns,
      [colId]: columns[colId].filter(
        (task) => task.id !== taskId
      )
    };

    setColumns(updated);
    localStorage.setItem("kanban", JSON.stringify(updated));
  };

  return (
    <div className="kanban-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([colId, tasks]) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>
                  {colId === "todo" && "📝 To Do"}
                  {colId === "inProgress" && "⚡ In Progress"}
                  {colId === "done" && "✅ Completed"}
                </h3>

                <input
                  type="text"
                  placeholder="Add a task..."
                  value={newTask[colId]}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      [colId]: e.target.value
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask(colId);
                    }
                  }}
                  className="task-input"
                />

                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          transition: "all 0.2s ease"
                        }}
                      >
                        <span className="task-text">
                          {task.text}
                        </span>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteTask(colId, task.id)
                          }
                        >
                          ✖
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}