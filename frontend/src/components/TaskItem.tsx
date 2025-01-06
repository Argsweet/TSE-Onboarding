import React, { useState } from "react"; // update this line
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
        // marked
        ...task,
        isChecked: !task.isChecked,
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
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} onPress={handleToggleCheck} disabled={isLoading} />

      <div
        className={
          task.isChecked ? `${styles.textContainer} ${styles.checked}` : styles.textContainer
        }
      >
        <span className={styles.title}>{task.title}</span>

        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}

// update the previous line and add the following

// ...
