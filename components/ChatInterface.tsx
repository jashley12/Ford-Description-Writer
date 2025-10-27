import React, { useState, useRef, useEffect } from 'react';
import type { Message, VehicleType } from '../types';
import { generateDescription } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import VehicleInputForm from './VehicleInputForm';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'model',
      content: "Welcome! Select a vehicle type, then paste an existing vehicle description or a URL below to rewrite and optimize it for Bob Tomes Ford.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (descriptionText: string, vehicleType: VehicleType) => {
    setIsLoading(true);
    setError(null);

    const userMessageContent = `Rewriting the provided information for a ${vehicleType} vehicle...`;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userMessageContent };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const description = await generateDescription(descriptionText, vehicleType);
      const modelMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: description };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `Sorry, I couldn't generate a description. ${errorMessage}`,
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl h-[calc(100vh-150px)] flex flex-col bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {error && <p className="text-red-400 text-center">Error: {error}</p>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <VehicleInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;