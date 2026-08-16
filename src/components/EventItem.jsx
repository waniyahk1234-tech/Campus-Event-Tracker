import React from "react";

function EventItem({ event, onDeleteEvent, currentUser }) {
  const isOwner =
    currentUser?.email &&
    event?.userEmail &&
    currentUser.email.toLowerCase() === event.userEmail.toLowerCase();

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between mb-3 w-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md truncate">
            {event.category}
          </span>
          {event.isPrivate && (
            <span className="text-[10px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-md shrink-0">
              Private
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-serif font-medium text-gray-900 mb-1 wrap-break-word">
          {event.title}
        </h3>

        <p className="text-xs text-gray-500 mb-3 leading-relaxed wrap-break-word">
          {event.description}
        </p>

        <div className="text-xs text-gray-600 space-y-1.5">
          <p className="flex items-center">
            <span className="font-semibold text-gray-700">Date:</span>
            <p>
              <strong></strong>{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="truncate max-w-45 text-right">
              {event.location}
            </span>
          </p>
          <p className="text-gray-400 text-xs pt-1 border-t border-gray-100 truncate">
            Posted by: {event.userEmail}
          </p>
        </div>
      </div>

      {isOwner && (
        <div className="mt-3 pt-2.5 border-t border-white flex justify-end">
          <button
            onClick={() => onDeleteEvent(event._id || event.id)}
            className="w-full sm:w-auto text-xs font-medium text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl cursor-pointer text-center"
          >
            Delete Event
          </button>
        </div>
      )}
    </div>
  );
}

export default EventItem;
