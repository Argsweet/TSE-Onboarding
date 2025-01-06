import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getAllTasks();
        if (result.success) {
          setTasks(result.data);
        } else {
          alert("Failed to load tasks: " + result.error);
        }
      } catch (error) {
        alert("Failed to load tasks: " + error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.taskListWrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <TaskItem task={task} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
