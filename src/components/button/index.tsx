import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from '../../helpers'

export enum ButtonVariant {
  Primary = 'primary',
  Error = 'error',
  Success = 'success',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }

const COLOR_VARIANTS = {
  [ButtonVariant.Primary]: 'bg-primary',
  [ButtonVariant.Error]: 'bg-error',
  [ButtonVariant.Success]: 'bg-success',
}

const Button: React.FC<ButtonProps> = ({ className, variant = ButtonVariant.Primary, children, ...rest }) => {
  return (
    <button className={twMerge(`
     text-white 
     py-2 px-4 
     rounded-app-def 
     text-base 
     disabled:bg-slate-400`,
      className,
      COLOR_VARIANTS[variant])
    }
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button