import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.log(height, weight);
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    let dailyExercises = req.body.daily_exercises;
    let target = req.body.target;

    if (!dailyExercises || !target) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dailyExercises = dailyExercises.map((d: any) => Number(d));
    target = Number(target);

    if (dailyExercises.concat(target).includes(NaN)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    } else {
        const calculation = calculateExercises(dailyExercises, target);
        return res.json(calculation);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});