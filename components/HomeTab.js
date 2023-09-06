import React, { useState, useEffect } from 'react';

export default function HomeTab() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admins?action=user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            fetchUser();
        }
    }, [token]);
  return (
    <>
    <p className="text-2xl font-bold">Welcome, {user?.name}</p>
    </>
  )
}
