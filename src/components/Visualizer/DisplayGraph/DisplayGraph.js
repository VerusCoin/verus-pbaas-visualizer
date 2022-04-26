import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { DisplayGraphRender } from './DisplayGraph.render';

function DisplayGraph(props) {
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const graph = useSelector(state => state.graph.graph)

  function getName(currencyid) {
    return graph.names[currencyid] ? graph.names[currencyid] : currencyid
  }

  function extractLinks(graph) {
    const links = []

    for (const currencyid in graph.links) {
      for (const link of graph.links[currencyid]) {
        if (graph.names[currencyid] && graph.names[link.destination]) {
          links.push({
            source: getName(currencyid),
            target: getName(link.destination)
          });
        }
      }
    }

    return links
  }

  function extractNodes(graph) {
    const nodes = []

    Object.keys(graph.currencies).map((currencyid, index) => {
      for (const subcurrencyid in graph.currencies[currencyid]) {
        nodes.push({
          id: getName(subcurrencyid),
          group: index
        });
      }
    })

    return nodes
  }

  useEffect(() => {
    setLinks(extractLinks(graph))
    setNodes(extractNodes(graph))
  }, [graph]);

  return DisplayGraphRender(props, {
    nodes,
    links
  });
}

export default DisplayGraph
