'use client'

import Link from "next/link";

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-3 bg-gray-800 text-white font-sans text-3xl">
            <style jsx>{`
                * {
                    box-sizing: border-box;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    transform-style: preserve-3d;
                }

                *:focus {
                    outline: none !important;
                }

                ::selection {
                    background: none;
                }

                .main-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .left-section {
                    display: flex;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    text-align: right;
                    z-index: 1;
                }

                .right-section {
                    display: flex;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    z-index: 0;
                    margin-left: -50px;
                }

                .text-content {
                    display: block;
                    position: relative;
                    z-index: 0;
                    padding: 0 12px;
                    line-height: 1.4;
                }

                .svg-icon {
                    width: 50px;
                    height: auto;
                    position: relative;
                    z-index: 1;
                }

                .crack-svg {
                    position: relative;
                    z-index: 4;
                    margin-left: -50px;
                    width: 50px;
                    height: auto;
                }

                .polygon-fill {
                    fill: #343434;
                }

                .crack-line {
                    fill: none;
                    stroke: #F04F54;
                    stroke-width: 10px;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 1649.099;
                    stroke-dashoffset: 1649.099;
                    animation: drawStroke 1500ms ease-out 500ms forwards;
                }

                .left-first-span {
                    opacity: 0;
                    transform: translateX(100%);
                    animation: translateLeft 1000ms linear 1250ms forwards;
                }

                .left-second-span {
                    opacity: 0;
                    transform: translateX(100%);
                    animation: translateLeft 1000ms linear 1450ms forwards;
                }

                .right-first-span {
                    opacity: 0;
                    transform: translateX(-100%);
                    animation: translateRight 1000ms linear 1650ms forwards;
                }

                .right-second-span {
                    opacity: 0;
                    transform: translateX(-100%);
                    animation: translateRight 1000ms linear 1850ms forwards;
                }

                .left-polygon {
                    animation: removeFill 10ms ease-out 1600ms forwards;
                }

                .return-link {
                    display: block;
                    cursor: pointer;
                    animation: pulseColor 1000ms linear 3100ms forwards;
                    font-weight: 500;
                }

                .return-link:hover .return-text,
                .return-link:focus .return-text {
                    color: #F04F54;
                }

                .return-link:active .return-text {
                    color: #43CB9D;
                }

                @keyframes drawStroke {
                    0% {
                        stroke-dashoffset: 1649.099;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes removeFill {
                    0% {
                        fill: rgba(52, 52, 52, 1);
                    }
                    100% {
                        fill: rgba(52, 52, 52, 0);
                    }
                }

                @keyframes pulseColor {
                    0% {
                        color: white;
                    }
                    25% {
                        color: #43CB9D;
                    }
                    50% {
                        color: white;
                    }
                    75% {
                        color: #43CB9D;
                    }
                    100% {
                        color: white;
                    }
                }

                @keyframes translateLeft {
                    0% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 150, 0, 0, 1);
                        opacity: 1;
                    }
                    7.61% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 69.561, 0, 0, 1);
                    }
                    11.41% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 39.355, 0, 0, 1);
                    }
                    15.12% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 17.801, 0, 0, 1);
                    }
                    18.92% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3.02, 0, 0, 1);
                    }
                    22.72% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -5.661, 0, 0, 1);
                    }
                    30.23% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10.852, 0, 0, 1);
                    }
                    50.25% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2.282, 0, 0, 1);
                    }
                    70.27% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.519, 0, 0, 1);
                    }
                    100% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                        opacity: 1;
                    }
                }

                @keyframes translateRight {
                    0% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -150, 0, 0, 1);
                        opacity: 1;
                    }
                    7.61% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -69.561, 0, 0, 1);
                    }
                    11.41% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -39.355, 0, 0, 1);
                    }
                    15.12% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -17.801, 0, 0, 1);
                    }
                    18.92% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.02, 0, 0, 1);
                    }
                    22.72% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5.661, 0, 0, 1);
                    }
                    30.23% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10.852, 0, 0, 1);
                    }
                    50.25% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2.282, 0, 0, 1);
                    }
                    70.27% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.519, 0, 0, 1);
                    }
                    100% {
                        transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                        opacity: 1;
                    }
                }
            `}</style>

            <main className="main-container">
                <div className="left-section">
                    <div>
                        <span className="text-content left-first-span text-2xl">404&nbsp;error</span>
                        <span className="text-content left-second-span text-2xl">page&nbsp;not&nbsp;found</span>
                    </div>
                    <svg className="svg-icon" viewBox="0 0 200 600">
                        <polygon
                            className="polygon-fill left-polygon"
                            points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 200 591.044514 200 8"
                        />
                    </svg>
                </div>

                <svg className="crack-svg" viewBox="0 0 200 600">
                    <polyline
                        className="crack-line"
                        points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514"
                    />
                </svg>

                <div className="right-section">
                    <svg className="svg-icon" viewBox="0 0 200 600">
                        <polygon
                            className="polygon-fill"
                            points="118.302698 8 59.5369448 66.7657528 186.487016 193.715824 14 366.202839 153.491505 505.694344 68.1413353 591.044514 0 591.044514 0 8"
                        />
                    </svg>
                    <div>
                        <span className="text-content right-first-span text-2xl">sorry&nbsp;about&nbsp;that!</span>
                        <span className="text-content right-second-span text-2xl">
              <Link href="/" className="return-link return-text text-2xl">Go home</Link>
            </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PageNotFound;