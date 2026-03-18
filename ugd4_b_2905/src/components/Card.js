import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    const cardClass = `w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none transition-all duration-300 transform ` +
        (isOpen
            ? `bg-white shadow-xl scale-105 border-b-4 border-gray-200 `
            : `bg-gradient-to-br from-pink-500 to-orange-400 shadow-md hover:scale-110 hover:-translate-y-2 hover:shadow-orange-500/50 hover:shadow-2xl `) +
        (isMatched ? `!opacity-60 ring-2 ring-green-400 !scale-95 bg-green-50 ` : ``);

    return (
        <div onClick={handleClick} className={cardClass}>
            {isOpen ? (
                <span className="animate-spin-once">
                    <IconComponent style={{ color: card.color }} />
                </span>
            ) : (
                <span>
                    <FaQuestion className="text-white/60 text-xl sm:text-2xl" />
                </span>
            )}
        </div>
    );
}

export default Card;