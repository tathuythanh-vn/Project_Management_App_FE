'use client'

const LoadingScreen: React.FC = () => {
    return (
        <div
            className="min-h-screen w-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 font-mono">
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

                .loading-container {
                    position: relative;
                }

                .loading-container::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    background-color: #fff;
                    bottom: 0;
                    left: 0;
                    border-radius: 10px;
                    animation: movingLine 2.4s infinite ease-in-out;
                }

                @keyframes movingLine {
                    0% {
                        opacity: 0;
                        width: 0;
                    }
                    33.3%, 66% {
                        opacity: 0.8;
                        width: 100%;
                    }
                    85% {
                        width: 0;
                        left: initial;
                        right: 0;
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        width: 0;
                    }
                }

                .loading-letter {
                    animation: moveLetters 2.4s infinite ease-in-out;
                    transform: translateX(0);
                    position: relative;
                    display: inline-block;
                    opacity: 0;
                    text-shadow: 0px 2px 10px rgba(46, 74, 81, 0.3);
                }

                .loading-letter:nth-child(1) {
                    animation-delay: 0.1s;
                }

                .loading-letter:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .loading-letter:nth-child(3) {
                    animation-delay: 0.3s;
                }

                .loading-letter:nth-child(4) {
                    animation-delay: 0.4s;
                }

                .loading-letter:nth-child(5) {
                    animation-delay: 0.5s;
                }

                .loading-letter:nth-child(6) {
                    animation-delay: 0.6s;
                }

                .loading-letter:nth-child(7) {
                    animation-delay: 0.7s;
                }

                @keyframes moveLetters {
                    0% {
                        transform: translateX(-15vw);
                        opacity: 0;
                    }
                    33.3%, 66% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(15vw);
                        opacity: 0;
                    }
                }

                .social-link {
                    transition: transform 0.2s ease;
                }

                .social-link:hover {
                    transform: scale(1.1);
                }
            `}</style>

            <div className="w-full max-w-2xl text-center text-white relative mx-8">
                <div className="loading-container">
                    <div
                        className="leading-16 tracking-widest mb-8 flex justify-evenly font-bold"
                        style={{fontFamily: 'Montserrat, sans-serif'}}>
                        {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
                            <span key={index} className="loading-letter text-5xl md:text-6xl lg:text-7xl">
                {letter}
              </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed top-4 right-4 flex items-center space-x-3">
                <a
                    href="https://www.linkedin.com/in/huythanh1511/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link text-white hover:text-blue-200 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default LoadingScreen;