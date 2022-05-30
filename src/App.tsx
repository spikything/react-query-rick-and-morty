import { QueryClient, QueryClientProvider } from 'react-query'
import Characters from './components/Characters'
import './App.css'

const src = 'https://github.com/spikything/react-query-rick-and-morty'
const endpoint = 'https://rickandmortyapi.com/api/character'
const queryClient = new QueryClient()

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <h1>Reack and Morquery (a React Query / TypeScript client for the Rick and Morty API) <a href={src} target='_blank'>[src]</a></h1>
        <QueryClientProvider client={queryClient}>
          <Characters endpoint={endpoint} />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
