import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);
    try {
      const updatedTask = await updateTask({
        ...task,
        isChecked: !task.isChecked,
        assignee: task.assignee?._id,
      });

      if (updatedTask.success) {
        setTask(updatedTask.data);
      } else {
        alert("Failed to update task.");
      }
    } catch (error) {
      alert("Error occurred while updating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.item} ${task.isChecked ? styles.checked : ""}`}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />
      <div className={styles.textContainer}>
        <Link
          to={`/task/${task._id}`} // Use task ID to link to TaskDetail
          className={styles.link}
        >
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
