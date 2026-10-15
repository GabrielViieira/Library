export interface UserProps {
    id?: string;
    username: string;
    password: string;
    email: string;
    birth: Date;
    role?: string[];
    imageUrl?: string;
    bio?: string;
}

export class User {
    public readonly id?: string;
    public readonly username: string;
    public readonly password: string;
    public readonly email: string;
    public readonly birth: Date;
    public readonly role: string[];
    public readonly imageUrl?: string | undefined;
    public readonly bio?: string | undefined;


    constructor(props: UserProps) {
        this.id = props.id!;
        this.username = props.username;
        this.password = props.password;
        this.email = props.email;
        this.birth = props.birth;
        this.role = props.role!;
        this.imageUrl = props.imageUrl;
        this.bio = props.bio;
    }

    public toResponse() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
        }
    }
}