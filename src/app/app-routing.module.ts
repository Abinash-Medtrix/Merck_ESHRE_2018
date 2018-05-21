import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { AgendaComponent } from './agenda/agenda.component';
import { LivewebcastComponent } from './livewebcast/livewebcast.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'landing',
        component: NavbarComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'speakers', component: SpeakersComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'agenda', component: AgendaComponent },
            { path: 'livewebcast', component: LivewebcastComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
