import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'

interface PageHeaderProps {
  title: string
  alertTitle?: string
  alertContent?: React.ReactNode
  alertVariant?: 'default' | 'destructive' | 'info' | 'warning' | 'success'
  children?: React.ReactNode
}

export const PageHeader = ({
  alertVariant,
  title,
  alertTitle,
  alertContent,
  children
}: PageHeaderProps) => {
  const getVariantStyle = () => {
    switch (alertVariant) {
      case 'destructive':
        return 'bg-red-100 border-red-800 text-red-800'
      case 'info':
        return 'bg-blue-100 border-blue-800 text-blue-800'
      case 'warning':
        return 'bg-orange-100 border-orange-800 text-orange-800'
      case 'success':
        return 'bg-green-100 border-green-800 text-green-800'
      default:
        return 'bg-gray-100 text-black'
    }
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>{title}</h1>
        {children}
      </div>
      {alertTitle && (
        <Alert className={`mt-4 ${getVariantStyle()}`}>
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertContent}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
