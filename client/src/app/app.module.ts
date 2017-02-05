import './rxjs-extensions';

// Import angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Import application own modules
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { HeroModule } from './feature/hero/hero.module';
import { SharedModule } from './shared/shared.module';

// Import application components that don't belong in any module
import { APP_CONFIG, AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';

// Import application services that don't belong in any module
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HeroModule,
    HttpModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }