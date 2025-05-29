import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'rounded font-medium transition-all duration-300 ease-in-out inline-flex justify-center items-center';
  
  // Ensuring text color always contrasts with background color
  const variantClasses = {
    primary: 'bg-green-600 text-black hover:bg-green-700 hover:text-white active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50',
    secondary: 'bg-red-600 text-white hover:bg-red-700 hover:text-white active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
    outline: 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 active:bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-opacity-25',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;