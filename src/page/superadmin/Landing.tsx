import ActivityHistoryCardList from "@/components/ActivityHistoryCardList";
import Logo from "@/components/Logo";
import EditButtonGroupSection from "@/components/superadmin/EditButtonGroupSection";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SuperAdminLanding() {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean[]>([false, false, false]);
  const controlRoleSwitch = ['พี่ค่าย', 'น้องค่าย', 'ทั้งหมด'];

  const handleSwitchChange = (index: number) => {
    const updatedSwitches = [...isSwitchOn];
    updatedSwitches[index] = !updatedSwitches[index];
    setIsSwitchOn(updatedSwitches);
  };

  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="mt-16 flex flex-row justify-between items-center">
        <Logo />
        <div className="flex flex-col items-end justify-center gap-1">
          <div className="label-medium px-2.5 rounded-xl bg-purple text-center text-white">ID : 123</div>
          <div className="text-right">
            <p className="label-small">นางสาวโยชิ มาแล้ว (โย)</p>
            <p className="label-small">Admin คนที่ X</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="headline-small-emphasized">Menu</p>
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
              >
                Reset User
              </Button>
            </div>
          </div>
        </div>
        <EditButtonGroupSection />
        <ActivityHistoryCardList />
      </div>
    </div>
  );
}

export default SuperAdminLanding;
