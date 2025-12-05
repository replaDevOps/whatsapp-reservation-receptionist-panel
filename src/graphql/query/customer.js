import { gql } from "@apollo/client";

const GET_CUSTOMERS = gql`
    query GetCustomers($limit: Int, $offset: Int, $search: String) {
        getCustomers(limit: $limit, offset: $offset, search: $search) {
            totalCount
            users {
                id
                firstName
                lastName
            }
        }
    }
`

export { GET_CUSTOMERS}