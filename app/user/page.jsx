
import Image from "next/image";
import RenderUsers from "../../components/renderList";

export default async function User({ searchParams }) {
  const { userId } = await searchParams;
  let user = null;
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    user = await res.json();
    console.log(user);
  } catch (err) {
    return <div>API failed: {err.message}</div>;
  }

  return (
    <div style={{ border: "2px solid", padding: "20px" }}>
      <h1 style={{ color: "grey" }}>User Details</h1>

      {user?.image && (
        <Image
          src={user.image}
          alt="User Image"
          width={100}
          height={100}
          loading="lazy"
        />
      )}
           {RenderUsers(user)}
    </div>
  );
}