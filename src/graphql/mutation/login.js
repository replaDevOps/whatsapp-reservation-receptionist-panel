import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($password: String!, $email: String) {
  login(password: $password, email: $email) {
    token
    refreshToken
    user {
      id
      status
    }
  }
}
`

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      refreshToken
      user {
        id
        status
      }
    }
  }
`

export const LOGOUT = gql`
    mutation Logout {
  logout {
    message
  }
}
`
export const UPDATE_SETTING = gql`
mutation UpdateSettings($updateSettingsId: ID!, $language: String,$commissionRate: String, $faceBook: String, $instagram: String, $whatsApp: String, $x: String, $email: String) {
  updateSettings(id: $updateSettingsId, language: $language,commissionRate: $commissionRate, faceBook: $faceBook, instagram: $instagram, whatsApp: $whatsApp, x: $x, email: $email) {
    id
  }
}
`

export const CREATE_SETTINGS = gql`
mutation CreateSettings($commissionRate: String!, $language: String, $banks: [BankInput!]!, $email: String, $x: String, $whatsApp: String, $instagram: String, $faceBook: String) {
  createSettings(commissionRate: $commissionRate, language: $language, banks: $banks, email: $email, x: $x, whatsApp: $whatsApp, instagram: $instagram, faceBook: $faceBook){
    id
  }
}
`
export const CHANGE_ADMIN_PASSWORD = gql`
mutation AdminChangePassword($adminChangePasswordId: ID, $oldPassword: String, $newPassword: String) {
  adminChangePassword(id: $adminChangePasswordId, oldPassword: $oldPassword, newPassword: $newPassword)
}
`
