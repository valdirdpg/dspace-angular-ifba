import 'zone.js';
import 'reflect-metadata';
import 'core-js/es/reflect';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserAppModule } from './modules/app/browser-app.module';

import { environment } from './environments/environment';
import { AppConfig } from './config/app-config.interface';
import { extendEnvironmentWithAppConfig } from './config/config.util';
import { enableProdMode } from '@angular/core';

const bootstrap = () => platformBrowserDynamic()
  .bootstrapModule(BrowserAppModule, {});

/**
 * We use this to determine have been serven SSR HTML or not.
 *
 * At this point, {@link environment} may not be in sync with the configuration.
 * Therefore, we cannot depend on it to determine how to bootstrap the app.
 */
const hasTransferState = document.querySelector('script#dspace-angular-state') !== null;

const main = () => {
  if (environment.production) {
    enableProdMode();
  }

  if (hasTransferState) {
    // Configuration will be taken from transfer state during initialization
    return bootstrap();
  } else {
    // Configuration must be fetched explicitly
    return fetch('assets/config.json')
      .then((response) => response.json())
      .then((appConfig: AppConfig) => {
        // extend environment with app config for browser when not prerendered
        extendEnvironmentWithAppConfig(environment, appConfig);
        return bootstrap();
      })
      .catch(() => {
        // IFBA: se o fetch do config.json falhar, ainda assim inicializa a app
        // usando o baseUrl fixo do environment.ts (evita /api sem /server e tela branca).
        return bootstrap();
      });
  }
};

// IFBA: garante que main() SEMPRE execute, mesmo se DOMContentLoaded ja tiver disparado
// (scripts type="module" sao deferidos; em modo dev atras de proxy o listener podia nunca rodar).
if (hasTransferState || document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
