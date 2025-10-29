import DesignSystemTest from '@/components/DesignSystemTest'
import ElementTest from '@/components/ElementTest'

function Chore() {
  return (
    <div className='w-full flex flex-col gap-8 p-8'>
      <DesignSystemTest />
      <ElementTest />
    </div>
  )
}

export default Chore
