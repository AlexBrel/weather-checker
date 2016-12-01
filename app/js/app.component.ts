import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `<div class="super-class">
        I'm your first component
        
    </div>`,
    styles:[require('./app.component.css')]

})
export class AppComponent {
}