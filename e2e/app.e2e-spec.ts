import { RangerPage } from './app.po';

describe('ranger App', () => {
  let page: RangerPage;

  beforeEach(() => {
    page = new RangerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
