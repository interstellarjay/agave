const TEMPLATE_STORYBOOK = `
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

// %%c%% story
export const default = () => <%%c%% onClick={action('clicked')} />;
`

module.exports = {
    TEMPLATE_STORYBOOK
}