import React from 'react';


interface CardProps {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
}

const UserCard: React.FC<CardProps> = (props) => {
    return (
        <div className="">
            <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-w-1/3 rounded-lg drop-shadow-md m-7 p-4 text-center">
                <div className="font-medium text-start">{props.id}</div>
                <div className="font-medium text-start">{props.name}</div>
                <div className="font-medium text-start">{props.email}</div>
                <div className="font-medium text-start">{props.age}</div>
                <div className="font-medium text-start">{props.city}</div>
            </div>
        </div>

    );
};

export default UserCard;
