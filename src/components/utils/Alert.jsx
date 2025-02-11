export default function Alert({
  type = "danger",
  title = null,
  children = "Content",
}) {
  let classes = "p-4 mb-4 text-sm  rounded-lg ";

  switch (type) {
    case "info":
      classes += "text-blue-800 bg-blue-50";
      break;
    case "danger":
      classes += "text-red-800 bg-red-50";
      break;
    case "success":
      classes += "text-green-800 bg-green-50";
      break;
  }

  return (
    <div className={classes} role="alert">
      {title && <span className="font-bold">{title}:&nbsp;</span>}
      {children}
    </div>
  );
}
