import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Container } from '../ui/container'
import { Input } from '../ui/input'
import { formatRole, formatEducationLevel } from '@/utils/function'
import { useUser } from '@/context/User'

interface VerifyInformationStep1Props {
  handleNextStep: () => void
}

function VerifyInformationStep1({ handleNextStep }: VerifyInformationStep1Props) {
  const { user } = useUser()
  const [id, setId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickName, setNickName] = useState<string>('')
  const [educationLevel, setEducationLevel] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [school, setSchool] = useState<string>('')

  useEffect(() => {
    setId(user.studentId)
    setFirstName(user.firstname)
    setLastName(user.lastname)
    setNickName(user.nickname)
    setEducationLevel(
      formatEducationLevel({
        educationLevel: user.education_level,
        year: user.year,
      })
    )
    setRole(formatRole(user.role))
    setSchool(user.school)
  }, [user])

  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center px-6 font-prompt'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='font-bold text-5xl'>ขั้นตอนที่ 1</h1>
          <p className='font-normal text-2xl'>ตรวจสอบข้อมูลส่วนตัว</p>
        </div>
        <Container className='flex flex-col gap-4 pb-5'>
          <Input label='ID' value={id} readOnly />
          <div className='grid grid-cols-2 gap-4'>
            <Input label='ชื่อจริง' value={firstName} readOnly />
            <Input label='นามสกุล' value={lastName} readOnly />
          </div>
          <Input label='ชื่อเล่น' value={nickName} readOnly />
          <div className='grid grid-cols-2 gap-4'>
            <Input label='ชั้นปี' value={educationLevel} readOnly />
            <Input label='บทบาท' value={role} readOnly />
          </div>
          <Input label='โรงเรียน' value={school} readOnly />
        </Container>
        <div className='flex flex-col items-center gap-2.5 text-center'>
          <p className='font-normal text-[15px]'>หากข้อมูลไม่ถูกต้องโปรดติดต่อฝ่ายทะเบียน</p>
          <Button
            size={'lg'}
            className='shadow-elevation-1 rounded-full body-large'
            onClick={handleNextStep}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </>
  )
}

export default VerifyInformationStep1
