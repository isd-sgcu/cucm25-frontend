import ActivityHistoryCardList from "@/components/ActivityHistoryCardList";
import Logo from "@/components/Logo";
import EditButtonGroupSection from "@/components/superadmin/EditButtonGroupSection";
import AccessAndResetUserSection from "@/components/superadmin/AccessAndResetUserSection";

function SuperAdminLanding() {
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
          <AccessAndResetUserSection />
        </div>
        <EditButtonGroupSection />
        <ActivityHistoryCardList />
      </div>
    </div>
  );
}

export default SuperAdminLanding;
