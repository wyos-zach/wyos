describe('Jest Setup', () => {
  it('should be properly configured', () => {
    expect(true).toBe(true);
  });

  // This test verifies that the DOM environment is working
  it('should have access to DOM elements', () => {
    const element = document.createElement('div');
    element.innerHTML = 'Test';
    expect(element.innerHTML).toBe('Test');
  });
});
