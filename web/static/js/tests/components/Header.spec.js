/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils';
import Header from 'components/Header';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

describe('(Component) Header', function () {
  let _component;
  beforeEach(() => {
    _component = shallowRender(<Header />);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });
});
