import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
    @Input() public model: any;
    @Input() public label: string;
    @Output() public modelChanged: EventEmitter<any> = new EventEmitter();
}
