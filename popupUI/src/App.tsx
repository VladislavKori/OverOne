import { Match, Switch, createSignal } from 'solid-js'
import './App.scss'
import Header from './components/Header/Header'
import Info from './components/Info/Info'
import Manage from './components/Manage/Manage'

function App() {

  const [route, setRoute] = createSignal<string>("/")

  return (
    <>
      <Header />
      <Switch>
        <Match when={route() === "/"}>
          <Info />
          <Manage setSettings={setRoute} />
        </Match>
        <Match when={route() === "/settings"}>
          <p>23</p>
        </Match>
      </Switch>
    </>
  )
}

export default App
