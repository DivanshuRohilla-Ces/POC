import Userlist from "../components/userList";

export default async function Home() {
  const res = await fetch("https://dummyjson.com/users", { cache: "no-store" });
  const data = await res.json();
  return (
    <div className="flex gap-5 p-1">
      <div className="flex flex-col gap-2.5 w-full p-2" >
        <h1>Users list</h1>
        <Userlist users={data.users} />
      </div>
    </div>
  );
}
