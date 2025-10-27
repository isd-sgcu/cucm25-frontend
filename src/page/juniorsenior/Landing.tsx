import RankBar from "@/components/Rankbar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconBox } from "@/components/ui/icon-box";
import { Icon } from "@iconify/react";

function JuniorSeniorLanding() {
  return (
    <div className="w-full min-h-screen h-fit bg-light-yellow flex flex-col">
      {/* Header */}
      <div className="w-full min-h-[200px] h-fit bg-pink border rounded-b-xl shadow-make-cartoonish mb-6"></div>

      {/* Content */}
      <div className="w-full h-fit min-h-[200px] flex flex-col items-center gap-8 mb-6">
        {/* Buttons */}
        <div className="grid gap-4 grid-cols-2 justify-items-center px-2">
          {/* Button 1 */}
          <Button
            variant="default"
            className="w-full max-w-[188px] min-h-[105px] h-fit flex flex-wrap gap-2 rounded-2xl"
            color="white"
            cartoonish
          >
            <IconBox bgcolor="light-blue" className="w-16 h-16">
              <Icon icon="solar:gift-linear" className="w-10! h-10!" />
            </IconBox>
            <div className="flex flex-col items-start">
              <p className="title-medium">
                <span className="font-semibold">ส่งของขวัญ</span>
              </p>
              <p className="label-small">เหลืออีก</p>
              <p className="title-large">
                <span className="font-semibold">4/7</span>
                <span className="label-small">ครั้ง</span>
              </p>
              <p className="label-small">รีเซตใน 42 นาที</p>
            </div>
          </Button>

          {/* Button 2 */}
          <Button
            variant="default"
            className="w-full max-w-[153px] min-h-[105px] h-fit flex flex-wrap gap-2 rounded-2xl"
            color="white"
            cartoonish
          >
            <IconBox bgcolor="pink" className="w-16 h-16">
              <Icon icon="solar:star-outline" className="w-10! h-10!" />
            </IconBox>
            <div className="flex flex-col items-start">
              <p className="title-medium">
                <span className="font-semibold">รับ</span>
              </p>
              <p className="title-medium">
                <span className="font-semibold">เหรียญ</span>
              </p>
            </div>
          </Button>

          {/* Button 3 */}
          <Button
            variant="default"
            className="w-full max-w-[188px] min-h-9 h-fit flex flex-wrap gap-2 rounded-2xl"
            color="white"
            cartoonish
          >
            <IconBox
              bgcolor="yellow"
              size="sm"
              cartoonish={false}
              className="border-2"
            >
              <Icon icon="solar:star-circle-outline" className="w-5! h-5!" />
            </IconBox>
            <div className="flex flex-col items-start">
              <p className="title-medium">จ่าย</p>
            </div>
          </Button>

          {/* Button 4 */}
          <Button
            variant="default"
            className="w-full max-w-[153px] min-h-9 h-fit flex flex-wrap gap-2 rounded-2xl"
            color="white"
            cartoonish
          >
            <IconBox bgcolor="white" size="sm" cartoonish={false}>
              <Icon icon="solar:clock-circle-outline" className="w-5! h-5!" />
            </IconBox>
            <div className="flex flex-col items-start">
              <p className="title-medium">ประวัติ</p>
            </div>
          </Button>
        </div>

        {/* Leaderboard */}
        <Container className="flex flex-col gap-2 px-6">
          {/* Header */}
          <div className="flex justify-between gap-2">
            <div className="flex gap-2 items-center">
              <Icon icon="solar:ranking-linear" className="w-8 h-8" />
              <p className="headline-small">Leaderboard</p>
            </div>
            <Icon
              icon="solar:alt-arrow-right-linear"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                alert("Go to leaderboard page");
              }}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-[1fr_1fr] gap-2 w-full justify-center min-h-6">
            <Button
              variant="outline"
              color="black"
              className="w-auto h-fit rounded-full"
            >
              พี่ค่าย
            </Button>
            <Button
              variant="outline"
              color="black"
              className="w-auto h-fit rounded-full"
            >
              น้องค่าย
            </Button>
          </div>

          {/* Bars */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 w-full justify-center">
            {/* Rank1 */}
            <RankBar
              rank={1}
              nickname="ชัย"
              role="junior"
              name="ชนะ ผจญภัย"
              year="3"
              points={100000}
            />
            <RankBar
              rank={2}
              nickname="โอ"
              role="senior"
              name="เลสิก ผจญภัย"
              year="4"
              points={99999}
            />
            <RankBar
              rank={3}
              nickname="โย"
              role="junior"
              name="ธนกฤต พัฒนาวงศาคณาจารย์ ญาติโกโหติกา"
              year="3"
              points={9900}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default JuniorSeniorLanding;
