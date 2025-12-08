
import { gql } from "@apollo/client";

const CANCEL_APPOINTMENT = gql`
    mutation UpdateAppointment($input: UpdateAppointmentInput!) {
        updateAppointment(input: $input) {
            id
        }
    }
`
export {CANCEL_APPOINTMENT}