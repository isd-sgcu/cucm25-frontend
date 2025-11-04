import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'

function App() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8 p-8">
      <Button cartoonish={true} onClick={() => navigate("/auth")}>
        Go to Auth
      </Button>

      <Button cartoonish={true} onClick={() => navigate("/junior-senior")}>
        Go to Junior/Senior
      </Button>

      <Button cartoonish={true} onClick={() => navigate('/chore')}>
        Go to Chore Test
      </Button>
    </div>
  )
}

export default App
