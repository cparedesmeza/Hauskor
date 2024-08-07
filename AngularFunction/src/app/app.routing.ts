//Importación de modulos que me permiten la navegación parte de las librerias de routing en angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule,ExtraOptions} from "@angular/router";


//Importar componentes a los cuales les quiero hacer una pagina exclusiva

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ErrorComponent } from "./components/error/error.component";
import { ArticuloSelectComponent } from "./components/articulo-select/articulo-select.component";
import { ModalComponent } from "./components/modal/modal.component";


//Options del router
const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled'
}
//Arreglo de las rutas 
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contacto', component: LoginComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'bag', component: ArticuloSelectComponent },
    { path: 'bag/:id', component: ArticuloSelectComponent},
    { path: 'home/:search/:visible', component: ModalComponent},
    { path: 'contacto/section1', component: LoginComponent},
    { path: '**', component: ErrorComponent },
    
];

//Exportar los modulos de ruta

export const appRoutingProviders: any[] = []; //Levanta el servicio de ruteo en angular
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes,routerOptions);