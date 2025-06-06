import React from 'react';

interface AvatarProps {
    name?: string;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name = 'Anonymous', size = 40 }) => {
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const colors = [
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
        '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
    ];

    const colorIndex = name.length % colors.length;
    const backgroundColor = colors[colorIndex];

    return (
        <div 
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'normal',
                fontSize: size / 2.5,
            }}
        >
            {initials || 'A'}
        </div>
    );
};

export default Avatar;