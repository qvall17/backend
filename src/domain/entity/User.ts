export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export enum UserRole {
    Admin = "admin",
    User = "user",
}
