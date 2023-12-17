import { For, useContext } from "solid-js";
import { RouterContext } from "../../context/RouterContext";
import { GlobalContext } from "../../context/GlobalContext";

import "./History.scss";

const History = () => {
  const data = useContext(GlobalContext);
  const routerCtx = useContext(RouterContext);

  const history = localStorage.getItem("history");
  let historyArray: Array<any> = [];
  if (history !== null) {
    historyArray = JSON.parse(history);
  }

  function connectProxy(_data: any) {
    data.methods?.connect({
      host: _data.host,
      port: _data.port,
      scheme: _data.scheme,
    });
    routerCtx.setRoute("/");
  }

  return (
    <div class="history">
      <div class="history__list-wrapper">
        <div class="history__list">
          <For each={historyArray}>
            {(proxy) => (
              <button class="list__button" onClick={() => connectProxy(proxy)}>
                <div class="list__flag"></div>
                <div class="list__info">
                  <h2 class="list__title">Country None</h2>
                  <p class="list__text">
                    {proxy.scheme + " | " + proxy.host + " | " + proxy.port}
                  </p>
                </div>
              </button>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default History;
