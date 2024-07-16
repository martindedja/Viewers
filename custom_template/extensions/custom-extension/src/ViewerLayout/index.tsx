import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ErrorBoundary, LoadingIndicatorProgress, InvestigationalUseDialog } from '@ohif/ui';
import { HangingProtocolService, CommandsManager } from '@ohif/core';
import { useAppConfig } from '@state';
import ViewerHeader from './ViewerHeader';
import SidePanelWithServices from '@ohif/extension-default/src/Components/SidePanelWithServices';

function ViewerLayout(): React.FunctionComponent {}

export default ViewerLayout;
