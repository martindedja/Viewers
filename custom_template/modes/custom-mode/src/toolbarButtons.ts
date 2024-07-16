import type { Button } from '@ohif/core/types';
export const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d'],
  },
};
const toolbarButtons: Button[] = [
  {
    id: 'WindowLevel',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'tool-window-level',
      label: 'COLOR',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Length',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'tool-length',
      label: 'MEASURE',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'invert',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'tool-invert',
      label: 'INVERT',
      tooltip: 'Invert Colors',
      commands: 'invertViewport',
      evaluate: 'evaluate.viewportProperties.toggle',
    },
  },
  {
    id: 'Reset',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-reset',
      label: 'Reset',
      commands: 'resetViewport',
      evaluate: 'evaluate.action',
    },
  },
  {
    id: 'Cine',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-cine',
      label: 'Cine',
      commands: 'toggleCine',
      evaluate: ['evaluate.cine', 'evaluate.not3D'],
    },
  },

  {
    id: 'OD',
    uiType: 'ohif.customRadioGroup',
    props: {
      label: 'OD',
      commands: {
        commandName: 'setActionActive',
        commandOptions: {
          id: 'OD',
          value: 'OD',
        },
      },
      evaluate: 'evaluate.radioAction',
    },
  },
  {
    id: 'CircularBrush',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'icon-tool-brush',
      label: 'BRUSH',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstone.segmentation',
    },
  },
  {
    id: 'CircularEraser',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'icon-tool-eraser',
      label: 'ERASER',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstone.segmentation',
    },
  },
  {
    id: 'OS',
    uiType: 'ohif.customRadioGroup',
    props: {
      label: 'OS',
      commands: {
        commandName: 'setActionActive',
        commandOptions: {
          id: 'OS',
          value: 'os',
        },
      },
      evaluate: 'evaluate.radioAction',
    },
  },
  {
    id: 'BrushTools',
    uiType: 'ohif.buttonGroup',
    props: {
      groupId: 'BrushTools',
      items: [
        {
          id: 'Brush',
          icon: 'icon-tool-brush',
          label: 'Brush ',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
            toolNames: 'CircularBrush',
            disabledText: 'Create new segmentation to enable this tool.',
          },
          options: [
            {
              name: 'Radius (mm)',
              id: 'brush-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: { toolNames: ['CircularBrush', 'SphereBrush'] },
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'brush-mode',
              value: 'CircularBrush',
              values: [
                { value: 'CircularBrush', label: 'Circle' },
                { value: 'SphereBrush', label: 'Sphere' },
              ],
              commands: 'setToolActiveToolbar',
            },
          ],
        },
        {
          id: 'Eraser',
          icon: 'icon-tool-eraser',
          label: 'Eraser',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
            toolNames: 'CircularEraser',
          },
          options: [
            {
              name: 'Radius (mm)',
              id: 'eraser-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: { toolNames: ['CircularEraser', 'SphereEraser'] },
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'eraser-mode',
              value: 'CircularEraser',
              values: [
                { value: 'CircularEraser', label: 'Circle' },
                { value: 'SphereEraser', label: 'Sphere' },
              ],
              commands: 'setToolActiveToolbar',
            },
          ],
        },
        {
          id: 'Threshold',
          icon: 'icon-tool-threshold',
          label: 'Threshold Tool',
          evaluate: {
            name: 'evaluate.cornerstone.segmentation',
            toolNames: 'ThresholdCircularBrush',
          },
          options: [
            {
              name: 'Radius (mm)',
              id: 'threshold-radius',
              type: 'range',
              min: 0.5,
              max: 99.5,
              step: 0.5,
              value: 25,
              commands: {
                commandName: 'setBrushSize',
                commandOptions: {
                  toolNames: [
                    'ThresholdCircularBrush',
                    'ThresholdSphereBrush',
                    'ThresholdCircularBrushDynamic',
                  ],
                },
              },
            },

            {
              name: 'Threshold',
              type: 'radio',
              id: 'dynamic-mode',
              value: 'ThresholdRange',
              values: [
                { value: 'ThresholdDynamic', label: 'Dynamic' },
                { value: 'ThresholdRange', label: 'Range' },
              ],
              commands: ({ value, commandsManager, options }) => {
                if (value === 'ThresholdDynamic') {
                  commandsManager.run('setToolActive', {
                    toolName: 'ThresholdCircularBrushDynamic',
                  });

                  return;
                }
                const thresholdRangeOption = options.find(
                  option => option.id === 'threshold-shape'
                );

                commandsManager.run('setToolActiveToolbar', {
                  toolName: thresholdRangeOption.value,
                });
              },
            },
            {
              name: 'Shape',
              type: 'radio',
              id: 'threshold-shape',
              value: 'ThresholdCircularBrush',
              values: [
                { value: 'ThresholdCircularBrush', label: 'Circle' },
                { value: 'ThresholdSphereBrush', label: 'Sphere' },
              ],
              condition: ({ options }) =>
                options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
              commands: 'setToolActiveToolbar',
            },
            {
              name: 'ThresholdRange',
              type: 'double-range',
              id: 'threshold-range',
              min: -1000,
              max: 1000,
              step: 1,
              value: [100, 600],
              condition: ({ options }) =>
                options.find(option => option.id === 'dynamic-mode').value === 'ThresholdRange',
              commands: {
                commandName: 'setThresholdRange',
                commandOptions: {
                  toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush'],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'CreateSegmentation',
    uiType: 'ohif.customRadioGroupWithIcon',
    props: {
      icon: 'tool-crosshair',
      label: 'SEGMENTATION',
      commands: 'createNewSegmentation',
      evaluate: 'evaluate.action',
    },
  },
];

export default toolbarButtons;
