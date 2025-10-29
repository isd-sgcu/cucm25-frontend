import type React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './ui/alert-dialog'

interface DialogProps {
  isOpen: boolean
  title: string
  description: string
  actionText?: string
  cancelText?: string
  onActionClick?: () => void
  onCancelClick?: () => void
  handleOpenDialog?: () => void
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  description,
  actionText = 'ตกลง',
  cancelText = '',
  handleOpenDialog,
  onActionClick,
  onCancelClick,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenDialog}>
      <AlertDialogContent className='bg-white border-black border shadow-make-cartoonish w-full'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && onCancelClick && (
            <AlertDialogCancel
              onClick={onCancelClick}
              size={'sm'}
              className='rounded-full shadow-elevation-1'
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          {actionText && onActionClick && (
            <AlertDialogAction
              onClick={onActionClick}
              size={'sm'}
              className='rounded-full shadow-elevation-1'
            >
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
