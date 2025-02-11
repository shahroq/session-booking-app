import Session from "./Session";

export default function SessionList({
  title = "Session List",
  sessions = [],
  onDelete,
  onStatusChange,
}) {
  // let currentDay = "";

  return (
    <section className="mb-8">
      <h2 className="text-xl mb-2">{title}</h2>
      {sessions.length === 0 ? (
        <p>No session.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {sessions.map((session) => (
            <Session
              key={session.id}
              session={session}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
