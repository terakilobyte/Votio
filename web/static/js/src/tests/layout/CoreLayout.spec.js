import TestUtils from 'react-addons-test-utils';
import CoreLayout from 'layouts/CoreLayout';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}


describe('(Layout) Core', function () {
  let _component;

  beforeEach(function () {
    _component = shallowRender(<CoreLayout />);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });
});
