export class User {
    _id: String;
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    isPasswordHashed: Boolean;
    isAdmin: Boolean;
    lastLogin: Date;
    createdBy: String;
    createdOn: Date;
    updatedBy: String;
    updatedOn: Date;
}