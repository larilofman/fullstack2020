import React from 'react'

const Footer = () => {
    return (
        <footer className='footer mt-auto py-3 bg-dark text-white'>
            <div className='d-flex justify-content-center container'>
                <span>
                    Blog application made by Lari Löfman for&nbsp;
                <a className="text-white"
                        href="https://fullstackopen.com/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Fullstack Open Course</a>
                </span>
            </div>
        </footer>
    )
}

export default Footer