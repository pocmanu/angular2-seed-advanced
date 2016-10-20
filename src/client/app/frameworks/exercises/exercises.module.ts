// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// libs
import { StoreModule } from '@ngrx/store';
import { DndModule } from 'ng2-dnd';
import { NgGridModule } from 'angular2-grid';

// current module
import { ExercisesComponent } from './exercises.component';
import { MissingWordExerciseComponent } from './missing-word-exercise/missing-word-exercise.component';
import { MissingWordPageComponent } from './missing-word-exercise/missing-word-page.component';
import { MissingWordComponent } from './missing-word-exercise/missing-word.component';

@NgModule({
    imports: [StoreModule, CommonModule, FormsModule, DndModule.forRoot(), NgGridModule],
    exports: [ExercisesComponent],
    declarations: [ExercisesComponent, MissingWordPageComponent, MissingWordExerciseComponent, MissingWordComponent],
    providers: [],
})
export class ExercisesModule { }
