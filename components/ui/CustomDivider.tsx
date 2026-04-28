import React, { CSSProperties } from 'react';

interface CustomDividerProps {
    style?: CSSProperties;
    className?: string;
}

export function CustomDivider({ style, className }: CustomDividerProps) {
    return (
        <div
            className={className}
            style={{
                width: '100%',
                height: '3px',
                background: 'linear-gradient(to right, #007A33 0%, #007A33 33%, #0033A0 33%, #0033A0 66%, #FFD100 66%, #FFD100 100%)',
                marginBottom: '20px',
                ...style,
            }}
        />
    );
}
