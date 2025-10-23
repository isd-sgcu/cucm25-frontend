import { ArrowForward } from "@mui/icons-material";
import { Button } from "./ui/button";

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
            <Button size="xxl" className="border shadow-make-cartoonish ">
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
              className="border shadow-make-cartoonish"
            >
              <ArrowForward />
              ต่อไป
            </Button>
          </div>

          {/* Pink Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button color={"pink"}>ต่อไป</Button>
            <Button size="sm" color={"pink"}>
              ต่อไป
            </Button>
            <Button size="md" color={"pink"}>
              ต่อไป
            </Button>
            <Button size="lg" color={"pink"}>
              ต่อไป
            </Button>
            <Button size="xl" color={"pink"}>
              ต่อไป
            </Button>
            <Button size="xxl" color={"pink"}>
              ต่อไป
            </Button>
            <Button disabled color={"pink"}>
              ต่อไป
            </Button>
            <Button color={"pink"}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button variant="outline" color={"pink"} style={{ width: 160 }}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button
              variant="outline"
              color={"pink"}
              size="xxl"
              className="border shadow-make-cartoonish"
            >
              <ArrowForward />
              ต่อไป
            </Button>
          </div>

          {/* Black Outline Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" size="sm" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" size="md" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" size="lg" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" size="xl" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" size="xxl" color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" disabled color={"black"}>
              ต่อไป
            </Button>
            <Button variant="outline" color={"black"}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button variant="outline" color={"black"} style={{ width: 160 }}>
              ต่อไป
              <ArrowForward />
            </Button>
            <Button
              variant="outline"
              color={"black"}
              size="xxl"
              className="border shadow-make-cartoonish"
            >
              <ArrowForward />
              ต่อไป
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentTest;
