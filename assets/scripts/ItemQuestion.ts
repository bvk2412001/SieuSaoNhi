import { _decorator, Component, Input, Label, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { Answer } from './Answer';
import { Gameplay } from './Gameplay';
const { ccclass, property } = _decorator;

@ccclass('ItemQuestion')
export class ItemQuestion extends Component {
    @property(Sprite)
    image: Sprite = null

    @property(Sprite)
    indexSP: Sprite = null;

    @property(Sprite)
    bg: Sprite = null


    @property(Label)
    title: Label = null;

    protected start(): void {
        this.node.on(Input.EventType.TOUCH_START, this.OnClick, this)
    }



    answer: Answer
    SetUp(answer: Answer, spriteFrameDefault: SpriteFrame) {
        this.answer = answer
        this.bg.spriteFrame = spriteFrameDefault

        if (answer.title && this.title) {
            this.title.string = answer.title.toString()
        }

        if (answer.bg && this.image) {
            this.image.spriteFrame = answer.bg
            this.image.node.getComponent(UITransform).setContentSize(Gameplay.resizeImage(250, 250, answer.bg))
        }
    }

    OnClick() {
        Gameplay.instance.OnClickItems(this)
    }
}


