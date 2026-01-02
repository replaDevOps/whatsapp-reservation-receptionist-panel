
import { gql } from "@apollo/client";

const UPDATE_APPOINTMENT = gql`
    mutation UpdateAppointment($input: UpdateAppointmentInput!) {
        updateAppointment(input: $input) {
            id
        }
    }
`
export {UPDATE_APPOINTMENT}