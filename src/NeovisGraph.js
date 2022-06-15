import React, { useEffect, useRef, useState } from "react";
import NeoVis from "neovis.js/dist/neovis.js";
import { toast } from "react-toastify";

import { useVisContext } from "./contexts/VisContext/VisContext";

const NeoGraph = () => {

  const { setVis, visToRender } = useVisContext();

  const visRef = useRef();

  //lkOca7v_GmCqVF9dIiMxdBW9VVcR8ZmDnPpMGtgFALE
  //TrRwxqgzlJby1vb8eTCT8aaJg7VBpczinT4S9Xjv4ng
  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: "neo4j://42dcf288.databases.neo4j.io",
      server_user: "neo4j",
      server_password: "lkOca7v_GmCqVF9dIiMxdBW9VVcR8ZmDnPpMGtgFALE",
      arrows: true,
      labels: {
      },
      relationships: {
      },
      initial_cypher:
        `MATCH p=()-[r:ACTED_IN]->() RETURN p LIMIT 25`,
    };
    let vis = new NeoVis(config);
    
    vis?.render();

    vis?.registerOnEvent("error", (event) => {
      toast.error("Error getting data, see console for details", {
        autoClose: 3000,
        isLoading: false
      });
      console.error(event.error_msg);
    });

    vis?.registerOnEvent("completed", () => {
      setVis(vis)
      if (Object.keys(vis["_nodes"]).length === 0) {
        toast.info("No results found", {
          autoClose: false,
          isLoading: false
        });
      }
      if(visToRender){
        vis.nodes.update(visToRender.nodes)
        vis.edges.update(visToRender.edges)
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visToRender]);

  return (
      <div
        id={"viz"}
        ref={visRef}
        style={{
          width: "100%",
          height: "789px",
          padding: "20px",
          backgroundColor: "rgb(255,255,255)",
          margin: "12px",
          borderRadius: "10px",
          boxShadow: "0px 1px 8px -3px rgb(0 0 0 / 64%)"
        }}
      >
      </div>
  );
};

export { NeoGraph };