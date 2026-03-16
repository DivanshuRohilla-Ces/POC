import payload  from '../../../../data/users.json';

export async function GET(_, { params }) {

  const { id } = await params;
  const user = payload.users.find((user) => user.id === parseInt(id));

  if (!user) {  
    return Response.json({
      success: false,
      message: "User not found",
      data: null
    }, { status: 404 });
  }
  console.log(`GET /api/users/${id} called`);
  return Response.json({
    success: true,
    message: "User details fetched successfully",
    data: user 
  });
}
