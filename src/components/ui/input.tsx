import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'min-w-0 w-full rounded-xl bg-grey border px-3 py-1 outline-none text-black disabled:cursor-not-allowed disabled:opacity-50 title-small placeholder:text-deep-deep-grey',
  {
    variants: {
      inputSize: {
        default: 'h-10',
        sm: 'max-w-[46px] h-12',
        md: 'max-w-[143px] h-10',
        lg: 'max-w-[211px] h-10',
        xl: 'max-w-[313px] h-10',
      },
      isError: {
        true: 'border-red shadow-make-cartoonish-error',
        false: 'shadow-make-cartoonish',
      },
    },
    defaultVariants: {
      inputSize: 'default',
      isError: false,
    },
  }
)

export interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  label?: string
  labelClassName?: string
  inputClassName?: string
  containerClassName?: string
  error?: string
  isError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      containerClassName,
      inputSize,
      inputClassName,
      id,
      error,
      isError,
      readOnly,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    return (
      <div className={cn('w-full flex flex-col gap-1 ', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className={cn('label-large', labelClassName)}>
            <span className='font-semibold'>{label}</span>
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={cn(
            inputVariants({ inputSize, isError }),
            'read-only:cursor-default read-only:pointer-events-none read-only:focus:outline-none read-only:caret-transparent',
            inputClassName
          )}
          readOnly={readOnly}
          {...props}
        />
        {isError && error && <span className='text-red'>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
