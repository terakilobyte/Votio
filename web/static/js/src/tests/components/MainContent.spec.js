/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import MainContent from 'components/MainContent';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

describe('(Component) MainContent', function () {
  let _component;

  beforeEach(function () {
    _component = shallowRender(<MainContent />);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });

  it('Should have class \'jumbotron\'', () => {
    expect(_component.props.className).to.includes('jumbotron');
  });
});
