interface ExerciseValues {
    target: number;
    dailyExerciseHours: Array<number>;
}

const parseArgs = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const argsAsNums: Array<number> = args.slice(2).map(n => Number(n));
    argsAsNums.forEach(num => {
        if (isNaN(num)) {
            throw new Error('Provided values were not numbers');
        }
    });

    return {
        target: argsAsNums[0],
        dailyExerciseHours: argsAsNums.slice(1)
    };
};

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Rating {
    rating: 1 | 2 | 3;
    description: string;
}

export const calculateExercises = (dailyExerciseHours: Array<number>, targetAmount: number): Result => {
    const periodLength: number = dailyExerciseHours.length;
    const totalHours = Number(dailyExerciseHours.reduce((a: number, b: number) => a + b, 0));
    const avgHours = totalHours / periodLength;

    const getRating = (): Rating => {
        if (avgHours - 0.5 > targetAmount) {
            return { rating: 3, description: 'excellent job' };
        } else if (avgHours + 0.5 < targetAmount) {
            return { rating: 1, description: 'bad' };
        } else {
            return { rating: 2, description: 'not too bad but could be better' };
        }
    };

    const { rating, description } = getRating();

    return {
        periodLength,
        trainingDays: dailyExerciseHours.filter(hours => hours > 0).length,
        success: avgHours >= targetAmount,
        rating,
        ratingDescription: description,
        target: targetAmount,
        average: avgHours
    };
};

try {
    const { target, dailyExerciseHours } = parseArgs(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}