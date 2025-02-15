import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  fetchSessions,
  deleteSession,
  updateSessionStatus,
} from "../services/api";
import SessionList from "../components/SessionList";
import Alert from "../components/utils/Alert";

export default function TherapistDashboard() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const getSessions = async () => {
      try {
        const data = await fetchSessions();
        setSessions(data);
      } catch (err) {
        setError("Failed to load sessions" + err);
      } finally {
        setLoading(false);
      }
    };

    getSessions();
  }, [user]);

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div>{error}</div>;

  // TODO: introduce sessionContext or redux
  const handleDelete = async (sessionId) => {
    // console.log(`session id from dashboard: ${sessionId}`);
    try {
      await deleteSession(sessionId);
      // Remove the deleted session from the state
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );

      // Show notification
      setNotification(`One Session (id=${sessionId}) deleted successfully!`);
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      // console.log(err);
      console.error("Failed to delete session:", err);
    }
  };

  // TODO: introduce sessionContext or redux
  const handleStatusChange = async (sessionId, newStatus) => {
    console.log(
      `sessionId/newStatus from dashboard: ${sessionId} - ${newStatus}`
    );
    try {
      await updateSessionStatus(sessionId, newStatus);
      // Update the session status in local state to 'completed'
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId ? { ...session, status: newStatus } : session
        )
      );

      // Show notification
      setNotification(
        `One Session status(id=${sessionId}) changed to ${newStatus} successfully!`
      );
      setTimeout(() => setNotification(""), 10000);
    } catch (err) {
      // console.log(err);
      console.error("Failed to update session status:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>

      {notification && (
        <Alert type="info" title="Info">
          {notification}
        </Alert>
      )}

      <SessionList
        title="List of sessions"
        sessions={sessions}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
