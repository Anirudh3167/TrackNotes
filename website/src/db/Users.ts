// import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const usersFilePath = path.join(process.cwd(), 'users.json');

// Helper function to read users from the JSON file
export function readUsers (): User[] {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
  const jsonData = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(jsonData);
};

// Helper function to write users to the JSON file
export function writeUsers(users: User[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// // API route handler
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     // Retrieve users
//     const users = readUsers();
//     res.status(200).json(users);
//   } else if (req.method === 'POST') {
//     // Add a new user
//     const { username, password, email } = req.body;

//     if (!username || !password || !email) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const users = readUsers();
//     const newUser: User = {
//       id: users.length > 0 ? users[users.length - 1].id + 1 : 1, // Auto-increment ID
//       username,
//       password,
//       email,
//     };

//     users.push(newUser);
//     writeUsers(users);
//     res.status(201).json(newUser);
//   } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }