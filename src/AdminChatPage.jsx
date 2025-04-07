// New Admin Chat Page - Stylish like WhatsApp
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function AdminChatPage() {
  const [chatLog, setChatLog] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "chat"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChatLog(messages);
    });
    return () => unsubscribe();
  }, []);

  const users = [...new Set(chatLog.filter(m => m.userName !== "Abdallah").map(m => m.userName))];

  const messagesForUser = chatLog.filter(
    m => m.userName === selectedUser || m.recipient === selectedUser
  );

  return (
    <div className="h-screen w-screen flex bg-gray-950 text-green-100">
      <aside className="w-1/3 border-r border-green-800 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user}
            className={
              "p-2 rounded-lg cursor-pointer mb-2 " +
              (selectedUser === user ? "bg-green-700" : "hover:bg-green-800")
            }
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 border-b border-green-700 pb-2">
          {selectedUser ? `Chat with ${selectedUser}` : "Select a user"}
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3">
          {messagesForUser.map((msg) => (
            <div
              key={msg.id}
              className={
                "p-3 max-w-[70%] rounded-2xl " +
                (msg.userName === "Abdallah"
                  ? "bg-green-800 self-end text-right"
                  : "bg-green-600 self-start text-left")
              }
            >
              <div>{msg.user}</div>
              <div className="text-xs text-green-300 mt-1">{msg.time}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
