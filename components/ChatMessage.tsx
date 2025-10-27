
import React from 'react';
import type { Message } from '../types';
import CopyButton from './CopyButton';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-4 ${isModel ? '' : 'justify-end'}`}>
      {isModel && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <BotIcon />
        </div>
      )}
      
      <div className={`max-w-xl p-4 rounded-lg shadow-md relative ${
          isModel 
            ? 'bg-gray-700 text-gray-200' 
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
        {isModel && message.id !== 'initial' && (
          <CopyButton textToCopy={message.content} />
        )}
      </div>

      {!isModel && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
