import { InputHTMLAttributes, forwardRef } from "react"
import { twMerge } from "../../helpers"

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  endButton?: React.ReactNode, 
}

const Input =  forwardRef<HTMLInputElement,InputProps>(({ value, onChange,className, endButton, ...rest }, ref) => {  
  return (
    <div className="p-2 h-max bg-gray-100 rounded-md w-full flex justify-between items-center">
      <input ref={ref} value={value} onChange={onChange} className={twMerge( `outline-none mr-4 flex-1 bg-gray-100`, className) } type="text" {...rest} />
      {endButton}
    </div>
  )
})

export default Input