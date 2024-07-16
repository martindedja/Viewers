import CustomToolbarButton from './ui/CustomToolbarButton';
import CustomButton from './ui/CustomButton';
const getToggledClassName = (isActive: boolean) => {
  return isActive
    ? 'toolbar-radio-action border border-secondary-light !text-primary-active'
    : 'toolbar-radio-action border border-secondary-light !text-common-bright hover:!bg-primary-dark hover:text-primary-light';
};

export default function getToolbarModule({ commandsManager, servicesManager }: withAppTypes) {
  const { customService } = servicesManager.services;

  return [
    {
      name: 'ohif.customRadioGroupWithIcon',
      defaultComponent: CustomButton,
    },
    {
      name: 'ohif.customRadioGroup',
      defaultComponent: CustomToolbarButton,
    },
    {
      name: 'evaluate.radioAction',
      evaluate: ({ viewportId, button }) => {
        const { id } = button;
        const isActive = customService.isToolbarButtonActive(id);
        return {
          className: getToggledClassName(isActive),
        };
      },
    },
  ];
}
