import { SectionsComponent } from './sections/sections.component';
import { ComponentsModule } from './../../utilities/components/components.module';
import { CoursesComponent } from './courses.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { SkeletonModule } from 'primeng/skeleton';
import { SingleCourseComponent } from './single-course/single-course.component';
import { SectionItemComponent } from './sections/section-item/section-item.component';
import { DragDropModule } from 'primeng/dragdrop';
import { LiveSessionDialogComponent } from './sections/section-item/live-session-dialog/live-session-dialog.component';
import { VideoDialogComponent } from './sections/section-item/video-dialog/video-dialog.component';

const primeModules = [TableModule, FileUploadModule, FormsModule, ButtonModule,
    RippleModule, ToastModule, ToolbarModule, RatingModule, InputTextModule, SkeletonModule,
    InputTextareaModule, DropdownModule, RadioButtonModule, InputNumberModule,
    DialogModule, ComponentsModule, CheckboxModule, InputSwitchModule, CalendarModule, DragDropModule]

const routes: Routes = [
    { path: '', component: CoursesComponent },
    { path: 'create', component: SingleCourseComponent },
    { path: ':id/edit', component: SingleCourseComponent },
    { path: ':id/sections', component: SectionsComponent }

];

@NgModule({
    imports: [
        CommonModule,
        primeModules,
        RouterModule.forChild(routes)
    ],
    declarations: [CoursesComponent, SectionsComponent, SingleCourseComponent, SectionItemComponent, LiveSessionDialogComponent, VideoDialogComponent,],
    exports: [RouterModule],
})
export class CoursesModule { }
