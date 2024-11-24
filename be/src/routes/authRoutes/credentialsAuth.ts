import { Router } from 'express';
import { loginUserHandler } from '@routes/handlers/users/loginUserHandler';

const router = Router();

// Login route
router.post('/login', loginUserHandler);

// Register route
// router.post('/register', async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         // Generate JWT
//         const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

export default router;
