/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils';
import {shallowRender} from '../../helpers/test-helpers';
import CoreLayout from 'layouts/CoreLayout';
import Header from 'components/Header';
import HomeView from 'views/HomeView';
import store from '../../helpers/redux-helpers';

describe('(Layout) Core', function () {
  let _component, _rendered, children, props;

  beforeEach(function () {
    children = <HomeView store={store}/>;
    props = {
      children
    };
    _component = shallowRender(<CoreLayout />);
    _rendered = TestUtils.renderIntoDocument(<CoreLayout {...props} />);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });

  it('Should contain the Header component', () => {
    const headerComponent = TestUtils.findRenderedComponentWithType(_rendered, Header);
    expect(headerComponent).to.exist;
  });
});
