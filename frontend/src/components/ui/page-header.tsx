import React from 'react'

interface PageHeaderProps {
  title: string
  children?: React.ReactNode
}

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='font-bold text-3xl'>{title}</h1>
      {children}
    </div>
  )
}
