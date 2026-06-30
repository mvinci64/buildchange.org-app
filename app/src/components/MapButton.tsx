import React from 'react';
import { PrimaryButton } from './PrimaryButton';

type Props = { onPress: () => void };

/** Thin alias over PrimaryButton for the "Open Map" affordance. */
export function MapButton({ onPress }: Props) {
  return <PrimaryButton title="Open Map" onPress={onPress} />;
}
