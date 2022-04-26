import React from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import SpriteText from 'three-spritetext';

export const DisplayGraphRender = (props, state, modifiers) => {
  const { nodes, links } = state

  return (
    <ForceGraph3D
      graphData={{
        links,
        nodes
      }}
      nodeAutoColorBy="group"
      nodeThreeObject={(node) => {
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 4;
        return sprite;
      }}
    />
  );
};