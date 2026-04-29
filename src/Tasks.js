import { useState, useEffect } from "react";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);/*Stores all tasks,starts empty */
  const [newTask, setNewTask] = useState({/*stores input text for each column*/
    todo: "",
    progress: "",
    done: ""
  });

  const [editingId, setEditingId] = useState(null);/*Tracks which tasks is being edited*/

  useEffect(() => { 
    const saved = JSON.parse(localStorage.getItem("tasks")) || []; 
    setTasks(saved);
  }, []); /*get saved tasks from browser, convert them into array and , or use empty array if none exist },[]) this closes useEffect*/

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (status) => {  /* function to add tasks*/
    if (!newTask[status].trim()) return; /*if input is empty (or only spaces stop and do nothing */

    const task = { /*Creates a variable named task*/
      id: Date.now(), /*creates a unique ID for each task Returns current time in miliseconds*/
      title: newTask[status], /*sets task title from input box*/
      status, /*current column status*/
    };

    setTasks([...tasks, task]); /*updates the task list*/
    setNewTask({ /*update input box values*/
      ...newTask, /*update old input values*/
      [status]: "" /*clear current input box*/
    }); /*finishing addtask input*/
  };

  const updateStatus = (id, newStatus) => {  
    setTasks( 
      tasks.map((t) => /*go through evry task 1 by 1,T means one task */
        t.id === id ? { ...t, status: newStatus } : t /*here it checks is this the task we want*/
      )
    );
  };

  const updateTitle = (id, value) => {
    setTasks(
      tasks.map((t) => /*checks every task 1 by 1*/
        t.id === id ? { ...t, title: value } : t
      )
    );
  };

  const moveForward = (id, currentStatus) => { /*creates function to move a task to next column*/
    if (currentStatus === "todo") { 
      updateStatus(id, "progress");
    } 
    else if (currentStatus === "progress") {
      updateStatus(id, "done");
    }
  };

  return (
    <div className="kanban-container">

      {["todo", "progress", "done"].map((status) => ( /*creates an array and .map loops through each item one by one*/
        <div key={status} className="kanban-column"> 

          <h3>
            {status === "todo" && "⚪ Not Started"}
            {status === "progress" && "🔵 In Progress"}
            {status === "done" && "🟢 Done"}
          </h3>

          {tasks 
            .filter((t) => (t.status || "todo") === status) /*Show tasks in correct column*/
            .map((t) => ( 
              <div key={t.id} className="task-card">  

                {editingId === t.id ? ( /*is this task being edited*/
                  <input
                    value={t.title} 
                    onChange={(e) => /*Runs when user types in input Every letter*/
                      updateTitle(t.id, e.target.value) /*Gets what user typed*/
                    }
                    onBlur={() => setEditingId(null)} /*runs when u click outside input*/
                    autoFocus /*Cursor automatically goes into input*/
                  />
                ) : ( /*else part of condition*/
                  <p
                    onClick={(e) => { /*when task text is clicked*/
                      e.stopPropagation(); /*Stops click from affecting parent elements*/
                      setEditingId(t.id); /*Set this task into edit mode*/
                    }}
                  >
                    {t.title}
                  </p>
                )}

                <div className="actions">

                  {status !== "todo" && ( /*if task is NOT in Todo ,show left arrow*/
                    <span /*Create clickable arrow*/
                      onClick={(e) => {  /*When arrow clicked*/
                        e.stopPropagation(); /*stop other click events*/

                        if (status === "progress") { 
                          updateStatus(t.id, "todo");
                        }

                        else if (status === "done") {
                          updateStatus(t.id, "progress");
                        }
                      }}
                    >
                      ←
                    </span>
                  )}

                  {status !== "done" && ( /*If task is NOT in Done column*/
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        moveForward(t.id, status);
                      }}
                    >
                      →
                    </span>
                  )}

                </div>

              </div>
            ))}
          <input
            placeholder="+ Add a task" /*Show hint text*/
            value={newTask[status]} /*show current typed input*/
            onChange={(e) =>
              setNewTask({ 
                ...newTask, /*copy everything already in newTask*/
                [status]: e.target.value
              })
            }
            onKeyDown={(e) => /*if enter pressed*/
              e.key === "Enter" && addTask(status) /*add task*/
            }
          />

        </div>
      ))}

    </div>
  );
}