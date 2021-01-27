import React from 'react';
import { shallow } from 'enzyme';
import { Localization } from '../../src/components/localization';
import { LocaleTypes } from '../../src/constants/locales';

const setup = ({ locale = 'en-US' as LocaleTypes } = {}) => ({
  locale
});

describe('<Localization />', () => {
  test('should render', () => {
    const props = setup();
    const component = shallow(
      <Localization {...props}>
        <div>Hello world</div>
      </Localization>
    );

    expect(component).toMatchSnapshot();
  });
});
