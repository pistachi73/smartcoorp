chai.Assertion.addMethod('eqText', function (expectedString: string) {
  const $element = this._obj;

  new chai.Assertion($element).to.be.exist;

  const actual = $element.text();
  const expected = expectedString;
  this.assert(
    actual.includes(expected.trim()) && actual.length === expected.length,

    ' Expected #{this} to have text #{exp} after trimmed, but the text was #{act} after trimmed',
    'expected #{this} not to have text #{exp} after trimmed',
    expected,
    actual
  );
});
