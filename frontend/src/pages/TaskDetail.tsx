import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await getTask(id!);
        if (result.success) {
          setTask(result.data);
        } else {
          setError("Task not found.");
        }
      } catch (err) {
        setError("Error fetching task.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!task) return <p>Task not found.</p>;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(task.dateCreated));

  return (
    <Page>
      <Helmet>
        <title>{task.title} | TSE Todos</title>
      </Helmet>

      <p>
        <Link to="/">Back to home</Link>
      </p>

      <div className={styles.taskRow}>
        <h1 className={styles.taskTitle}>{task.title}</h1>
        <button className={styles.editButton}>Edit Task</button>
      </div>

      <p className={styles.taskDescription}>{task.description || "No description available."}</p>

      <div className={styles.taskInfoRow}>
        <p className={styles.infoLabel}>Assignee</p>
        <div className={styles.assigneeContainer}>
          {task.assignee && (
            <img
              src={task.assignee.profilePictureURL || "/path-to-default-avatar.png"}
              alt={`${task.assignee.name}'s profile`}
              className={styles.assigneePfp}
            />
          )}
          <p className={styles.infoValue}>{task.assignee?.name || "Not assigned"}</p>
        </div>
      </div>

      <div className={styles.taskInfoRow}>
        <p className={styles.infoLabel}>Status</p>
        <p className={styles.infoValue}>{task.isChecked ? "Done" : "Not done"}</p>
      </div>

      <div className={styles.taskInfoRow}>
        <p className={styles.infoLabel}>Date Created</p>
        <p className={styles.infoValue}>{formattedDate}</p>
      </div>
    </Page>
  );
}
