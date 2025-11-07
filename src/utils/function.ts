import type { UserRoleType, EducationLevelType } from './const'

export function formatEducation(educationLevel: EducationLevelType): string {
  switch (educationLevel) {
    case 'M4':
      return `ม.4`
    case 'M5':
      return 'ม.5'
    case 'M6':
      return `ม.6`
    case 'Y1':
      return 'ปี 1'
    case 'Y2':
      return `ปี 2`
    case 'Y3':
      return 'ปี 3'
    case 'Y4':
      return `ปี 4`
    case 'GRADUATED':
      return 'ปริญญา'
    default:
      return ''
  }
}

export function getEducationLevel(educationLevel: EducationLevelType): string {
  switch (educationLevel) {
    case 'M4':
    case 'M5':
    case 'M6':
      return `มัธยม`
    case 'Y1':
    case 'Y2':
    case 'Y3':
    case 'Y4':
    case 'GRADUATED':
      return 'มหาลัย'
    default:
      return ''
  }
}

export function getEducationYear(educationLevel: EducationLevelType): string {
  switch (educationLevel) {
    case 'M4':
      return '4'
    case 'M5':
      return '5'
    case 'M6':
      return '6'
    case 'Y1':
      return '1'
    case 'Y2':
      return '2'
    case 'Y3':
      return '3'
    case 'Y4':
      return '4'
    case 'GRADUATED':
      return 'บัณฑิต'
    default:
      return ''
  }
}

export function formatRole(role: UserRoleType): string {
  switch (role) {
    case 'PARTICIPANT':
      return 'น้องค่าย'
    case 'STAFF':
      return 'พี่ค่าย'
    case 'MODERATOR':
      return 'ผู้ดูแล'
    case 'ADMIN':
      return 'โทนี่'
    default:
      return ''
  }
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('th-TH', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
