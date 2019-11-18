import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


export interface DialogData {
    css: string;
    type: string;
    message: string;
}


@Component({
    selector: 'dialog.component',
    templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog {
    constructor(private _bottomSheetRef: MatBottomSheetRef<DialogOverviewExampleDialog>) { }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    // constructor(
    //   public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    //   @Inject(MAT_DIALOG_DATA) public data: any) { }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }

}
