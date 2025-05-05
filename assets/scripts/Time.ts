import { _decorator, Color, Component, Label, Node, Sprite, SpriteFrame, Tween, tween } from 'cc';
import { Gameplay } from './Gameplay';
const { ccclass, property } = _decorator;

@ccclass('Time')
export class Time extends Component {
    public static instance: Time

    @property(Label)
    title: Label = null

    @property(Sprite)
    timeProcess: Sprite = null

    @property(Sprite)
    frame: Sprite = null

    @property(Sprite)
    bg: Sprite = null

    @property(Sprite)
    soundIcon: Sprite = null


    @property(SpriteFrame)
    frames: SpriteFrame[] = []

    @property(SpriteFrame)
    bgs: SpriteFrame[] = []

    @property(SpriteFrame)
    soundIcons: SpriteFrame[] = []

    @property(Color)
    colors: Color[] = []

    timeNumber: number = 0;

    protected start(): void {
        Time.instance = this
    }

    RunTime() {
        this.unschedule(this.CountdownTime)
        this.schedule(this.CountdownTime, 1)
        this.FXTimeProcess()
    }

    Stop() {
        Tween.stopAllByTarget(this.timeProcess)
        this.timeProcess.fillRange = 0
    }

    FXTimeProcess() {
        console.log("FXTimeProcess")
        tween(this.timeProcess)
            .to(this.timeNumber, { fillRange: 1 }, {
                onUpdate: (target: Sprite, ratio: number) => {
                    if (target.fillRange < 0.3) {
                        target.color = new Color(208, 228, 44, 255)
                    }
                    else {
                        if (target.fillRange < 0.6) {
                            target.color = new Color(137, 217, 246, 255)
                        }
                        else {
                            target.color = new Color(254, 168, 168, 255)
                        }
                    }
                }
            })

            .call(() => {
                Gameplay.instance.FXNextQuestion()
                this.Stop()
            })
            .start();
    }


    CountdownTime() {
        this.timeNumber--

    }

    SetTitle(lb) {
        this.title.string = lb
    }

    SetTheme(type) {
        this.frame.spriteFrame = this.bgs[type]
        this.soundIcon.spriteFrame = this.soundIcons[type]
        this.bg.spriteFrame = this.frames[type]
        this.title.color = this.colors[type]
    }



}


