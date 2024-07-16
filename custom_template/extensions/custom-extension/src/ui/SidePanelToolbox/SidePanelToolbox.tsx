import React from 'react';
import { useToolbar } from '@ohif/core';

const SidePanelToolbox = ({
  servicesManager,
  buttonSection = 'sidePanelToolbox',
}: withAppTypes) => {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection,
  });

  if (!toolbarButtons.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap">
      {toolbarButtons.map(toolDef => {
        if (!toolDef) {
          return null;
        }

        const { id, Component, componentProps } = toolDef;
        const tool = (
          <Component
            key={id}
            id={id}
            onInteraction={onInteraction}
            servicesManager={servicesManager}
            {...componentProps}
          />
        );

        return <div key={id}>{tool}</div>;
      })}
    </div>
  );
};

export default SidePanelToolbox;
