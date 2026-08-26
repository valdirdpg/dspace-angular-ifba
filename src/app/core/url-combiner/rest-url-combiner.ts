import { URLCombiner } from './url-combiner';
import { environment } from '../../../environments/environment';

/**
 * Combines a variable number of strings representing parts
 * of a relative REST URL in to a single, absolute REST URL
 *
 * IFBA: usa environment.rest.baseUrl quando disponivel; senao, monta a partir de
 * ssl/host/port/nameSpace com fallback para /server (evita /api sem prefixo e tela branca).
 */
export class RESTURLCombiner extends URLCombiner {
  constructor(...parts: string[]) {
    const rest = (environment as any).rest || {};
    let baseUrl = rest.baseUrl;
    if (!baseUrl) {
      const ssl = rest.ssl ?? false;
      const host = rest.host || 'localhost';
      const port = rest.port || (ssl ? 443 : 80);
      const ns = rest.nameSpace || '/server';
      const proto = ssl ? 'https://' : 'http://';
      const portStr = (ssl && port === 443) || (!ssl && port === 80) ? '' : `:${port}`;
      baseUrl = `${proto}${host}${portStr}${ns.startsWith('/') ? ns : '/' + ns}`;
    }
    super(baseUrl, '/api', ...parts);
  }
}
