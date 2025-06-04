'use client'

import React, {useState, useEffect} from 'react';
import Link from "next/link";
import {MoveRight} from "lucide-react";

const ErrorPage: React.FC = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Oh no! Our spaghetti code is not working properly. We will be back soon!";

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i === fullText.length) {
                clearInterval(typing);
            } else {
                setDisplayedText(prev => prev + fullText[i]);
                i++;
            }
        }, 100);

        return () => clearInterval(typing);
    }, []);

    return (
        <div className="min-h-screen bg-blue-400" style={{backgroundColor: '#6BA1CA'}}>
            <style jsx>{`
                @import url("https://fonts.googleapis.com/css?family=VT323");

                .error-500 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'VT323', monospace;
                    color: #1E4B6D;
                    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.3);
                }

                .error-500::after {
                    content: attr(data-text);
                    display: block;
                    margin-top: 33px;
                    font-size: 28pt;
                    text-align: center;
                }

                .spaghetti {
                    width: 280px;
                    height: 180px;
                    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.2));
                    display: block;
                    margin: 0 auto;
                    position: relative;
                }

                .plate {
                    width: 100%;
                    height: 72px;
                    background: #CAD7E4;
                    position: absolute;
                    bottom: 0;
                    border-radius: 0 0 50px 50px;
                    z-index: 4;
                }

                .plate::before {
                    content: '500 Spaghetti Error';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-transform: uppercase;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.2);
                    text-align: center;
                    font-family: 'VT323', monospace;
                }

                .plate::after {
                    content: '';
                    width: 140px;
                    height: 18px;
                    background: #B5C3D0;
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .pasta {
                    width: 70px;
                    height: 70px;
                    border: 5px solid #DEA631;
                    background: #EED269;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 24px;
                    right: 10px;
                    box-shadow: -130px 10px 1px 10px #EED269,
                    -130px 10px 0 15px #DEA631;
                    z-index: 2;
                }

                .pasta::before {
                    content: '';
                    width: 70px;
                    height: 70px;
                    border: 5px solid #DEA631;
                    background: #EED269;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -5px;
                    right: 60px;
                    box-shadow: -100px 10px 1px 1px #EED269,
                    -100px 10px 0 5px #DEA631;
                }

                .pasta::after {
                    content: '';
                    width: 93px;
                    height: 70px;
                    border: 5px solid #DEA631;
                    background: #EED269;
                    border-radius: 50%;
                    position: absolute;
                    bottom: -15px;
                    right: 100px;
                    box-shadow: 70px 10px 1px 1px #EED269,
                    70px 10px 0 5px #DEA631;
                }

                .meat {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #B64C19;
                    position: absolute;
                    bottom: 72px;
                    right: 64px;
                    box-shadow: -150px -2px 0 0 #B64C19,
                    -50px -7px 0 0 #B64C19,
                    -100px 8px 0 0 #B64C19;
                    z-index: 3;
                }

                .fork {
                    width: 20px;
                    height: 150px;
                    background: #D3D3D3;
                    border-right: 3px solid #B7B7B7;
                    border-radius: 50px 50px 0 0;
                    position: absolute;
                    bottom: 25%;
                    left: 75%;
                    transform: translate(-75%, 0%) rotate(25deg);
                }
            `}</style>

            <div className="error-500" data-text={displayedText}>
                <div className="spaghetti">
                    <div className="fork"></div>
                    <div className="meat"></div>
                    <div className="pasta"></div>
                    <div className="plate"></div>
                    <Link href='/' className='text-5xl hover:underline'>Go home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;