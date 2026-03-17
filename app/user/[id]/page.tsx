
import Image from "next/image";
import RenderUsers from "../../../components/renderUsers";
import { getUserDetails } from "../../../services/user-service";

export default async function User({ params }) {
  const  userId  = await params;
  let user = await getUserDetails(userId.id);
  return (
    <div className="border-2 border-gray-300 p-5 bg-violet-200 m-2 rounded-lg shadow-md">
      <h1 className="text-gray-500">User Details</h1>

      {user?.image && (
        <Image
          src={user.image}
          alt="User Image"
          width={100}
          height={100}
          loading="lazy"
        />
      )}
       <RenderUsers user={user} />
    </div>
  );
}