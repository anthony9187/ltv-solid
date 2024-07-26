import {
  createEffect,
  on,
  createSignal,
  onCleanup,
  getOwner,
  runWithOwner,
} from 'solid-js';
import { useFocusManager as useFocusManagerCore } from '@lightningtv/core';
import type { KeyMap, KeyHoldOptions, ElementNode } from '@lightningtv/core';
import { activeElement } from '../activeElement.js';

const [focusPath, setFocusPath] = createSignal<ElementNode[]>([]);
export { focusPath };

export const useFocusManager = (
  userKeyMap?: Partial<KeyMap>,
  keyHoldOptions?: KeyHoldOptions,
) => {
  const owner = getOwner();
  const ownerContext = runWithOwner.bind(this, owner);
  const { cleanup, focusPath: focusPathCore } = useFocusManagerCore({
    userKeyMap,
    keyHoldOptions,
    ownerContext,
  });

  createEffect(
    on(
      activeElement,
      () => {
        setFocusPath([...focusPathCore()]);
      },
      { defer: true },
    ),
  );

  onCleanup(cleanup);
};
