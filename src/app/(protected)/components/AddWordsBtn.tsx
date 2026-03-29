'use client'

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";

function AddWordsBtn() {
    return (
        <motion.div whileHover="hover">
            <Link
                href={"/add-word"}
                className="flex items-center justify-center gap-2 bg-[rgba(37,177,95,0.9)] text-white text-sm border border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl transition-all hover:bg-[rgba(37,177,95,1)]"
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    // Варианты анимации
                    variants={{
                        hover: {
                            rotate: 360,
                            transition: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }
                    }}
                >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                </motion.svg>
                <span>Add Word</span>
            </Link>
        </motion.div>
    );
}

export default AddWordsBtn;