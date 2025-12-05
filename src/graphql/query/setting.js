import { gql } from "@apollo/client";

const GET_USERS_BY_ID = gql`
    query GetUser($getUserId: ID) {
        getUser(id: $getUserId) {
            id
            firstName
            lastName
            phone
            email
            role
            createdAt
            imageUrl
            branch {
                id
                name
            }
            scheduleHours {
                id
                openTime
                closeTime
                dayOfWeek
                isClosed
            }
        }
    }
`



export { GET_USERS_BY_ID }