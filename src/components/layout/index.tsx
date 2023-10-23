import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='bg-white rounded-2xl w-app-max flex items-center justify-center h-max m-4'>
      <Outlet />
    </div>
  )
}

export default RootLayout