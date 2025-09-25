import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ 
  isOpen, 
  onClose, 
  message = "Section completed successfully!" 
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 2000); // Show for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      show ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="bg-black bg-opacity-50 absolute inset-0" />
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl transform transition-all duration-300 ${
        show ? 'scale-100' : 'scale-95'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Success!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
