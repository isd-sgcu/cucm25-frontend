import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Container } from '../ui/container'
import { Input } from '../ui/input'
import Dialog from '../Dialog'
import { useNavigate } from 'react-router-dom'
import type { UserInterface } from '@/interface/user'
import { formatEducationLevel, formatRole } from '@/lib/utils'

interface VerifyInformationStep1Props {
  handleNextStep?: () => void
}

function VerifyInformationStep1({ handleNextStep }: VerifyInformationStep1Props) {
  const navigate = useNavigate()
  const [id, setId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [nickName, setNickName] = useState<string>('')
  const [educationLevel, setEducationLevel] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [school, setSchool] = useState<string>('')
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  const handleCloseDialog = () => {
    setIsAlertOpen(false)
    navigate('/auth/login')
  }

  useEffect(() => {
    setIsAlertOpen(false)

    const mockUserData: UserInterface = {
      studentId: '6403021234567',
      username: 'somchai.jaidee',
      firstname: 'สมชาย',
      lastname: 'ใจดี',
      nickname: 'ชาย',
      education_level: 'มัธยม',
      year: '5',
      role: 'junior',
      school: 'โรงเรียนสาธิตมหาวิทยาลัยเชียงใหม่',
    }

    // Mock data - replace with actual data fetching logic
    setId(mockUserData.studentId)
    setFirstName(mockUserData.firstname)
    setLastName(mockUserData.lastname)
    setNickName(mockUserData.nickname)
    setEducationLevel(formatEducationLevel({ educationLevel: mockUserData.education_level, year: mockUserData.year }))
    setRole(formatRole(mockUserData.role))
    setSchool(mockUserData.school)
  }, [])

  return (
    <>
      <Dialog
        title='เกิดข้อผิดพลาด'
        description='ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง'
        actionText='ตกลง'
        isOpen={isAlertOpen}
        handleOpenDialog={handleCloseDialog}
        onActionClick={handleCloseDialog}
      />
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
