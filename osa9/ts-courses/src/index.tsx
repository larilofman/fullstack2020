import React from "react";
import ReactDOM from "react-dom";
import './index.css';

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartWithDesc {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour {
    name: "Test Course Part";
    exerciseCount: number;
    description: string;
    testAttr: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Header: React.FC<{ name: string }> = ({ name }) => (
    <h1>{name}</h1>
);

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map(c => <Part key={c.name} part={c} />)}
        </div>
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    const courseAttrs: JSX.Element[] = [];
    switch (part.name) {
        case 'Fundamentals':
            courseAttrs.push(<p><strong>Description: </strong>{part.description}</p>);
            break;
        case 'Using props to pass data':
            courseAttrs.push(<p><strong>Group Projects: </strong>{part.groupProjectCount}</p>);
            break;
        case 'Deeper type usage':
            courseAttrs.push(<p><strong>Description: </strong>{part.description}</p>);
            courseAttrs.push(<p><strong>Submission Link: </strong>{part.exerciseSubmissionLink}</p>);
            break;
        case 'Test Course Part':
            courseAttrs.push(<p><strong>Description: </strong>{part.description}</p>);
            courseAttrs.push(<p><strong>Test Attribute: </strong>{part.testAttr}</p>);
            break;
        default:
            return assertNever(part);
    }

    return (
        <div>
            <p><strong>Part Name: </strong>{part.name}</p>
            <p><strong>Exercises: </strong>{part.exerciseCount}</p>
            {courseAttrs.map(ca => ca)}
            <br />
        </div >
    );
};

const Total: React.FC<{ totalExercises: number }> = ({ totalExercises }) => (
    <p><strong>Number of exercises: </strong>{totalExercises}</p>
);

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },
        {
            name: "Test Course Part",
            exerciseCount: 3,
            description: "Random text",
            testAttr: "Extra attribute"
        }
    ];
    const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total totalExercises={totalExercises} />
        </div >
    );
};

ReactDOM.render(<App />, document.getElementById("root"));