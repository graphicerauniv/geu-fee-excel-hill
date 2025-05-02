"use server";

export const USERS = [
    { id: "ashish", name: "Ashish", password: "xT9p#2Lq7@Zs5*Kf8!Vb3" },
    { id: "aaditya", name: "Aaditya", password: "mR7k$4Dj9@Pn2*Wq6!Yz5" },
    { id: "sauhard", name: "Sauhard", password: "bL3g#8Vf5@Ht6*Jc9!Qe1" },
    { id: "aman", name: "Aman", password: "xT9p#2Lq7@Zs5*Kf2!Vb3" },
];

type User = {
    id: string;
    name: string;
};

/**
 * Checks if the current request has a valid admin password
 */
export function isAdminRequest(searchParams: {
    [key: string]: string | string[] | undefined;
}): [boolean, User | null] {
    const password = searchParams.password;
    const user = searchParams.user;

    // Handle both string and string[] types
    const passwordValue = Array.isArray(password) ? password[0] : password;
    const userValue = Array.isArray(user) ? user[0] : user;

    // If the password or user is not provided, return false and null
    if (!passwordValue || !userValue) {
        return [false, null];
    }

    // Check if the user and password are valid
    const foundUser = USERS.find(
        (user) => user.id === userValue && user.password === passwordValue
    );
    if (!foundUser) {
        return [false, null];
    }

    // Return the user id and name
    const toReturn = {
        id: foundUser.id,
        name: foundUser.name,
    };

    return [true, toReturn];
}
