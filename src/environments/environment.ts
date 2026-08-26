// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration production` replaces `environment.ts` with `environment.production.ts`.
// `ng test --configuration test` replaces `environment.ts` with `environment.test.ts`.
// The list of file replacements can be found in `angular.json`.
import { BuildConfig } from '../config/build-config.interface';
export const environment: Partial<BuildConfig> = {
  production: true,
  defaultLanguage: 'pt_BR',
  // REST backend fixo no bundle para garantir baseUrl no cliente (evita /api sem /server
  // quando o TransferState do SSR nao e injetado ou o fetch do config.json falha).
  rest: {
    ssl: true,
    host: 'repositorio-teste.ifba.edu.br',
    port: 443,
    nameSpace: '/server',
    baseUrl: 'https://repositorio-teste.ifba.edu.br/server',
  },
  universal: {
    preboot: true,
    async: true,
    time: false
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
