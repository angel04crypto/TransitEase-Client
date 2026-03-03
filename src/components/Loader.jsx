import React from 'react';
import { LucideLoader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const Loader = ({ fullScreen = false, size = "md", className }) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10",
    };

    const loaderContent = (
        <div className={cn("flex items-center justify-center p-4", className)}>
            <LucideLoader2 className={cn("animate-spin text-primary", sizes[size])} />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
};

export default Loader;
