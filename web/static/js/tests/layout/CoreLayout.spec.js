/* eslint-disable no-unused-expressions */
import {shallowRender} from '../../helpers/test-helpers';
import CoreLayout from 'layouts/CoreLayout';

describe('(Layout) Core', function () {
  let _component;

  beforeEach(function () {
    _component = shallowRender(<CoreLayout />);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });
});
