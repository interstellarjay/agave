const TEMPLATE_STORYBOOK = `
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

// %%_CMP_%% story
export const default = () => <%%_CMP_%% onClick={action('clicked')} />;
`

module.exports = {
    TEMPLATE_STORYBOOK
}