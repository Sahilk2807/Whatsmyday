import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getZodiacSign, getDailyFortune } from './utils/fortune-logic';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// API route for getting the daily fortune
app.get('/api/fortune', (req: Request, res: Response) => {
    const { name, dob } = req.query;

    if (!name || typeof name !== 'string' || !dob || typeof dob !== 'string') {
        return res.status(400).json({ error: 'Name and Date of Birth (YYYY-MM-DD) are required.' });
    }

    // Validate DOB format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        return res.status(400).json({ error: 'Invalid Date of Birth format. Please use YYYY-MM-DD.' });
    }
    
    try {
        const dateOfBirth = new Date(dob);
        if (isNaN(dateOfBirth.getTime())) {
           return res.status(400).json({ error: 'Invalid Date of Birth.' });
        }
      
        const zodiacSign = getZodiacSign(dateOfBirth);
        const fortune = getDailyFortune(zodiacSign, name);

        return res.json(fortune);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.send('AstroWear & Fortune Guide API is running!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});