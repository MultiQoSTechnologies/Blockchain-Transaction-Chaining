import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { FormsModule } from '@angular/forms';
import { ShortenAddressPipe } from './pipes/shorten-address.pipe';

/**
 * AppModule
 * The root module of the Angular application that declares components, pipes, and imports necessary modules.
 */
@NgModule({
  declarations: [
    /**
     * Declares the components and pipes used in this module.
     */
    AppComponent,           // The root component of the application.
    TransactionComponent,   // Component for handling Ethereum transactions.
    ShortenAddressPipe      // Custom pipe to shorten Ethereum wallet addresses.
  ],
  imports: [
    /**
     * Imports Angular and application-specific modules required for this module.
     */
    BrowserModule,          // Provides browser-specific services and directives.
    AppRoutingModule,       // Module for handling application routing.
    FormsModule             // Provides support for template-driven forms.
  ],
  providers: [
    /**
     * Declares services and providers for dependency injection.
     * Currently empty as no services are added at this level.
     */
  ],
  bootstrap: [
    /**
     * Defines the root component to bootstrap when the application starts.
     */
    AppComponent
  ]
})
export class AppModule { }
