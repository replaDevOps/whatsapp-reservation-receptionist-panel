import { gql } from "@apollo/client";

const GET_APPOINTMENTS_BY_SERVICE_PROVIDER = gql `
    query GetAppointmentsByServiceProvider($serviceProviderId: ID!, $date: DateTime!) {
        getAppointmentsByServiceProvider(serviceProviderId: $serviceProviderId, date: $date) {
            appointmentTimeSlot
            service {
                duration
                bufferTime
            }
        }
    }
`
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
                duration
            }
            serviceProvider {
                id
                imageUrl
                firstName
                lastName
            }
            status
        }
    }
`

export {GET_BOOKINGS, GET_APPOINTMENTS_BY_SERVICE_PROVIDER}