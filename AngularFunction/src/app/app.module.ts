import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionBSComponent } from './components/section-bs/section-bs.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { ArticuloSelectComponent } from './components/articulo-select/articulo-select.component';
import { FunctionService } from './services/functions.services';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SliderComponent,
    ContentComponent,
    FooterComponent,
    SectionBSComponent,
    LoginComponent,
    ShopComponent,
    ErrorComponent,
    ArticuloComponent,
    ArticuloSelectComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,//modulo de servicio comentado en app.routing
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    appRoutingProviders,
    FunctionService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
