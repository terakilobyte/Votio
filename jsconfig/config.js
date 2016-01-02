module.exports = {
  dir_client: './web/static/js/src/',
  dir_test: './web/static/js/tests/',
  coverage_enabled: true,
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
};
