"use client";
import Link from "next/link";

const headingWithButton = ({ link }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl">Users list</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        <Link href={link}>Add User</Link>
      </button>
    </div>
  );
};

export default headingWithButton;
