import { gql } from "@apollo/client"

const GET_BRANCHES_LOOKUP = gql`
    query GetBusinessBranches($businessId: ID!) {
        getBusinessBranches(businessId: $businessId) {
            id
            name
        }
    }
`

const GET_SERVICES_BY_BRANCH_LOOKUP = gql`
    query GetServicesBybranchid($branchId: ID!) {
        getServicesBybranchid(branchId: $branchId) {
            id
            name
            duration
            bufferTime
        }
    }
`

const GET_SERVICE_PROVIDER_BY_BRANCH = gql`
    query GetServiceProvidersByBranch($branchId: ID!) {
        getServiceProvidersByBranch(branchId: $branchId) {
            id
            firstName
            lastName
        }
    }
`

export { GET_BRANCHES_LOOKUP, GET_SERVICES_BY_BRANCH_LOOKUP, GET_SERVICE_PROVIDER_BY_BRANCH }