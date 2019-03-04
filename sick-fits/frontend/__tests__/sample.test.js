describe('sample test 101', () => {
  it('works as expected', () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });

  it('handles ranges just fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  fit('makes a list of dogs names', () => {
    const dogs = ['useless', 'detestable'];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('useless');
  });
});
