import { Routes } from '@angular/router';

import { PetDetail } from './pages/pet-detail/pet-detail';
import { PetList } from './pages/pet-list/pet-list';

export const routes: Routes = [
  { path: '', component: PetList },
  { path: 'pets/:id', component: PetDetail },
  { path: '**', redirectTo: '' },
];
