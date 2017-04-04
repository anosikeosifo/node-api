describe('Routes::Index', () => {
  it('returns the API information', () => {
    request.get('/')
    .expect(200)
    .end((err, res) => {
      const expected = { "appName": 'ntask-api' };
      expect(res.body).to.eql(expected);
      done(err)
    });
  });
});
