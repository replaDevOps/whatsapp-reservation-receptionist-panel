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
    query GetAppointments($serviceId: String, $branchId: String, $serviceProviderId: String) {
        getAppointments(serviceId: $serviceId, branchId: $branchId, serviceProviderId: $serviceProviderId) {
            totalCount
            appointments {
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
                cancelReason
                reminderMinutesBefore
                bookingType
                service {
                    id
                    name
                    duration
                    price
                }
                serviceProvider {
                    id
                    imageUrl
                    firstName
                    lastName
                }
                status
                promotion {
                    id
                    name
                }
            }
        }
    }
`

const VERIFY_PROMOTION_CODE = gql`
    query VerifyPromotion($name: String!) {
        verifyPromotion(name: $name) {
            id
            status
        }
    }
`

export {GET_BOOKINGS, GET_APPOINTMENTS_BY_SERVICE_PROVIDER, VERIFY_PROMOTION_CODE}