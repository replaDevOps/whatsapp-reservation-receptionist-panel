import { gql } from "@apollo/client";

const GET_NOTIFICATIONS = gql`
  query GetAlerts($limit: Int!, $offset: Int!) {
    getAlerts(limit: $limit, offset: $offset) {
      totalCount
      alerts {
        id
        activity
        action
        isRead
        userName
        createdAt
        userId
        userRole
      }
      unreadCount
    }
  }
`

export { GET_NOTIFICATIONS }