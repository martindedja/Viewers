import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, IconButton, Tooltip, LegacyButton } from '@ohif/ui';

const CustomToolbarButton = ({
  id,
  icon,
  label,
  commands,
  onInteraction,
  dropdownContent = null,
  className,
  disabled,
  disabledText,
  size,
  toolTipClassName = 'auto',
  disableToolTip = false,
  ...rest
}) => {
  const shouldShowDropdown = !!dropdownContent;
  const iconEl = icon ? (
    <Icon name={icon} />
  ) : (
    <div className="border-secondary-light border">{label || 'Missing icon and label'}</div>
  );

  const sizeToUse = size ?? 'toolbar';
  const toolTipClassNameToUse =
    toolTipClassName !== undefined
      ? toolTipClassName
      : sizeToUse === 'toolbar'
        ? 'w-[40px] h-[40px]'
        : 'w-[32px] h-[32px]';

  return (
    <div key={id}>
      <Tooltip
        isSticky={shouldShowDropdown}
        content={shouldShowDropdown ? dropdownContent : label}
        secondaryContent={disabled ? disabledText : null}
        tight={shouldShowDropdown}
        className={toolTipClassNameToUse}
        isDisabled={disableToolTip}
      >
        {!icon ? (
          <LegacyButton
            className={classNames(
              className,
              disabled
                ? 'ohif-disabled text-primary-light mt-1 pl-3 pr-3 text-white'
                : 'text-primary-light mt-1 pl-3 pr-3 text-white'
            )}
            onClick={() => {
              onInteraction({
                itemId: id,
                commands,
              });
            }}
            name={label}
            key={id}
            id={id}
            {...{ ...rest, servicesmanager: null }}
            style={{ backgroundColor: 'inherit', minWidth: 'max-content' }}
          >
            {label}
          </LegacyButton>
        ) : (
          <IconButton
            size={sizeToUse}
            className={classNames(className, disabled ? 'ohif-disabled' : '')}
            onClick={() => {
              onInteraction({
                itemId: id,
                commands,
              });
            }}
            name={label}
            key={id}
            id={id}
            {...rest}
          >
            {iconEl}
          </IconButton>
        )}
      </Tooltip>
    </div>
  );
};

CustomToolbarButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  commands: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  onInteraction: PropTypes.func,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dropdownContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  size: PropTypes.string,
  toolTipClassName: PropTypes.string,
  disableToolTip: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CustomToolbarButton;
