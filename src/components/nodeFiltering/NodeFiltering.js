import React, { useState, useEffect } from 'react'
import { DataSet } from "vis-data"

import { useVisContext } from "../../contexts/VisContext/VisContext";

export const NodeFiltering = () => {

  const { vis, setVisToRender } = useVisContext();

  const [group, setGroup] = useState();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (vis["_nodes"]) {
      const nodes = Object.values(vis["_nodes"])
      const group = nodes.map(node => {
        return node.group
      })
      const uniqueGroup = [...new Set(group)]
      const uniqueCheckValue = uniqueGroup.map(group => {
        return { value: group, active: true }
      })
      setGroup(uniqueCheckValue)
    }
  }, [vis])

  useEffect(() => {
    if (vis["_nodes"] && group && checking) {
      const nodes = Object.values(vis["_nodes"])
      //We filter nodes that have group active
      const filteredNodes = nodes.filter(node => {
        return group.find(group => group.value === node.group && group.active)
      })
     //We filter edges that has the same id of nodes
      const edges = Object.values(vis["_edges"])
      const filteredEdges = edges.filter(edge => {
        return filteredNodes.find(node => node.id === edge.from) && filteredNodes.find(node => node.id === edge.to)
      })
    
      //Set nodes from array to a object with his id as key
      const nodesObject = {}
      filteredNodes.forEach(node => {
        nodesObject[node.id] = node
      })
      console.log(filteredNodes)

      //Set edges from array to a object with his id as key
      const edgesObject = {}
      filteredEdges.forEach(edge => {
        edgesObject[edge.id] = edge
      })
      const data = {
        nodes: new DataSet(filteredNodes),
        edges: new DataSet(filteredEdges),
        nodesObject: nodesObject,
        edgesObject: edgesObject,
      }
  
      /* vis["_network"] = new Network(document.getElementById('viz'), data) */
      setVisToRender(data)
      /* setVisToRender(data) */
      setChecking(false)
    }
  }, [group])

  const handleCheckNode = (e) => {
    const { value, checked } = e.target;
    const newGroup = group.map(group => {
      if (group.value === value) {
        return { ...group, active: checked }
      }
      return group
    }
    )
    setGroup(newGroup)
    setChecking(true)
  }


  return (
    <>
      <h2>Filter nodes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", flexDirection: "column" }}>
        {group && group.map(node => {
          return (
            <div style={{display: "flex"}}>
              <input onChange={(e) => handleCheckNode(e)} type="checkbox" name="node" value={node.value} checked={node.active} />
              <label for={node.value}> {node.value}</label>
            </div>
          )
        }
        )}
      </div>
    </>
  )
}
