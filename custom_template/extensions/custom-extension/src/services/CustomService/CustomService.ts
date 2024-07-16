
import { Types as OhifTypes, pubSubServiceInterface } from '@ohif/core';

const EVENTS = {
};


export default class CustomService {
  public static REGISTRATION = {
    name: 'customService',
    altName: 'customService',
    create: ({ servicesManager }: OhifTypes.Extensions.ExtensionParams): CustomService => {
      return new CustomService(servicesManager);
    },
  };

  servicesManager: AppTypes.ServicesManager;
  listeners: { [key: string]: Function[] };
  EVENTS: { [key: string]: string };
  activeToolbarButton;
  constructor(servicesManager: AppTypes.ServicesManager) {
    this.servicesManager = servicesManager
    this.listeners = {};
    this.EVENTS = EVENTS;
    Object.assign(this, pubSubServiceInterface);
  }

  public isToolbarButtonActive(buttonId) {
    return this.activeToolbarButton === buttonId;
  }
  public setToolbarButtonActive(buttonId) {
    this.activeToolbarButton = buttonId;
  }

}
