/* eslint-disable no-unused-expressions */
import TestUtils from 'react-addons-test-utils';
import Header from 'components/Header';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<Header {...props} />);
}


describe('(View) Home', function () {
  let _component;

  beforeEach(function () {
    _component = renderWithProps();
  });

  it('Should fire an api event on "test api" button click.', (done) => {
    let btn;
    btn = TestUtils.scryRenderedDOMComponentsWithClass(_component, 'btn-danger');
    TestUtils.Simulate.click(btn);
    expect(btn).to.exist;
    done();
  });

  // it('Should render with an <h2> that includes Sample Counter text.', function () {
  //   const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2');

  //   expect(h2).to.exist;
  //   expect(h2.textContent).to.match(/Sample Counter/);
  // });

  // it('Should render props.counter at the end of the sample counter <h2>.', function () {
  //   const h2 = TestUtils.findRenderedDOMComponentWithTag(
  //     renderWithProps({ ..._props, counter: 5 }), 'h2'
  //   );

  //   expect(h2).to.exist;
  //   expect(h2.textContent).to.match(/5$/);
  // });

  // describe('An increment button...', function () {
  //   let _btn;

  //   beforeEach(() => {
  //     _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
  //       .filter(a => /Increment/.test(a.textContent))[0];
  //   });

  //   it('should be rendered.', function () {
  //     expect(_btn).to.exist;
  //   });

  //   it('should dispatch an action when clicked.', function () {
  //     _spies.dispatch.should.have.not.been.called;
  //     TestUtils.Simulate.click(_btn);
  //     _spies.dispatch.should.have.been.called;
  //   });
  // });

  // describe('A Double (Async) button...', function () {
  //   let _btn;

  //   beforeEach(() => {
  //     _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
  //       .filter(a => /Double/.test(a.textContent))[0];
  //   });

  //   it('should be rendered.', function () {
  //     expect(_btn).to.exist;
  //   });

  //   it('should dispatch an action when clicked.', function () {
  //     _spies.dispatch.should.have.not.been.called;
  //     TestUtils.Simulate.click(_btn);
  //     _spies.dispatch.should.have.been.called;
  //   });
  // });
});
