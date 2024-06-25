import {Router, RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {FacilitiesListComponent} from "./facilities-list/facilities-list.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'',component: FacilitiesListComponent
            },
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FacilitieRoutingModule{ }
