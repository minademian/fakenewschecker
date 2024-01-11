import { ExtractDomainName } from '../controllers/lookup.controller';
import config from '../services/config';

describe('Lookup route functions', () => {
  it('should return the domain name', () => {
    const test = 'https://edition.cnn.com/2023/12/29/europe/';
    expect(ExtractDomainName(test)).toStrictEqual('cnn.com');
  });
  it('should return the status report for a news article', () => {
    const test =
      'https://clickhole.com/2020/09/12/alien-has-babies-with-hot-sauce';
    const domain = 'clickhole.com';
    expect(ExtractDomainName(test)).toStrictEqual(domain);
  });
});
