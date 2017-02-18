import { QCcloudBootstrapPage } from './app.po';

describe('qccloud-bootstrap App', function() {
  let page: QCcloudBootstrapPage;

  beforeEach(() => {
    page = new QCcloudBootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
