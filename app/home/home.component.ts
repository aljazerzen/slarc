import { ItemEventData } from "ui/list-view"
import { Component, OnInit } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page/page';
import { View } from "ui/core/view";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    textFieldValue: string = "";

    addButtonSelected = null;
    people: { name: string, share: { amount: number, shareType: ShareType}[] }[] = [
        {
            name: "Fares", share: [{ amount: 30, shareType: ShareType.Food },
            { amount: 10, shareType: ShareType.Drinks },
            { amount: 20, shareType: ShareType.Food },
            { amount: 50, shareType: ShareType.Transport },
            { amount: 15, shareType: ShareType.Drinks }]
        },
        {
            name: "Aržen", share: [{ amount: 10, shareType: ShareType.Food },
            { amount: 10, shareType: ShareType.Drinks },
            { amount: 30, shareType: ShareType.Food },
            { amount: 10, shareType: ShareType.Food },
            { amount: 15, shareType: ShareType.Food }] },
        {
            name: "Šebo", share: [{ amount: 10, shareType: ShareType.Misc },
            { amount: 15, shareType: ShareType.Drinks }] },
        {
            name: "Lazar", share: [{ amount: 30, shareType: ShareType.Food },
            { amount: 20, shareType: ShareType.Food },
            { amount: 50, shareType: ShareType.Transport },
            { amount: 15, shareType: ShareType.Drinks }] }
    ];

    onItemTap(args: ItemEventData): void {
        console.log('Item with index: ' + args.index + ' tapped');
    }
    onButtonTap(): void {
        console.log("Button was pressed");
    }
    onAddTap(index: number): void {
        if (this.addButtonSelected == null) {
            this.addButtonSelected = index;
        } else {
            this.addNewShare();
            this.addButtonSelected = null;
        }
    }

    isButtonShow(index: number) {
        if (this.addButtonSelected == null) {
            return true;
        } else if (this.addButtonSelected == index) {
            return true;
        } else {
            return false;
        }
    }

    addNewShare() {

    }


    constructor(private page: Page) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        console.log(ShareType.Food);
    }
}



enum ShareType {
    Food = "https://play.nativescript.org/dist/assets/img/flags/au.png",
    Drinks = "https://play.nativescript.org/dist/assets/img/flags/bg.png",
    Stuff = "https://play.nativescript.org/dist/assets/img/flags/ch.png",
    Transport = "https://play.nativescript.org/dist/assets/img/flags/cz.png",
    Misc = "https://play.nativescript.org/dist/assets/img/flags/hu.png"
}
