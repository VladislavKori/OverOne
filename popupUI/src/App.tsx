import { Match, Switch, createSignal } from 'solid-js'
import './App.scss'
import Header from './components/Header/Header'
import Info from './components/Info/Info'
import Manage from './components/Manage/Manage'
import Settings from './components/Settings/Settings'
import List from './components/List/List'

function App() {

  const [route, setRoute] = createSignal<string>("/")

  return (
    <>
      <Header />
      <Switch>
        <Match when={route() === "/"}>
          <Info />
          <Manage changePage={setRoute} />
        </Match>
        <Match when={route() === "/settings"}>
          <Settings changePage={setRoute} />
        </Match>
        <Match when={route() === "/list"}>
          <List changePage={setRoute} />
        </Match>
      </Switch>
    </>
  )
}

export default App
