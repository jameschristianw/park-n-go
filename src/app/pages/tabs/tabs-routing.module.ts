import { TabsPage } from './tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'parking',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: '../history/history.module#HistoryPageModule',
          },
          {
            path:
              'vehicle/:bookId/:ownerId/:placeId/:vehiclePlateNo/:vehicleId/:vehicleType/:vehicleModel/:duration/:price/:arrivalTime/:leavingTime/:createdAt',
            loadChildren: '../history/vehicle/vehicle.module#VehiclePageModule',
          },
          {
            path:
              'place/:custEmail/:vehiclePlateNo/:vehicleModel/:vehicleType/:address/:placeName/:duration/:price/:arrivalTime/:createdAt/:leavingTime',
            loadChildren: '../history/place/place.module#PlacePageModule',
          },
        ],
      },

      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {
}
