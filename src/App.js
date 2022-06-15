import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { VisProvider } from "./contexts/VisContext/VisContext";
import { NeoGraph } from './NeovisGraph';
import {GraphContainer} from "./styles/graphContainer";
import {NodeFiltering} from "./components/nodeFiltering/NodeFiltering";


const App = () => {

  return (
    <VisProvider>
       <ToastContainer
        autoClose={4000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        position="top-right"
        rtl={false}
        theme="light"
      />
      <GraphContainer>
      <NeoGraph containerId="viz" />
      <div className='graph-filter'>
        <div className='node-group'>
          <NodeFiltering />
        </div>
      </div>
    </GraphContainer>
    </VisProvider>
  );
}

export default App;
