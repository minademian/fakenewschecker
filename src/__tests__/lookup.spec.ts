import { ExtractDomainName } from '../controllers/lookup.controller';
import config from '../services/config';

describe('Lookup route functions', () => {
  it('should return the domain name', () => {
    const test = 'https://edition.cnn.com/2023/12/29/europe/';
    expect(ExtractDomainName(test)).toStrictEqual('cnn.com');
  });
});
