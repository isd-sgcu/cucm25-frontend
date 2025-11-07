import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from 'lucide-react';

function EditButtonGroupSection() {
  const navigate = useNavigate();

  const handleCreateActivityClick = (type: string) => {
    navigate("/superadmin/create-activity/?role=" + type);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        size={'custom'}
        className='w-full h-auto shadow-make-cartoonish body-large col-span-2 border border-black p-4 rounded-xl'
        onClick={() => navigate('/superadmin/edit-gift-count')}
        color={'light-blue'}
      >
        <Gift className="size-12" strokeWidth={1} />
        <p className="title-medium-emphasized">แก้จำนวนของขวัญ</p>
      </Button>
      <Button
        size={'custom'}
        className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
        onClick={handleCreateActivityClick.bind(null, 'senior')}
        color={'light-pink'}
      >
        <p className="title-medium-emphasized">สร้าง Code รับ Coin</p>
        <p className="body-medium">สำหรับพี่ค่าย</p>
      </Button>
      <Button
        size={'custom'}
        className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
        onClick={handleCreateActivityClick.bind(null, 'junior')}
        color={'yellow'}
      >
        <p className="title-medium-emphasized">สร้าง Code รับ Coin</p>
        <p className="body-medium">สำหรับน้องค่าย</p>
      </Button>
    </div>
  );
}

export default EditButtonGroupSection;