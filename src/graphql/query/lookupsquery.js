import { gql } from "@apollo/client"

const GET_BRANCHES_LOOKUP = gql`
    query GetBusinessBranches($businessId: ID!) {
        getBusinessBranches(businessId: $businessId) {
            id
            name
        }
    }
`

const GET_SERVICES_LOOKUPS = gql`
    query GetServicesByBusinessid($businessId: ID!) {
        getServicesByBusinessid(businessId: $businessId) {
            id
            name
        }
    }
`

export { GET_BRANCHES_LOOKUP, GET_SERVICES_LOOKUPS }