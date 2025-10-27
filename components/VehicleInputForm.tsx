import React, { useState } from 'react';
import Loader from './Loader';
import type { VehicleType } from '../types';

interface VehicleInputFormProps {
  onSubmit: (descriptionText: string, vehicleType: VehicleType) => void;
  isLoading: boolean;
}

const VehicleInputForm: React.FC<VehicleInputFormProps> = ({ onSubmit, isLoading }) => {
  const [descriptionText, setDescriptionText] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('used');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !descriptionText.trim()) return;
    onSubmit(descriptionText, vehicleType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-grow w-full">
                <label htmlFor="descriptionText" className="block text-sm font-medium text-gray-300 mb-2">
                    Paste Vehicle URL or Existing Description
                </label>
            </div>
            <div className="flex-shrink-0">
                <span className="block text-sm font-medium text-gray-300 mb-2 text-center sm:text-right">Vehicle Type</span>
                <div className="relative flex w-full sm:w-auto p-1 bg-gray-700 rounded-md border border-gray-600">
                    <button type="button" onClick={() => setVehicleType('new')} className={`relative w-1/2 sm:w-auto flex-grow px-4 py-1 text-sm font-semibold rounded transition-colors duration-200 ${vehicleType === 'new' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>New</button>
                    <button type="button" onClick={() => setVehicleType('used')} className={`relative w-1/2 sm:w-auto flex-grow px-4 py-1 text-sm font-semibold rounded transition-colors duration-200 ${vehicleType === 'used' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}>Used</button>
                </div>
            </div>
        </div>
        <div>
            <textarea
                id="descriptionText"
                placeholder="e.g., For sale is a 2021 Ford F-150 XLT with 24k miles. This one-owner vehicle has a clean CARFAX and features a panoramic sunroof, leather seats, and advanced driver-assist technology..."
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                className="w-full bg-gray-700 text-white placeholder-gray-500 p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                rows={5}
                required
            />
        </div>
      <button 
        type="submit"
        disabled={isLoading || !descriptionText.trim()}
        className="w-full flex justify-center items-center bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? <Loader /> : 'Rewrite & Optimize Description'}
      </button>
    </form>
  );
};

export default VehicleInputForm;