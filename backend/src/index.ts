import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getZodiacSign, getDailyFortune } from './utils/fortune-logic';
import path from 'path'; // ⬅️ ADD THIS LINE

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ⬇️ ADD THIS SECTION TO SERVE THE FRONTEND
// -------------------------------------------------------------------
// This tells Express to serve any static files from the frontend's build directory
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));
// -------------------------------------------------------------------

// API route for getting the daily fortune
app.get('/api/fortune', (req: Request, res: Response) => {
    const { name, dob } = req.query;

    if (!name || typeof name !== 'string' || !dob || typeof dob !== 'string') {
        return res.status(400).json({ error: 'Name and Date of Birth (YYYY-MM-DD) are required.' });
    }

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
app.get('/api/health', (req: Request, res: Response) => {
    res.send('AstroWear & Fortune Guide API is running!');
});

// ⬇️ ADD THIS CATCH-ALL ROUTE AT THE VERY END
// -------------------------------------------------------------------
// This handles any requests that don't match the ones above
// and sends back the main index.html file. This is crucial for single-page apps.
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});
// -------------------------------------------------------------------

app.listen(PORT, '0.0.0.0', () => { // ⬅️ ADD '0.0.0.0'
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✨ Access it from any device on your network!`);
});