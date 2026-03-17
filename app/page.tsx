import HeadingWithButton from "@/components/headingWithButton";
import Userlist from "../components/userList";
import { getAllUsers } from "../services/user-service";

export default async function Home() {
  const data = await getAllUsers();
  return (
    <div className="flex gap-5 p-1">
      <div className="flex flex-col gap-2.5 w-full p-2" >
        <div>
          <HeadingWithButton link="/add-user" />
        </div>
        <Userlist users={data.users} />
      </div>
    </div>
  );
}
