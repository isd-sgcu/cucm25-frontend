import { ArrowForward } from "@mui/icons-material";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function ComponentTest() {
  return (
    <div className="flex flex-col gap-8">
      {/* Button Variant */}
      <div className="flex flex-col gap-8">
        <h1 className="title-large">Button Variants</h1>

        <div className="flex flex-col gap-6">
          {/* Default Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button>ต่อไป</Button>
            <Button size="sm">ต่อไป</Button>
            <Button size="md">ต่อไป</Button>
            <Button size="lg">ต่อไป</Button>
            <Button size="xl">ต่อไป</Button>
            <Button size="xxl">ต่อไป</Button>
            <Button disabled>ต่อไป</Button>
            <Button>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button style={{ width: 160 }}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button size="xxl" className="shadow-make-cartoonish ">
              <ArrowForward />
              ต่อไป
            </Button>
          </div>

          {/* Outline Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline">ต่อไป</Button>
            <Button variant="outline" size="sm">
              ต่อไป
            </Button>
            <Button variant="outline" size="md">
              ต่อไป
            </Button>
            <Button variant="outline" size="lg">
              ต่อไป
            </Button>
            <Button variant="outline" size="xl">
              ต่อไป
            </Button>
            <Button variant="outline" size="xxl">
              ต่อไป
            </Button>
            <Button variant="outline" disabled>
              ต่อไป
            </Button>
            <Button variant="outline">
              ต่อไป
              <ArrowForward />
            </Button>
            <Button variant="outline" style={{ width: 160 }}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button
              variant="outline"
              size="xxl"
              className="shadow-make-cartoonish"
            >
              <ArrowForward />
              ต่อไป
            </Button>
          </div>

          {/* Blue Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button color="light-blue">ต่อไป</Button>
            <Button size="sm" color="light-blue">
              ต่อไป
            </Button>
            <Button size="md" color="light-blue">
              ต่อไป
            </Button>
            <Button size="lg" color="light-blue">
              ต่อไป
            </Button>
            <Button size="xl" color="light-blue">
              ต่อไป
            </Button>
            <Button size="xxl" color="light-blue">
              ต่อไป
            </Button>
            <Button disabled color="light-blue">
              ต่อไป
            </Button>
            <Button color="light-blue">
              ต่อไป
              <ArrowForward />
            </Button>
            <Button color="light-blue" style={{ width: 160 }}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button
              color="light-blue"
              size="xxl"
              className="shadow-make-cartoonish"
            >
              <ArrowForward />
              ต่อไป
            </Button>
          </div>
        </div>
      </div>

      {/* Input Variant */}
      <div className="flex flex-col gap-8">
        <h1 className="title-large">Input Variants</h1>

        <div className="flex flex-col gap-6">
          <Input />
          <Input
            label="ระบุจำนวนเหรียญ"
            placeholder="000"
            type="number"
            inputSize={"xl"}
            min={1}
          />
          <Input label="ชื่อกิจกรรม" placeholder="กรอกชื่อกิจกรรม" />
          <div className="flex items-center gap-4">
            <Input label="วัน เวลา ที่หมดอายุ" type="date" inputSize={"lg"} />
            <Input type="time" containerClassName="translate-y-3" />
          </div>

          <Input label="ID" />
          <div className="flex w-full items-center gap-4">
            <Input label="ชื่อจริง" />
            <Input label="นามสกุล" />
          </div>
          <div className="flex w-full items-center gap-4">
            <Input
              label="Pin"
              inputSize={"sm"}
              maxLength={1}
              inputClassName="text-center"
            />
            <Input
              containerClassName="translate-y-3"
              inputSize={"sm"}
              inputClassName="text-center"
              maxLength={1}
            />
            <Input
              containerClassName="translate-y-3"
              inputSize={"sm"}
              inputClassName="text-center"
              maxLength={1}
            />
            <Input
              containerClassName="translate-y-3"
              inputSize={"sm"}
              inputClassName="text-center"
              maxLength={1}
            />
            <Input
              containerClassName="translate-y-3"
              inputSize={"sm"}
              inputClassName="text-center"
              maxLength={1}
            />
            <Input
              containerClassName="translate-y-3"
              inputSize={"sm"}
              inputClassName="text-center"
              maxLength={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentTest;
