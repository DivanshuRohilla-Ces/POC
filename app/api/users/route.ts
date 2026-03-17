import payload  from '../../../data/users.json'
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        console.log("GET /api/getUsersList called");
        return new Response(JSON.stringify(payload), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in GET /api/getUsersList:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function POST(request: Request) {
    try {
        console.log("POST /api/users called", request);
        const data = await request.json();
        console.log("POST /api/users called", request, data);
        
        const filePath = join(process.cwd(), 'data', 'users.json');
        const fileContent = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(fileContent);
        
        // Get the highest ID and increment
        const maxId = usersData.users.length > 0 
            ? Math.max(...usersData.users.map((u: any) => u.id))
            : 0;
        
        const newUser = {
            id: maxId + 1,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            age: parseInt(data.age),
            birthDate: data.birthDate,
            image: `https://randomuser.me/api/portraits/men/${maxId + 1}.jpg`
        };
        
        usersData.users.push(newUser);
        
        await writeFile(filePath, JSON.stringify(usersData, null, 4));
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: "User added successfully",
            user: newUser 
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in POST /api/users:", error);
        return new Response(
            JSON.stringify({ error: "Failed to add user", details: String(error) }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');
        
        if (!userId) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const filePath = join(process.cwd(), 'data', 'users.json');
        const fileContent = await readFile(filePath, 'utf-8');
        const usersData = JSON.parse(fileContent);
        
        const userIndex = usersData.users.findIndex((u: any) => u.id === parseInt(userId));
        
        if (userIndex === -1) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
        
        const deletedUser = usersData.users.splice(userIndex, 1);
        await writeFile(filePath, JSON.stringify(usersData, null, 4));
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: "User deleted successfully",
            user: deletedUser[0]
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in DELETE /api/users:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete user", details: String(error) }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}