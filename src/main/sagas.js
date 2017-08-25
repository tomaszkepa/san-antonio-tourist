// @flow
import type { CallFn } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeLatest, delay } from 'redux-saga';

import { setupSagaTarget } from '@wh/saga-utils';

/**
 * Saga to watch actions. It basically listens for actions of the mentioned
 * type and calls updateSelectionPrice. takeLatest handles concurrency by only executing the later action
 * @returns {void}
 */
function* watch(): Iterator<CallFn> {
}

export default watch;
