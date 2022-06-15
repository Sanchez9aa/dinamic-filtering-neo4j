/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import cloneDeep from "lodash/cloneDeep"

import { useVisContext } from "../../contexts/VisContext/VisContext";

export const NodeFiltering = () => {

  const { vis } = useVisContext();

  const [groups, setGroups] = useState();
  const [queryHistorial, setQueryHistorial] = useState([]);
  const [cloneVis, setCloneVis] = useState(null);
  
  useEffect(() => {
    if(vis){
      //we push query into queryHistorial
      setQueryHistorial(queryHistorial => [...queryHistorial, vis["_query"]]);

      //if query is not the same that the last query, we clone vis and set it to cloneVis
      if(vis["_query"] !== queryHistorial[queryHistorial.length + 1]){
        const visGraph = cloneDeep(vis);
        setCloneVis(visGraph);
      }
      
      const nodes = Object.values(vis["_nodes"])
      const group = nodes.map(node => {
        return node.group
      })
      const uniqueGroup = [...new Set(group)]
      const uniqueCheckValue = uniqueGroup.map(group => {
        return { value: group, active: true }
      })
      setGroups(uniqueCheckValue)
      console.log(uniqueCheckValue)
    }
  }, [vis])

  useEffect(() => {
    if (vis && groups) {
      //retrieve a filtered subset of the nodes that are in the object uniqueCheckValue and checked is true
      const filteredNodes = cloneVis.nodes.get({
        filter: (node) => {
          return groups.find(group => {
            return group.value === node.group && group.active
          })
        }
      })
      vis.nodes.clear()
      vis.nodes.update(filteredNodes)
    }
  }, [groups])

  const handleCheckNode = (e) => {
    const { value, checked } = e.target;
    const newGroup = groups.map(group => {
      if (group.value === value) {
        return { ...group, active: checked }
      }
      return group
    }
    )
    setGroups(newGroup)
  }

  return (
    <>
      <h2>Filter nodes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", flexDirection: "column" }}>
        {groups && groups.map(node => {
          return (
            <div style={{ display: "flex" }}>
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
