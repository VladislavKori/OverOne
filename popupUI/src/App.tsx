import { Match, Switch, createSignal } from 'solid-js'
import './App.scss'
import Header from './components/Header/Header'
import Info from './components/Info/Info'
import Manage from './components/Manage/Manage'
import Settings from './components/Settings/Settings'

function App() {

  const [route, setRoute] = createSignal<string>("/settings")

  return (
    <>
      <Header />
      <Switch>
        <Match when={route() === "/"}>
          <Info />
          <Manage setSettings={setRoute} />
        </Match>
        <Match when={route() === "/settings"}>
          <Settings changePage={setRoute} />
        </Match>
      </Switch>
    </>
  )
}

export default App
