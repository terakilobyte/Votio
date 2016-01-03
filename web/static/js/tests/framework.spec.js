import assert from 'assert';

describe('(Framework) Karma Plugins', function () {
  it('Should expose "expect" globally.', function () {
    assert.ok(expect);
  });

  it('Should expose "should" globally.', function () {
    assert.ok(should);
  });

  xit('Should have chai-as-promised helpers.', function () {
    const pass = new Promise(res => res('test'));
    const fail = new Promise((res, rej) => rej());

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ]);
  });

  it('Should have chai.jsx helper "deep.equal".', () => {
    expect(<div>Hello</div>).to.deep.equal(<div>Hello</div>);
  });

  it('Should have chai.jsx helper ".jsx"', () => {
    expect(<div>test</div>).to.be.jsx;
  });

  it('Should have chai.jsx helper "include".', () => {
    expect(<h1>Hello</h1>).to.include(<h1>Hello</h1>);
  });
});
