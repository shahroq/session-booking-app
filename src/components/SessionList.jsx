export default function SessionList({ title = "Session List", children }) {
  // let currentDay = "";

  return (
    <section className="mb-8">
      <h2 className="text-xl mb-2">{title}</h2>
      {children.length === 0 ? (
        <p>No session.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {children}
        </ul>
      )}
    </section>
  );
}
