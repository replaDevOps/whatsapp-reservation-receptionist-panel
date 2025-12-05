import { gql } from "@apollo/client";

const GET_VACATIONS = gql`
    query GetVacations($staffId: ID) {
        getVacations(staffId: $staffId) {
            totalVacation
            vacations {
                id
                status
                startDate
                endDate
            }
        }
    }
`

export { GET_VACATIONS }