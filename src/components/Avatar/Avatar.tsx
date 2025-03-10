import React from 'react';

type AvatarProps = {
  photoUrl: string | null;
  name: string;
  onClick?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({ photoUrl, name, onClick }) => {
  const getInitials = (name: string): string => {
    const initials = name
      .split(' ')
      .map(([first]) => first)
      .join('');
    return initials.toUpperCase();
  };

  return (
    <div>
      {photoUrl ? (
        <img
          src={photoUrl}
          title={`Logg ut ${name}`}
          alt={`Profilbilde av ${name}`}
          className="avatar h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
          onClick={onClick}
        />
      ) : (
        <div
          title={`Logg ut ${name}`}
          className="avatar placeholder flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500 text-white transition duration-300 ease-in-out hover:border-2 hover:border-yellow-500 hover:opacity-75"
          onClick={onClick}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
