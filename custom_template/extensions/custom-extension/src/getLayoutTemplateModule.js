import ViewerLayout from './ViewerLayout';

export default function ({ servicesManager, extensionManager, commandsManager, hotkeysManager }) {
  function ViewerLayoutWithServices(props) {
    return ViewerLayout({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props,
    });
  }
  return [
    {
      name: 'customViewerLayout',
      id: 'customViewerLayout',
      component: ViewerLayoutWithServices,
    },
  ];
}
