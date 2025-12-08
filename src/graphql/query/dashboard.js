import { gql } from "@apollo/client";

const GET_DASHBOARD_STATS = gql`
    query Appointments {
        getTodayAppointments {
            todayAppoimtemtCount
            todayManualAppointmentCount
            todaycanecledAppointments
            todaywhatsappAppointmentCount
        }
    }
`
export {
    GET_DASHBOARD_STATS
}
