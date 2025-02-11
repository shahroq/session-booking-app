export default function Badge({ type = "danger", children = "Badge" }) {
  let classes =
    "inline-flex items-center rounded-md px-4 py-2 text-xs font-medium ring-1 ring-inset ";

  switch (type) {
    case "grey":
      classes += "bg-gray-50 text-gray-600 ring-gray-500/10 ";
      break;
    case "green":
      classes += "bg-green-50 text-green-600 ring-green-500/10 ";
      break;
    case "blue":
      classes += "bg-blue-50 text-blue-600 ring-blue-500/10 ";
      break;
    case "red":
      classes += "bg-red-50 text-red-600 ring-red-500/10 ";
      break;
  }

  return <span className={classes}>{children}</span>;
}
