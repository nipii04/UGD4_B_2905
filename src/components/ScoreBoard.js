import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, onReset, difficulty, onDifficultyChange, time, isGameComplete }) {
    // Fungsi mengubah detik menjadi format MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="text-center mb-6 w-full max-w-lg">
            {/* Pilihan Difficulty */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-6">
                <button onClick={() => onDifficultyChange(4)} className={`px-4 py-2 text-sm sm:text-base rounded-full font-semibold transition-all duration-300 ${difficulty === 4 ? 'bg-yellow-400 text-indigo-900 shadow-lg scale-105' : 'bg-white/20 text-indigo-200 hover:bg-white/30'}`}>Easy (4)</button>
                <button onClick={() => onDifficultyChange(6)} className={`px-4 py-2 text-sm sm:text-base rounded-full font-semibold transition-all duration-300 ${difficulty === 6 ? 'bg-yellow-400 text-indigo-900 shadow-lg scale-105' : 'bg-white/20 text-indigo-200 hover:bg-white/30'}`}>Medium (6)</button>
                <button onClick={() => onDifficultyChange(8)} className={`px-4 py-2 text-sm sm:text-base rounded-full font-semibold transition-all duration-300 ${difficulty === 8 ? 'bg-yellow-400 text-indigo-900 shadow-lg scale-105' : 'bg-white/20 text-indigo-200 hover:bg-white/30'}`}>Hard (8)</button>
            </div>

            {/* Area Statistik (Timer diletakkan di samping Percobaan) */}
            <div className="flex justify-center gap-4 sm:gap-8 mb-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
                    <p className="text-xs sm:text-sm text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider">
                        <FaClock className="text-indigo-300" /> Waktu
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{formatTime(time)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
                    <p className="text-xs sm:text-sm text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider">
                        <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{moves}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[90px]">
                    <p className="text-xs sm:text-sm text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wider">
                        <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
                </div>
            </div>

            {/* Pesan Kemenangan */}
            {isGameComplete && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 mb-4 backdrop-blur-sm">
                    <p className="text-green-300 font-bold text-sm sm:text-base animate-pulse">
                        ▶ Selamat! Selesai dalam waktu {formatTime(time)} dengan {moves} percobaan!
                    </p>
                </div>
            )}

            {/* Tombol Acak */}
            <button
                onClick={onReset}
                className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto"
            >
                {isGameComplete ? <><FaRedo /> Main Lagi</> : <><FaSyncAlt /> Acak Ulang</>}
            </button>
        </div>
    );
}

export default ScoreBoard;