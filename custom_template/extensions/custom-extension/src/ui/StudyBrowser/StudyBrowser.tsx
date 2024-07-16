import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { InputRange, ThumbnailList } from '@ohif/ui';
import SidePanelToolbox from '../SidePanelToolbox';

const noop = () => {};

const StudyBrowser = ({
  tabs,
  activeTabName,
  expandedStudyInstanceUIDs,
  onClickTab = noop,
  onClickStudy = noop,
  onClickThumbnail = noop,
  onDoubleClickThumbnail = noop,
  onClickUntrack = noop,
  activeDisplaySetInstanceUIDs,
  servicesManager,
}: withAppTypes) => {
  const { t } = useTranslation('StudyBrowser');
  const { cornerstoneViewportService, viewportGridService } = servicesManager?.services || {};
  const [rangeValue, setZoomValue] = useState(1);

  const changeViewportZoon = value => {
    const activeViewportId = viewportGridService.getActiveViewportId();
    const viewport = cornerstoneViewportService.getCornerstoneViewport(activeViewportId);
    viewport.setZoom(value);
    viewport.render();
  };
  const getTabContent = () => {
    const tabData = tabs.find(tab => tab.name === activeTabName);
    return tabData.studies.map(
      ({ studyInstanceUid, date, description, numInstances, modalities, displaySets }) => {
        const isExpanded = expandedStudyInstanceUIDs.includes(studyInstanceUid);
        return (
          <React.Fragment key={studyInstanceUid}>
            {isExpanded && displaySets && (
              <ThumbnailList
                thumbnails={displaySets}
                activeDisplaySetInstanceUIDs={activeDisplaySetInstanceUIDs}
                onThumbnailClick={onClickThumbnail}
                onThumbnailDoubleClick={onDoubleClickThumbnail}
                onClickUntrack={onClickUntrack}
              />
            )}
          </React.Fragment>
        );
      }
    );
  };

  return (
    <React.Fragment>
      <SidePanelToolbox servicesManager={servicesManager} />
      <div className="ohif-scrollbar invisible-scrollbar flex flex-1 flex-col overflow-auto">
        {getTabContent()}
      </div>
      <div className="w-full">
        <InputRange
          minValue={0}
          maxValue={3}
          value={rangeValue.toFixed(2)}
          onChange={value => {
            changeViewportZoon(value);
            setZoomValue(value);
          }}
          step={0.1}
          containerClassName="mt-[4px] mb-[9px]"
          inputClassName="w-full"
          labelClassName="text-white text-[12px] whitespace-nowrap"
          unit="%"
        />
        <SidePanelToolbox
          buttonSection="bottomSidePanelToolbox"
          servicesManager={servicesManager}
        />
      </div>
    </React.Fragment>
  );
};

StudyBrowser.propTypes = {
  onClickTab: PropTypes.func.isRequired,
  onClickStudy: PropTypes.func,
  onClickThumbnail: PropTypes.func,
  onDoubleClickThumbnail: PropTypes.func,
  onClickUntrack: PropTypes.func,
  activeTabName: PropTypes.string.isRequired,
  expandedStudyInstanceUIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeDisplaySetInstanceUIDs: PropTypes.arrayOf(PropTypes.string),
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      studies: PropTypes.arrayOf(
        PropTypes.shape({
          studyInstanceUid: PropTypes.string.isRequired,
          date: PropTypes.string,
          numInstances: PropTypes.number,
          modalities: PropTypes.string,
          description: PropTypes.string,
          displaySets: PropTypes.arrayOf(
            PropTypes.shape({
              displaySetInstanceUID: PropTypes.string.isRequired,
              imageSrc: PropTypes.string,
              imageAltText: PropTypes.string,
              seriesDate: PropTypes.string,
              seriesNumber: PropTypes.any,
              numInstances: PropTypes.number,
              description: PropTypes.string,
              componentType: PropTypes.oneOf(['thumbnail', 'thumbnailTracked', 'thumbnailNoImage'])
                .isRequired,
              isTracked: PropTypes.bool,
              dragData: PropTypes.shape({
                type: PropTypes.string.isRequired,
              }),
            })
          ),
        })
      ).isRequired,
    })
  ),
};

export default StudyBrowser;
