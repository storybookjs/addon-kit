import React from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
import { ADDON_ID } from './constants';

/**
 * This opt-in helper can be manually imported by your users who want to
 * use it, and ignored by those who don't.
 */
export function renderLabel(item: API_HashEntry) {
  if (item.type !== 'story' && item.type !== 'docs') {
    return;
  }

  if (item.title.startsWith(ADDON_ID)) {
    return <span>🌟 {item.name}</span>;
  }
}
