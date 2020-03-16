import React from 'react'

const Header = (props) => {
    return (<h2>{props.course.name}</h2>)
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = ({ total }) => {

    return (
        <strong>Total number of exercises {total}</strong>
    )
}

const Course = ({ course }) => {

    const total = course.parts.reduce((prev, cur) => {
        return prev + cur.exercises
    }, 0)

    return (
        <div>
            <Header course={course} />

            <Content parts={course.parts} />

            <Total total={total} />
        </div >
    )
}

export default Course