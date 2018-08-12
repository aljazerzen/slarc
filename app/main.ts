import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app.module';

// this import should be first in order to load some required settings (like globals and reflect-metadata)
platformNativeScriptDynamic().bootstrapModule(AppModule);
