import { SectionService } from './../../../../../../core/services/section.service';
import { ILiveSession, IShowDialog } from './../../../../../../models/interfaces/section';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-live-session-dialog',
    templateUrl: './live-session-dialog.component.html',
    styleUrls: ['./live-session-dialog.component.scss'],
    providers: [MessageService]
})
export class LiveSessionDialogComponent implements OnInit, OnDestroy {
    liveSession = {} as ILiveSession

    // ui
    submitted: boolean = false;
    @Input() materialDialog!: BehaviorSubject<IShowDialog>;
    @Input() sectionId!: number;

    showSessionDialog!: boolean
    minDate: Date = new Date()
    constructor(public messageService: MessageService, private sectionService: SectionService) { }

    ngOnInit(): void {
        this.materialDialog.asObservable().subscribe((dialog: any) => this.showSessionDialog = dialog.liveSession)
    }
    saveMaterial() {
        this.submitted = true;
        const observer = {
            next: (res: any) => {
                console.log(res)
                this.materialDialog.next({ liveSession: false })
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Successful live session creation!', life: 3000 })
            },
        }
        this.liveSession.sectionId = this.sectionId
        const { durationInMin, materialName, sectionId, startTime, topic } = this.liveSession
        if (materialName && durationInMin && sectionId && startTime && topic) {
            this.sectionService.createLiveSession(this.liveSession).subscribe(observer)
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Warnning', detail: 'Complete Live Session data!', life: 3000 })
        }
    }
    ngOnDestroy(): void {
        this.materialDialog.unsubscribe()
    }
}
