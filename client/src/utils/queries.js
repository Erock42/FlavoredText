import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        friendCount
        friends {
        _id
        username
        }
        thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        }
    }
}
`;

export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        friendCount
        thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
        _id
        createdAt
        reactionBody
        username
        }
        }
        friends {
        _id
        username
        }
    }
}
`;

export const QUERY_ME_BASIC = gql`
{
    me {
        _id
        username
        email
        friendCount
        friends {
        _id
        username
        }
    }
}
`;