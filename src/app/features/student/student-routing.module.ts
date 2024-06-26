
import {NgModule} from "@angular/core";

import {Routes,RouterModule} from "@angular/router";
import {LayoutComponent} from "../../shared/layout/layout.component";
import {StudentListComponent} from "./student-list/student-list.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {path: '', component:StudentListComponent},
        ]
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class StudentsRoutingModule{ }