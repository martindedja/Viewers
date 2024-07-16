import React from 'react';
import { CustomWrappedPanelStudyBrowser } from './ui/CustomPanelStudyBrowser';
import i18n from 'i18next';

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  return [
    {
      name: 'customSeriesList',
      iconName: 'tab-studies',
      iconLabel: 'Studies',
      label: i18n.t('SidePanel:Studies'),
      component: CustomWrappedPanelStudyBrowser.bind(null, {
        commandsManager,
        extensionManager,
        servicesManager,
      }),
    },
  ];
}

export default getPanelModule;
