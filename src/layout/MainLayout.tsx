function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-black h-screen flex justify-center">
      <div className="w-full max-w-[393px] min-h-screen overflow-auto bg-white flex flex-col gap-8 p-8">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
