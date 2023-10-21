import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-go-dialog',
    templateUrl: './go-dialog.component.html',
    styleUrls: ['./go-dialog.component.scss']
})
export class GoDialogComponent implements OnInit {
    // @Input() confirmDelete: (args: any) => void;
    @Input() showDialog!: boolean
    @Input() confirmCallBack!: () => void;

    //@ts-ignore
    @Output() cancelDialog = new EventEmitter<boolean>();

    constructor() {

    }

    ngOnInit(): void {
        console.log('====================================');

    }

}
