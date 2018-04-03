import React from 'react';
import { shallow } from 'enzyme';
import { noop, indexOf } from 'lodash/fp';

import locales from 'constants/locales';
import moment from 'moment/moment';
import forEach from 'lodash/forEach';

const setup = ({ locale = 'en-US' } = {}) => ({
  locale
});

describe.only('<Localization />', () => {
  let momentSpy, storeSpy, Localization, subscribeCallback;

  beforeEach(() => {
    momentSpy = {
      defineLocale: jest.fn(),
      locale: jest.fn()
    };

    storeSpy = {
      subscribe: jest.fn(callback => {
        subscribeCallback = callback;
      }),
      getState: jest.fn(() => ({ localization: { locale: 'en-US' } }))
    };

    jest.doMock('moment', () => momentSpy);
    jest.doMock('store', () => storeSpy);

    Localization = require('components/localization').Localization;
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('should render', () => {
    const props = setup();
    const component = shallow(
      <Localization {...props}>
        <div>Hello world</div>
      </Localization>
    );

    expect(component).toMatchSnapshot();
  });

  test('should define locales in moment', () => {
    let index = 0;
    forEach(locales, (locale, key) => {
      expect(momentSpy.defineLocale.mock.calls[index]).toEqual([
        key,
        locale.dateTimeFormat
      ]);
      index += 1;
    });
  });

  test('should set moment default locale from the store', () => {
    expect(momentSpy.locale).toHaveBeenCalledWith('en-US');
  });

  test('should set moment default locale when it changes in the store', () => {
    storeSpy.getState = jest.fn(() => ({ localization: { locale: 'he-IL' } }));
    subscribeCallback();

    expect(momentSpy.locale).toHaveBeenCalledWith('he-IL');
  });
});
