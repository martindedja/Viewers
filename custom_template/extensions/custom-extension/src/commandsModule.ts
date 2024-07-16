import { Types as OhifTypes } from '@ohif/core';

function commandsModule({
  servicesManager,
  commandsManager,
}: OhifTypes.Extensions.ExtensionParams): OhifTypes.Extensions.CommandsModule {
  const { customService, viewportGridService } = servicesManager.services;

  const actions = {
    setActionActive: ({ id, value }) => {
      customService.setToolbarButtonActive(id);
      if (value === 'os') {
        // TODO: Implement the action for os button
      } else {
        // TODO: Implement the action for od button
      }
    },
    createNewSegmentation: ({}) => {
      const viewportId = viewportGridService.getActiveViewportId();
      if (!viewportId) {
        return;
      }
      commandsManager.runCommand('createEmptySegmentationForViewport', {
        viewportId: viewportId,
      });
    },
  };

  const definitions = {
    setActionActive: {
      commandFn: actions.setActionActive,
    },
    createNewSegmentation: {
      commandFn: actions.createNewSegmentation,
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE',
  };
}

export default commandsModule;
