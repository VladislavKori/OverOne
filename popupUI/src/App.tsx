import { ErrorBoundary, For, Match, Switch, useContext } from 'solid-js'

// styles
import './App.scss'

// components
import Header from './components/Header/Header'

// pages
import { Home } from './pages/Home';
import { Settings } from './pages/Settings'
import { ProxysList } from './pages/ProxysList';

// utils
import { ContextProvider } from './context/GlobalContext'
import { RouterCTXProvider, RouterContext } from './context/RouterContext'
import ErrorBoundaryHandler from './components/Error/Error';
import { ProxysForm } from './pages/ProxyForm';


function App() {

  const routerCtx = useContext(RouterContext)

  const routes = [
    { route: "/", element: Home },
    { route: "/settings", element: Settings },
    { route: "/list", element: ProxysList },
    { route: "/form", element: ProxysForm }
  ]

  return (
    <ErrorBoundary fallback={ErrorBoundaryHandler}>
      <ContextProvider>
        <RouterCTXProvider>
          <Header />
          <Switch>
            <For each={routes} fallback={<div>Loading...</div>}>
              {item => (
                <Match when={routerCtx.getRoute() === item.route}>
                  {item.element()}
                </Match>
              )}
            </For>
          </Switch>
        </RouterCTXProvider>
      </ContextProvider>
    </ErrorBoundary>
  )
}

export default App
