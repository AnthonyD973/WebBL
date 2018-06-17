import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlackCanvasComponent } from './implementations/webgl/examples/black-canvas/black-canvas.component';
import { GettingStartedComponent } from './implementations/webgl/examples/mdn-tutorial/getting-started/getting-started.component';


@NgModule({
    declarations: [
        AppComponent,
        BlackCanvasComponent,
        GettingStartedComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
