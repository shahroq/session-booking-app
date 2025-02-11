import React, { useContext, useState } from "react";
import dayjs from "dayjs";

import { AuthContext } from "../contexts/AuthContext";
import sessionImg from "../assets/session.png";
import userAvatar from "../assets/avatar.png";

import Badge from "./utils/Badge";

export default function Session({ session = {}, onDelete, onStatusChange }) {
  // console.log(session);

  const [showTooltip, setShowTooltip] = useState(false);
  const { user } = useContext(AuthContext);

  // allowed actions
  // TODO: clean this mess! session service? better to handle this logic on the backend, at the resource level/every session has calculated properties that ease the frontend decision on these actions
  const completeable =
    user.role === "therapist" &&
    session.status === "scheduled" &&
    new Date(session.endTime) < new Date();
  const bookable =
    user.role === "client" &&
    session.status === "available" &&
    new Date(session.startTime) > new Date();
  const cancelable =
    session.status === "scheduled" && new Date(session.startTime) > new Date();
  const deletable = user.role === "therapist" && session.status === "available";

  // badgeType
  let badgeType = "grey";
  if (session.status === "scheduled") badgeType = "blue";
  if (session.status === "completed") badgeType = "green";

  return (
    <li className="flex justify-between gap-y-6 py-5 flex-col md:flex-row md:gap-x-6">
      <div className="flex min-w-0 gap-x-4">
        <img
          className="size-12 flex-none rounded-full bg-gray-80"
          src={sessionImg}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">ID</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">{session.id}</p>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">Date/Time</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {dayjs(session.startTime).format("MMMM D, YYYY")}
            <br />
            <time time={session.startTime}>
              {dayjs(session.startTime).format("h:mm A")}
            </time>
            &nbsp;-&nbsp;
            <time time={session.endTime}>
              {dayjs(session.endTime).format("h:mm A")}
            </time>
          </p>
        </div>
      </div>

      {user.role === "therapist" && (
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto" style={{ position: "relative" }}>
            <p className="text-sm/6 font-semibold text-gray-900">Client</p>
            <p
              className="mt-1 truncate text-xs/5 text-gray-500"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {session?.client?.name ? session.client.name : "-"}
            </p>

            {session?.client?.name && showTooltip && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                          bg-stone-300 text-white text-xs rounded px-4 py-4 whitespace-no-wrap
                          transition-opacity duration-400 flex flex-col items-center gap-2"
              >
                <img
                  className="size-12 flex-none rounded-full"
                  src={userAvatar}
                />
                <span className="ml-2 px-5">{session.client.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {user.role === "client" && (
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">Therapist</p>
            <p
              className="mt-1 truncate text-xs/5 text-gray-500"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {session?.therapist?.name ? session.therapist.name : "-"}
            </p>

            {session?.therapist?.name && showTooltip && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                          bg-stone-300 text-white text-xs rounded px-4 py-4 whitespace-no-wrap
                          transition-opacity duration-400 flex flex-col items-center gap-2"
              >
                <img
                  className="size-12 flex-none rounded-full"
                  src={userAvatar}
                />
                <span className="ml-2 px-5">{session.therapist.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">Status</p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            <Badge type={badgeType}>{session.status}</Badge>
          </p>
        </div>
      </div>

      <div className="flex min-w-0 gap-x-4" style={{ width: "150px" }}>
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">Notes</p>
          <p className="mt-1 truncate- text-xs/5 text-gray-500 break-all">
            {session.notes}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">
            Actions
            {/* [{session.id}] */}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {completeable && (
              <button
                className="bg-blue-500 text-white px-2 py-1 hover:underline cursor-pointer mr-1"
                onClick={() => onStatusChange(session.id, "completed")}
              >
                Complete
              </button>
            )}

            {bookable && (
              <button
                className="bg-green-500 text-white px-2 py-1 hover:underline cursor-pointer mr-1"
                onClick={() => onStatusChange(session.id, "scheduled")}
              >
                Book
              </button>
            )}

            {cancelable && (
              <button
                className="bg-orange-500 text-white px-2 py-1 hover:underline cursor-pointer mr-1"
                onClick={() => onStatusChange(session.id, "available")}
              >
                Cancel
              </button>
            )}

            {deletable && (
              <button
                className="bg-red-500 text-white px-2 py-1 hover:underline cursor-pointer mr-1"
                onClick={() => onDelete(session.id)}
              >
                Delete
              </button>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
