import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const token = await this.authService.validateUser(email, password);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                res.status(401).json({ message: 'An unknown error occurred' });
            }
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const user = await this.authService.createUser(email, password);
            res.status(201).json({ user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }
}



export default AuthController;