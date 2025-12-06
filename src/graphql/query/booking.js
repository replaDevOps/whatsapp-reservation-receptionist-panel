import { gql } from "@apollo/client";


const GET_BOOKINGS = gql`
    query GetAppointments($consumerId: String, $serviceId: String, $branchId: String) {
        getAppointments(consumerId: $consumerId, serviceId: $serviceId, branchId: $branchId) {
            id
            consumer {
                id
                firstName
                lastName
                email
                phone
            }
            appointmentDate
            appointmentTime
            appointmentTimeSlot
            note
            promoCode
            service {
                id
                name
            }
        }
    }
`

export {GET_BOOKINGS}