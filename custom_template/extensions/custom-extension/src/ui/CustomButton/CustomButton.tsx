import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonEnums, Icon, Tooltip } from '@ohif/ui';
import Button from './Button';

const CustomButton = ({
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
  toolTipClassName = 'autowidth',
  disableToolTip = false,
  ...rest
}) => {
  const shouldShowDropdown = !!dropdownContent;
  const iconEl = icon ? (
    <div className="flex">
      <Icon name={icon} />
      <span>{label}</span>
    </div>
  ) : (
    <div>{label || 'Missing icon and label'}</div>
  );

  const sizeToUse = size ?? 'toolbar';
  const toolTipClassNameToUse = '';

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
        <Button
          type={ButtonEnums.type.secondary}
          size={ButtonEnums.size.medium}
          startIcon={<Icon className="!h-[20px] !w-[20px]" name={icon} />}
          className={classNames(
            className,
            disabled
              ? 'ohif-disabled font-default border-secondary-light mr-2 mt-2 border'
              : 'font-default border-secondary-light mr-2 mt-2 border'
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
          {...rest}
          style={{ color: 'inherit', backgroundColor: 'inherit', fontWeight: 'default' }}
        >
          {label}
        </Button>
      </Tooltip>
    </div>
  );
};

CustomButton.propTypes = {
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

export default CustomButton;
