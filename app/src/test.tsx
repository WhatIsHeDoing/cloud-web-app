import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { User } from "./models";

export const Test: React.FC = () => {
    const { data, error, loading } = useQuery(USERS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error :(</p>;
    }

    return (
        <ul>
            {data.users.map(({ firstName, id, lastName }: User) => (
                <li key={id}>{firstName} {lastName}</li>
            ))}
        </ul>
    );
};

const USERS = gql`
{
    users {
        id
        firstName
        lastName
    }
}
`;
