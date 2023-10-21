import { SectionService } from './../../../../../../core/services/section.service';
import { BehaviorSubject } from 'rxjs';
import { IShowDialog, IVideo } from './../../../../../../models/interfaces/section';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-video-dialog',
    templateUrl: './video-dialog.component.html',
    styleUrls: ['./video-dialog.component.scss'],
    providers: [MessageService]

})
export class VideoDialogComponent implements OnInit, OnDestroy {
    videoModel = {} as IVideo

    //ui
    submitted: boolean = false
    @Input() materialDialog!: BehaviorSubject<IShowDialog>
    @Input() sectionId!: number;

    showVideoDialog!: boolean

    constructor(public messageService: MessageService, private sectionService: SectionService) { }

    ngOnInit(): void {
        this.materialDialog.asObservable().subscribe((dialog: any) => this.showVideoDialog = dialog.video)
    }
    saveMaterial() {
        this.submitted = true;
        const observer = {
            next: (res: any) => {
                console.log(res)
                this.materialDialog.next({ video: false })
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Successful video material creation!', life: 3000 })
            },
        }
        this.videoModel.sectionId = this.sectionId
        const { durationInMin, materialName, sectionId, additionalInfo, videoUrl } = this.videoModel

        if (materialName && durationInMin && sectionId && videoUrl) {
            console.log(this.videoModel)
            this.sectionService.createVideo(this.videoModel).subscribe(observer)
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Warnning', detail: 'Complete vide material data!', life: 3000 })
        }
    }
    ngOnDestroy(): void {
        this.materialDialog.unsubscribe()
    }
}
