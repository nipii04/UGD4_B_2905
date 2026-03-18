'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaBolt, FaGem, FaBell, FaMoon } from 'react-icons/fa';

// Siapkan 8 pasang icon untuk mode Hard
const ALL_ICONS = [
    { icon: FaAppleAlt, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
    { icon: FaBolt, color: '#3b82f6' },
    { icon: FaGem, color: '#8b5cf6' },
    { icon: FaBell, color: '#14b8a6' },
    { icon: FaMoon, color: '#64748b' },
];

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const createCards = (pairCount) => {
    // Ambil jumlah icon sesuai dengan kesulitan (4, 6, atau 8)
    const selectedIcons = ALL_ICONS.slice(0, pairCount);
    const paired = selectedIcons.flatMap((item, index) => [
        { id: index * 2, icon: item.icon, color: item.color, pairId: index },
        { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
    ]);
    return shuffleArray(paired);
};

export default function Home() {
    const [difficulty, setDifficulty] = useState(4); // Default ke Easy (4 pasang)
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    // State untuk Timer
    const [time, setTime] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true); // Langsung true agar otomatis jalan

    // Render ulang kartu kalau difficulty diubah
    useEffect(() => {
        resetGame(difficulty);
    }, [difficulty]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else if (!isTimerActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, time]);

    // Logic saat 2 kartu terbuka
    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstId, secondId] = flippedCards;
            const firstCard = cards.find((c) => c.id === firstId);
            const secondCard = cards.find((c) => c.id === secondId);

            setMoves((prev) => prev + 1);

            if (firstCard.pairId === secondCard.pairId) {
                setMatchedCards((prev) => {
                    const newMatched = [...prev, firstId, secondId];
                    // Jika semua sudah ketemu, matikan timer
                    if (newMatched.length === cards.length) {
                        setIsTimerActive(false); 
                    }
                    return newMatched;
                });
                setFlippedCards([]);
            } else {
                const timer = setTimeout(() => {
                    setFlippedCards([]);
                }, 800);
                return () => clearTimeout(timer);
            }
        }
    }, [flippedCards, cards]);

    const handleCardFlip = (id) => {
        // Baris pemicu timer dihapus karena timer sudah otomatis berjalan sejak awal

        if (flippedCards.length < 2 && !flippedCards.includes(id)) {
            setFlippedCards((prev) => [...prev, id]);
        }
    };

    const resetGame = (pairs = difficulty) => {
        setCards(createCards(pairs));
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTime(0); // Reset waktu ke 0
        setIsTimerActive(true); // Langsung jalankan timer kembali
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
            <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
                <GiCardJoker className="text-yellow-300 text-4xl" />
                Memory Card
            </h1>
            
            <ScoreBoard
                moves={moves}
                matchedCount={matchedCards.length / 2}
                totalPairs={difficulty}
                onReset={() => resetGame(difficulty)}
                difficulty={difficulty}
                onDifficultyChange={(newDiff) => setDifficulty(newDiff)}
                time={time}
                isGameComplete={matchedCards.length === cards.length && cards.length > 0}
            />

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mt-2">
                <GameBoard
                    cards={cards}
                    flippedCards={flippedCards}
                    matchedCards={matchedCards}
                    onFlip={handleCardFlip}
                />
            </div>
        </div>
    );
}