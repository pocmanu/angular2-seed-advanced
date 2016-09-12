import {argv} from 'yargs';
import {SeedConfig} from './seed.config';

export class SeedAdvancedConfig extends SeedConfig {

  constructor() {
    super();
    let arg: string;
    if (argv && argv._) {
      arg = argv._[0];
      if (arg.indexOf('desktop') > -1) {
        this.TARGET_DESKTOP = true;
        if (arg.indexOf('.mac') > -1 || arg.indexOf('.windows') > -1 || arg.indexOf('.linux') > -1) {
          this.TARGET_DESKTOP_BUILD = true;
        }
      } else if (arg.indexOf('hybrid') > -1) {
        this.TARGET_MOBILE_HYBRID = true;
      }
    }
    let bootstrap = 'main.web';
    if (this.ENABLE_HOT_LOADING) {
      bootstrap   = 'hot_loader_main';
    } else if (this.TARGET_MOBILE_HYBRID) {
      bootstrap   = 'main.mobile.hybrid'; // Cordova
    }

    // Override seed defaults
    this.BOOTSTRAP_DIR = argv['app'] ? (argv['app'] + '/') : '';
    this.BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}` + (this.ENABLE_HOT_LOADING ? 'hot_loader_main' : bootstrap);
    this.NG_FACTORY_FILE = `${bootstrap}.prod`;
    this.BOOTSTRAP_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}`;
    this.BOOTSTRAP_FACTORY_PROD_MODULE = `${this.BOOTSTRAP_DIR}${bootstrap}.prod`;

<<<<<<< HEAD
      // reset system config with new APP_BASE      
      this.SYSTEM_CONFIG = {
        defaultJSExtensions: true,
        paths: {
          [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
          'rxjs/*': `${this.APP_BASE}rxjs/*`,
          'app/*': `/app/*`,
          '*': `${this.APP_BASE}node_modules/*`
        }
      };
      
      this.SYSTEM_CONFIG.paths['ng2-translate/*'] = `${this.APP_BASE}node_modules/ng2-translate/*`;
      this.SYSTEM_CONFIG.paths['reflect-metadata'] = `${this.APP_BASE}node_modules/reflect-metadata/Reflect`;
    } else {
      this.SYSTEM_CONFIG['map'] = {
        'angular2-grid': `${this.APP_BASE}node_modules/angular2-grid/dist/main`
      };
    }
=======
    this.APP_TITLE = 'Angular 2 Seed Advanced';
    this.APP_BASE = ''; // paths must remain relative
>>>>>>> upstream/master

    /** Development **/

    // Fix up package configuration for libs and @ngrx
    this.SYSTEM_CONFIG['packageConfigPaths'] = [
      `${this.APP_BASE}node_modules/*/package.json`,
<<<<<<< HEAD
      `${this.APP_BASE}node_modules/@angular/*/package.json`,
      `${this.APP_BASE}node_modules/@ngrx/*/package.json`,
      `${this.APP_BASE}node_modules/@hoodie/*/package.json`
    ]; 
    this.SYSTEM_CONFIG['packages'] = systemJsPackages();
=======
      `${this.APP_BASE}node_modules/@ngrx/*/package.json`
    ];
    if (!this.SYSTEM_CONFIG['packages']) this.SYSTEM_CONFIG['packages'] = {};
    this.SYSTEM_CONFIG['packages']['@ngrx/core'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_CONFIG['packages']['@ngrx/store'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
>>>>>>> upstream/master

    // Fix up paths for libs
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['angulartics2'] = `${this.APP_BASE}node_modules/angulartics2/index`;
    this.SYSTEM_CONFIG.paths['angulartics2/*'] = `${this.APP_BASE}node_modules/angulartics2/*`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;

    /** Production **/

    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths']; // not all libs are distributed the same
    this.SYSTEM_BUILDER_CONFIG['packages']['@ngrx/core'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG['packages']['@ngrx/store'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.paths['angulartics2'] = `node_modules/angulartics2/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/core'] = `node_modules/@ngrx/core/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/store'] = `node_modules/@ngrx/store/index.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-grid'] = `node_modules/angular2-grid/dist/main.js`;
  }
}
