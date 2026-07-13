/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, value, onValueChange, className = "" }) => {
  return (
    <div className={`flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeValue: value, onValueChange } as any);
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  activeValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  activeValue,
  onValueChange,
  children,
  className = "",
}) => {
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      onClick={() => onValueChange && onValueChange(value)}
      className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
        isActive
          ? "bg-white dark:bg-gray-950 text-blue-600 dark:text-blue-400 shadow"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      } ${className}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  activeValue?: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeValue, children, className = "" }) => {
  if (value !== activeValue) return null;
  return <div className={`pt-2 ${className}`}>{children}</div>;
};
