import SettingHome from '@/components/Settings/SettingHome'
import Title from '@/components/Title'
import React from 'react'

function SettingsPage() {
  return (
    <>
    <Title title='Settings' />
    <div className="Acceuilcontainer w-full mt-[4rem] justify-center items-center  bg-gray-100 flex flex-col h-full ">
        <SettingHome />
    </div> 
    </>
  )
}

export default SettingsPage