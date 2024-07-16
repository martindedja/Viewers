import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { ErrorBoundary, UserPreferences, AboutModal, Header, useModal, useViewportGrid } from '@ohif/ui';
import i18n from '@ohif/i18n';
import { hotkeys } from '@ohif/core';
import { Toolbar } from '@ohif/extension-default/src/Toolbar/Toolbar';

const { availableLanguages, defaultLanguage, currentLanguage } = i18n;

function ViewerHeader() {}

export default ViewerHeader;
