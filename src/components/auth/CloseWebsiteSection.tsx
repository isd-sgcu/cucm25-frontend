function CloseWebsiteSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img src="/public/close-website.png" alt="Close Website" className="w-36" />
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-center display-small-emphasized">ปิดระบบชั่วคราว</h1>
        <div className="flex flex-col gap-1">
          <p className="title-small text-center">แล้วเจอกันใหม่เร็ว ๆ นี้</p>
          <p className="title-small text-center">ระหว่างนี้อย่าลืมสนุกไปกับหลายกิจกรรม ;)</p>
        </div>
      </div>
    </div>
  );
}

export default CloseWebsiteSection;

