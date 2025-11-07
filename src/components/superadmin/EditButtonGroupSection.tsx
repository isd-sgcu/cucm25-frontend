import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from 'lucide-react';
import { useState, useEffect } from "react";

function EditButtonGroupSection() {
  const [tickerPrice, setTickerPrice] = useState<number>(0);
  const navigate = useNavigate();

  const handleCreateActivityClick = (type: string) => {
    navigate("/superadmin/create-activity/?role=" + type);
  };

  useEffect(() => {
    setTickerPrice(500);
  }, [])

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
      <Button
        size={'custom'}
        className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
        onClick={() => { }}
        color={'light-pink'}
      >
        <p className="title-medium-emphasized">ตั้งค่าราคา Ticket</p>
        <p className="body-medium">ราคาปัจจุบัน {tickerPrice} coin</p>
      </Button>
      <Button
        size={'custom'}
        className='w-full col-span-1 h-auto shadow-make-cartoonish body-large border border-black p-4 rounded-xl flex flex-col text-center'
        onClick={() => { }}
        color={'yellow'}
      >
        <p className="title-medium-emphasized">Export</p>
        <p className="body-medium">ข้อมูล Ticket</p>
      </Button>
      <Button
        size={'custom'}
        className='w-full h-auto shadow-make-cartoonish body-large col-span-2 border border-black p-4 rounded-xl'
        onClick={() => { }}
        color={'light-blue'}
      >
        <p className="title-medium-emphasized">เพิ่ม / ลด เหรียญรายบุคคล</p>
      </Button>
    </div>
  );
}

export default EditButtonGroupSection;