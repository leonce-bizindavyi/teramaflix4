import Title from '@/components/Title'
import Login from '@/components/authentification/Login'
import React from 'react'
import { SessionProvider } from '@/components/context/Auth'

function LoginPage() {
  return (
    <>
      <Title title='Login' />
      <SessionProvider>
        <Login />
      </SessionProvider>
    </>
  )
}

export default LoginPage
LoginPage.getLayout = function pageLayout(page){
  return (
      <>
      {page}
      </>
  )
}