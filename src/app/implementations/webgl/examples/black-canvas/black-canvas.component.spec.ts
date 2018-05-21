import { TestBed, inject } from '@angular/core/testing';
import { BlackCanvasComponent } from './black-canvas.component';

describe('FOO', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            BlackCanvasComponent
        ]
    }));

    let component: BlackCanvasComponent;

    beforeEach(inject([BlackCanvasComponent], (injComponent: BlackCanvasComponent) => {
        component = injComponent;
    }));

    it('should be created', () => {
    });

});
