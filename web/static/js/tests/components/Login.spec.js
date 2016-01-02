/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils';
import Login from 'components/Login';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<Login {...props} />);
}

// function shallowRenderWithProps (props = {}) {
//   return shallowRender(<HomeView {...props} />);
// }

// beforeEach(function () {
//   _spies = {};
//   _props = {
//     counter: 0,
//       ...bindActionCreators({
//         doubleAsync: (_spies.doubleAsync = sinon.spy()),
//         increment: (_spies.increment = sinon.spy())
//       }, _spies.dispatch = sinon.spy())
//   };

//   _component = shallowRenderWithProps(_props);
// });


describe('(Component) Login', () => {
  let _component, _rendered;

  beforeEach(function () {
    _rendered = shallowRender(<Login />);
    _component = renderWithProps();
  });

  it('Should render as a <div>.', function () {
    expect(_rendered.type).to.equal('div');
  });

  it('Should have 3 login buttons.', () => {
    const buttons = TestUtils.scryRenderedDOMComponentsWithClass(_component, 'btn');
    expect(buttons.length).to.equal(3);
  });
});
