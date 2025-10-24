import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="w-full bg-black h-screen flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen overflow-auto bg-white flex flex-col gap-8 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
