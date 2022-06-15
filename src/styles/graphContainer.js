import styled from "styled-components"

export const GraphContainer = styled.div`
  display: flex;

  .graph-filter {
    flex: 0 0 30%; 
    margin: 12px 12px 12px 0; 
    border-radius: 10px; 
    background: rgb(255,255,255);
    box-shadow: 0px 1px 8px -3px rgb(0 0 0 / 64%);
    padding: 20px;
  }

  .filter{
    height: 70%;
  }

  .node-group{
    text-align: center;
  }
`