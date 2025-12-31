import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String, $role: UserRole!) {
    loginUser(email: $email, password: $password, role: $role) {
      token
      user {
        id
        email
        firstName
        lastName
        branch {
          id
          name
          business {
            id
            name
            image
          }
        }
      }
    }
  }
`


const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

const CHANGE_PASSWORD_USER =  gql`
  mutation ChangedPassword($changedPasswordId: ID!, $oldPassword: String!, $newPassword: String!) {
    changedPassword(id: $changedPasswordId, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`

const ADD_VACATION = gql`
  mutation AddVacation($input: CreateVacationInput!) {
    addVacation(input: $input) {
      id
    }
  }
`
const UPDATE_VACATION = gql`
  mutation EditVacation($input: UpdateVacationInput!) {
    editVacation(input: $input) {
      id
    }
  }
`

const DELETE_VACATION = gql`
  mutation DeleteVacation($deleteVacationId: ID!) {
    deleteVacation(id: $deleteVacationId)
  }
`

const CREATE_BOOKING = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
    }
  }
`

const MARK_AS_READ = gql`
  mutation MarkAlertAsRead($markAlertAsReadId: ID!) {
    markAlertAsRead(id: $markAlertAsReadId) {
      id
    }
  }
`

const MARK_AS_ALLREAD = gql`
  mutation Mutation {
    markAllAlertsAsRead
  }
`

export {
  LOGIN_USER,
  UPDATE_USER,
  CHANGE_PASSWORD_USER,
  ADD_VACATION,
  DELETE_VACATION,
  UPDATE_VACATION,
  CREATE_BOOKING,
  MARK_AS_READ,
  MARK_AS_ALLREAD,
}
