import { ArrowForward } from "@mui/icons-material";
import { Button } from "./ui/button";

function ComponentTest() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="title-large">Button Variants</h1>

      <div className="flex flex-col gap-6">
        {/* Default Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button>ต่อไป</Button>
          <Button size="sm">ต่อไป</Button>
          <Button size="md">ต่อไป</Button>
          <Button size="lg">ต่อไป</Button>
          <Button disabled>ต่อไป</Button>
          <Button>
            ต่อไป
            <ArrowForward />
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
          <Button variant="outline" disabled>
            ต่อไป
          </Button>
          <Button variant="outline">
            ต่อไป
            <ArrowForward />
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
          <Button disabled color={"pink"}>
            ต่อไป
          </Button>
          <Button color={"pink"}>
            ต่อไป
            <ArrowForward />
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
          <Button variant="outline" disabled color={"black"}>
            ต่อไป
          </Button>
          <Button variant="outline" color={"black"}>
            ต่อไป
            <ArrowForward />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComponentTest;
