import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import ResetUserPopup from '../popup/ResetUserPopup'
import { updateToggle, getStatus } from '@/api/system'

function AccessAndResetUserSection() {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean[]>([false, false, false])
  const controlRoleSwitch = [
    {
      label: 'น้องค่าย',
      value: 'junior_login_enabled',
    },
    {
      label: 'พี่ค่าย',
      value: 'senior_login_enabled',
    },
    {
      label: 'ผู้ดูแล',
      value: 'mod_login_enabled',
    },
  ]

  const [openResetUserPopup, setOpenResetUserPopup] = useState(false)

  const handleGetData = async () => {
    try {
      const status = await getStatus()
      setIsSwitchOn([status.juniorLoginEnabled, status.seniorLoginEnabled, status.modLoginEnabled])
    } catch (error) {
      console.error('Failed to fetch system status:', error)
    }
  }

  const handleSwitchChange = async (s: string, index: number) => {
    try {
      await updateToggle(s, !isSwitchOn[index])
      setIsSwitchOn(prev => {
        const newSwitches = [...prev]
        newSwitches[index] = !newSwitches[index]
        return newSwitches
      })
    } catch (error) {
      console.error('Error updating toggle:', error)
    } finally {
      handleGetData()
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <>
      <div className='flex flex-col gap-2 justify-center'>
        <p className='px-4 title-medium-emphasized'>ควบคุมการเข้าถึง</p>
        <div className='flex flex-col gap-4 justify-start items-center w-fit mx-auto'>
          <div className='flex flex-row gap-6 w-fit'>
            {controlRoleSwitch.map((role, index) => (
              <div key={index} className='flex flex-col items-center gap-2'>
                <p className='title-medium'>{role.label}</p>
                <Switch
                  id={role.label}
                  checked={isSwitchOn[index]}
                  onCheckedChange={() => handleSwitchChange(role.value, index)}
                  className='h-8 w-16'
                />
              </div>
            ))}
          </div>
          <Button
            size={'lg'}
            className='shadow-elevation-1 rounded-full body-large'
            onClick={() => setOpenResetUserPopup(true)}
          >
            Reset User
          </Button>
        </div>
      </div>

      {openResetUserPopup && <ResetUserPopup setOpenReceivingCoinPopup={setOpenResetUserPopup} />}
    </>
  )
}

export default AccessAndResetUserSection
