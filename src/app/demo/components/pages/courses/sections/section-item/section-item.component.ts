import { SectionService } from './../../../../../core/services/section.service';
import { MessageService } from 'primeng/api';
import { ISection, ILiveSession, IShowDialog } from './../../../../../models/interfaces/section';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-section-item',
    templateUrl: './section-item.component.html',
    styleUrls: ['./section-item.component.scss'],
    providers: [MessageService]
})
export class SectionItemComponent {
    @Input() courseId!: number;
    sectionModel = {} as ISection
    liveSession = {} as ILiveSession
    sectionId!: number

    // ui
    showDialog!: BehaviorSubject<IShowDialog>
    submitted: boolean = false;
    videoDialog: boolean = false
    isFormDisabled: boolean = false;

    constructor(public messageService: MessageService, private sectionService: SectionService) {
        this.showDialog = new BehaviorSubject<IShowDialog>({ liveSession: false, video: false, reading: false, });
    }

    handleSaveSection() {
        this.submitted = true;
        const observer = {
            next: (section: any) => this.sectionId = section.id,
            complete: () => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Successful section creation!', life: 3000 }),
        }
        const { durationInHour, sectionTitle } = this.sectionModel
        if (durationInHour && sectionTitle) {
            this.isFormDisabled = true;
            console.log(this.sectionModel)
            this.sectionService.createSection(this.sectionModel, this.courseId).subscribe(observer)
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Warnning', detail: 'Complete section data!', life: 3000 })
        }
    }

}
