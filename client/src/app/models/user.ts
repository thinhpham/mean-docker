export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isPasswordHashed: boolean;
    isConfirmed: boolean;
    isAdmin: boolean;
    lastLogin: Date;
    createdBy: string;
    createdOn: Date;
    updatedBy: string;
    updatedOn: Date;
}