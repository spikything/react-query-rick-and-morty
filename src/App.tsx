import { QueryClient, QueryClientProvider } from 'react-query'
import Characters from './components/Characters'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>
    </div>
  )
}

export default App
