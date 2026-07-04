import { gql } from "@apollo/client";

const GET_DASHBOARD_STATS = gql`
  query GetTodayAppointments {
    getTodayAppointments {
      todayAppoimtemtCount
      todayManualAppointmentCount
      todaycanecledAppointments
      todaywhatsappAppointmentCount
    }
  }
`;
export { GET_DASHBOARD_STATS };
