import { _decorator, Component, EditBox, Label, Node, Sprite, SpriteFrame } from 'cc';
import { Gameplay } from './Gameplay';
const { ccclass, property } = _decorator;

@ccclass('BoardInf')
export class BoardInf extends Component {
    @property(EditBox)
    nameUser: EditBox = null

    @property(Node)
    bgNameTrue: Node = null

    @property(Node)
    bgNameFalse: Node = null

    @property(Sprite)
    avatar: Sprite = null

    @property(SpriteFrame)
    sex: SpriteFrame[] = []



    protected start(): void {
        let name = Gameplay.getQueryParam("name")
        this.nameUser.string = name
        Gameplay.instance.nameUser.string = name

        let sex = Gameplay.getQueryParam("sex")
        if (sex == "0") {
            this.avatar.spriteFrame = this.sex[0]
        }
        else {
            this.avatar.spriteFrame = this.sex[1]
        }
    }

    containsSpecialCharacters(name: string): boolean {
        // Chỉ cho phép chữ cái, số và khoảng trắng. Mọi ký tự khác đều là "đặc biệt"
        const regex = /^[a-zA-Z0-9 ]*$/;
        return !regex.test(name);
    }


    editText() {
        if (this.containsSpecialCharacters(this.nameUser.string)) {
            this.bgNameFalse.active = true
            this.bgNameTrue.active = false
        }
        else {
            this.bgNameFalse.active = false
            this.bgNameTrue.active = true
            Gameplay.instance.nameUser.string = this.nameUser.string
        }
    }


    BtnStart() {
        Gameplay.instance.FXHideBoardInf()
    }
}


