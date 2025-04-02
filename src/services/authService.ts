import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    private userModel = UserModel;

    public async validateUser(email: string, password: string): Promise<string> {
        const user = await this.userModel.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = this.generateToken(user.id);
        return token;
    }

    public async createUser(email: string, password: string): Promise<any> {
        const existingUser = await this.userModel.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            email,
            password: hashedPassword,
        });
        return newUser;
    }

    private generateToken(userId: string): string {
        return jwt.sign(
            { id: userId },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "1h" }
        );
    }
}
