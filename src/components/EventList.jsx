import React from "react";
import EventItem from "./EventItem";

function EventList({ events, onDeleteEvent, currentUser }) {
  if (events.length === 0) {
    return (
      <div className="bg-white/80 p-8 rounded-2xl border border-gray-200 text-center">
        <p className="text-sm text-gray-500">No events found...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventItem
          key={event._id}
          event={event}
          onDeleteEvent={onDeleteEvent}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default EventList;
