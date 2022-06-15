import { createContext, useState, useContext } from "react";

//Context
export const VisContext = createContext();

//Consumer
export const VisConsumer = ({children}) => (
  <VisContext.Consumer>
    {(context) => {
      if (context === undefined) {
        throw new Error("VisConsumer must be used within a VisProvider");
      }

      return children(context);
    }}
  </VisContext.Consumer>
)

//Consumer hook
export const useVisContext = () => {
  const context = useContext(VisContext);
  if (context === undefined) {
    throw new Error("VisConsumer must be used within a VisProvider");
  }
  return context;
}

//Provider
export const VisProvider = ({children}) => {
  const [vis, setVis] = useState(""); 
  const [visToRender, setVisToRender] = useState(null); 
  const data = {vis, setVis, visToRender, setVisToRender};
  return (
    <VisContext.Provider value={data}>
      {children}
    </VisContext.Provider>
  )
}
