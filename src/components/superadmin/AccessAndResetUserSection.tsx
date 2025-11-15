import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ResetUserPopup from "../popup/ResetUserPopup";


function AccessAndResetUserSection() {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean[]>([false, false, false]);
  const controlRoleSwitch = ['พี่ค่าย', 'น้องค่าย', 'ผู้ดูแล'];
  const [openResetUserPopup, setOpenResetUserPopup] = useState(false);

  const handleSwitchChange = (index: number) => {
    const updatedSwitches = [...isSwitchOn];
    updatedSwitches[index] = !updatedSwitches[index];
    setIsSwitchOn(updatedSwitches);
  };
  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        <p className="px-4 title-medium-emphasized">ควบคุมการเข้าถึง</p>
        <div className="flex flex-col gap-4 justify-start items-center w-fit mx-auto">
          <div className="flex flex-row gap-6 w-fit">
            {
              controlRoleSwitch.map((role, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <p className="title-medium">{role}</p>
                  <Switch
                    id={role}
                    checked={isSwitchOn[index]}
                    onCheckedChange={() => handleSwitchChange(index)}
                    className="h-8 w-16"
                  />
                </div>
              ))
            }
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

      {openResetUserPopup && (
        <ResetUserPopup setOpenReceivingCoinPopup={setOpenResetUserPopup} />
      )}
    </>
  );
}

export default AccessAndResetUserSection;