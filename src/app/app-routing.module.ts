import { NgModule } from '@angular/core';           // Import Angular's NgModule decorator
import { RouterModule, Routes } from '@angular/router';  // Import RouterModule and Routes for routing

// Define the routes array, currently empty, to be populated with actual routes
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],         // Import the RouterModule with the root routes
  exports: [RouterModule]                          // Export RouterModule so it can be used in the app
})
export class AppRoutingModule { }                  // Declare AppRoutingModule as the routing module for the application
