import ComponentTest from "./components/ComponentTest";
import DesignSystemTest from "./components/DesignSystemTest";

function App() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <DesignSystemTest />
      <ComponentTest />
    </div>
  );
}

export default App;
