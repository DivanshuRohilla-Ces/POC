import { Users } from "../app/types";

export default function RenderUsers(obj: Users) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="ml-2.5 w-1/2">
          <strong>{key}:</strong>
          {RenderUsers(value)}
        </div>
      );
    }

    return (
      <p key={key}>
        <strong>{key}:</strong> {String(value)}
      </p>
    );
  });
}