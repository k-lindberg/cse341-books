import express from 'express';
import { getDb } from './src/db/connect.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

app.get('/books', async (req, res) => {
    try {
        const books = await getDb()
            .collection('books')
            .find({})
            .toArray();
        
        return res.status(200).json(books);
    } catch (error) {
        console.error('Failed to retrieve books:', error.message);
        return res.status(500).json({ message: 'Failed to retrieve books' });
    }
});

export default app;