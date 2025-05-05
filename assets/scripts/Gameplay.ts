import { _decorator, Camera, Component, instantiate, Node, Size, Sprite, SpriteFrame, tween, UIOpacity, UITransform, v3 } from 'cc';
import { SoundManager } from './SoundManager';
import { DataGame } from './DataGame';
import { Question } from './Question';
import { Time } from './Time';
import { ItemQuestion } from './ItemQuestion';
const { ccclass, property } = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {
    @property(Camera)
    camera: Camera = null

    @property(Node)
    roundNode: Node = null

    @property(Node)
    boardInf: Node = null

    @property(Node)
    roundV1: Node = null;

    @property(Node)
    Quests: Node[] = []

    @property(Node)
    timeNode: Node = null

    @property(Node)
    listLogoRoundV1: Node[] = []

    @property(SpriteFrame)
    spTrueFalse: SpriteFrame[] = []

    @property(Sprite)
    boardQuestion: Sprite = null

    @property(DataGame)
    dataQuestNormal: DataGame = null


    @property(SpriteFrame)
    bg0Items: SpriteFrame[] = []
    @property(SpriteFrame)
    bg1Items: SpriteFrame[] = []
    @property(SpriteFrame)
    bg2Items: SpriteFrame[] = []

    @property(SpriteFrame)
    indexs: SpriteFrame[] = []

    @property(SpriteFrame)
    boards: SpriteFrame[] = []

    stepV1 = 0

    isAnswer = false

    public static instance: Gameplay

    protected start(): void {
        this.ShuffleDataQuestion()
        Gameplay.instance = this
        this.FXCamera()
    }

    FXCamera() {
        this.camera.orthoHeight = 300
        this.camera.node.setPosition(v3(0, 180, 1000))

        SoundManager.instance.playClip(0)
        this.scheduleOnce(() => {
            tween(this.camera).to(1, { orthoHeight: 500 }).start()
            tween(this.camera.node).to(1, { position: v3(0, 0, 1000) })
                .call(() => {
                    this.FXRoundNode()
                })
                .start()
        }, SoundManager.instance.GetDurationClip(0))

    }

    FXRoundNode() {
        this.roundNode.scale = v3(0.5, 0.5, 0.5)
        tween(this.roundNode).to(0.5, { scale: v3(1, 1, 1) }, { easing: "backOut" }).start()
    }

    BtnQualify() {
        tween(this.roundNode).to(0.5, { scale: v3(0.5, 0.5, 0.5) }, { easing: "backIn" })
            .call(() => {
                this.roundNode.active = false
                this.FXBoardInf()
            })
            .start()
    }

    FXBoardInf() {
        tween(this.boardInf).to(0.5, { position: v3(0, 0, 0) }, { easing: "backIn" })
            .call(() => {

            })
            .start()
    }


    public static getQueryParam(param: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    FXV1() {
        tween(this.roundV1.getComponent(UIOpacity)).to(0.5, { opacity: 255 })
            .delay(1)
            .call(() => {
                this.FXShowLogoRoundV1()
            })
            .start()
    }

    FXHideBoardInf() {
        tween(this.boardInf)
            .to(1, { position: v3(0, 1122.187, 0) }, { easing: "backIn" })
            .delay(1)
            .call(() => {
                this.FXV1()
            })
            .start()
    }
    icon = null

    FXShowLogoRoundV1() {
        this.listLogoRoundV1.forEach((element, index) => {
            if (index == this.stepV1) {
                this.icon = instantiate(element)
                this.icon.setParent(this.node)
                tween(this.icon)
                    .to(0.5, { position: v3(0, 0, 0) })
                    .delay(1)
                    .to(0.5, { position: v3(0, 400, 0) })
                    .start()
                tween(this.icon)
                    .to(0.5, { scale: v3(1.3, 1.3, 1.3) })
                    .delay(1)
                    .to(0.5, { scale: v3(0.8, 0.8, 1) })
                    .call(() => {
                        this.roundV1.active = false
                        this.timeNode.active = true
                        this.roundV1.getComponent(UIOpacity).opacity = 0
                        this.FXTimeNode()
                    })
                    .start()
            }
            element.active = false


        })
    }


    V1: Question[] = []
    questionCurrentV1 = 0
    ShuffleDataQuestion() {
        this.dataQuestNormal.v1 = this.shuffleNodes(this.dataQuestNormal.v1)
        this.V1 = this.dataQuestNormal.v1.slice(0, 12);

        console.log(this.V1)
    }


    listItem: ItemQuestion[] = []

    InitQuetionV1() {
        if (this.questionCurrentV1 >= 12) return
        let question = this.V1[this.questionCurrentV1]
        if (question.type == 2) {
            this.boardQuestion.spriteFrame = question.bgQuestion
            this.boardQuestion.node.getComponent(UITransform).setContentSize(Gameplay.resizeImage(470, 470, question.bgQuestion))
        }


        let currentQ = 0
        let sp;
        if (this.questionCurrentV1 < 5) {
            currentQ = 0
            Time.instance.timeNumber = 20

        }
        else {
            if (this.questionCurrentV1 < 9) {
                currentQ = 1
                Time.instance.timeNumber = 15
            }
            else {
                currentQ = 2
                Time.instance.timeNumber = 10
            }
        }
        if (question.type == 0) {
            sp = this.bg0Items[currentQ]
        }
        else {
            if (question.type == 1) {
                sp = this.bg1Items[currentQ]

            }
            else {
                sp = this.bg2Items[currentQ]
            }
        }


        this.Quests.forEach((e, index) => {
            if (index == question.type) {
                e.active = true
                this.listItem = e.getComponentsInChildren(ItemQuestion)

                question.answerTrue = this.shuffleNodes(question.answerTrue)
                question.answerFalse = this.shuffleNodes(question.answerFalse)
                let answers = []
                question.answerTrue[0].isTrue = true
                answers.push(question.answerTrue[0])
                answers.push(...question.answerFalse.slice(0, 2))
                answers = this.shuffleNodes(answers)
                this.listItem.forEach((item, index) => {
                    item.getComponent(ItemQuestion).SetUp(answers[index], sp)
                })
            }
            else {
                e.active = false
            }
        })


        Time.instance.SetTitle(question.title)

        this.questionCurrentV1++
    }


    FXTimeNode() {
        tween(this.timeNode)
            .to(0.5, { scale: v3(1, 1, 1) })
            .call(() => {
                this.NextQuestion()
            })
            .start()
    }

    shuffleNodes(nodeList) {
        const length = nodeList.length;
        for (let i = 0; i < length; i++) {
            // Chọn chỉ số ngẫu nhiên trong danh sách
            const randomIndex = this.getRandomInt(0, length);
            // Hoán đổi vị trí của phần tử hiện tại và phần tử ngẫu nhiên
            [nodeList[i], nodeList[randomIndex]] = [nodeList[randomIndex], nodeList[i]];
        }
        return nodeList;
    }


    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static resizeImage(maxWidth, maxHeight, spriteFrame: SpriteFrame): Size {
        let newH: number = 0;
        let newW: number = 0;
        let scale = spriteFrame.rect.width / spriteFrame.rect.height;
        console.log(spriteFrame.rect.width + ' ' + spriteFrame.rect.height);
        //let scaleH = spriteFrame.rect.height / spriteFrame.rect.width
        if (scale > 1) {
            newW = maxWidth;
            newH = maxWidth / scale;
        } else {
            newH = maxHeight;
            newW = maxHeight * scale;
        }
        return new Size(newW, newH);
    }

    OnClickItems(itemTarget: ItemQuestion) {

        if (this.isAnswer == true) return
        this.isAnswer = true

        if (itemTarget.answer.isTrue == false) {
            itemTarget.bg.spriteFrame = this.spTrueFalse[1]
        }
        this.listItem.forEach(item => {
            if (item.answer.isTrue == true) {
                item.bg.spriteFrame = this.spTrueFalse[0]
            }
        })
        Time.instance.Stop()
        this.scheduleOnce(() => {
            this.FXNextQuestion()

        }, 2)
    }

    FXNextQuestion() {
        this.scheduleOnce(() => {
            this.isAnswer = false
            Time.instance.RunTime()
        })
        if (this.questionCurrentV1 == 5) {
            this.stepV1 = 1

            this.FXShowLogoRoundV2()

        }
        else {
            if (this.questionCurrentV1 == 9) {
                this.stepV1 = 2
                this.FXShowLogoRoundV2()
            }
            else {
                this.NextQuestion()
            }
        }
    }

    NextQuestion() {
        Time.instance.timeNumber = 20
        this.InitQuetionV1()


    }


    FXShowLogoRoundV2() {
        this.Quests.forEach(n => {
            n.active = false
        })
        tween(this.timeNode)
            .to(0.5, { scale: v3(0, 0, 0) })
            .call(() => {
                Time.instance.SetTheme(this.stepV1)
                this.SetIndex()
                this.roundV1.getComponent(UIOpacity).opacity = 0
                this.listLogoRoundV1.forEach((element, index) => {
                    this.roundV1.active = true
                    element.scale = v3(1, 1, 1)
                    element.active = true
                    this.icon.destroy()
                })
                tween(this.roundV1.getComponent(UIOpacity)).to(1, { opacity: 255 })
                    .call(() => {
                        this.scheduleOnce(() => {
                            this.listLogoRoundV1.forEach((element, index) => {
                                if (index == this.stepV1) {
                                    this.icon = instantiate(element)
                                    this.icon.setParent(this.node)
                                    tween(this.icon)
                                        .to(0.5, { position: v3(0, 0, 0) })
                                        .delay(1)
                                        .to(0.5, { position: v3(0, 400, 0) })
                                        .start()
                                    tween(this.icon)
                                        .to(0.5, { scale: v3(1.3, 1.3, 1.3) })
                                        .delay(1)
                                        .to(0.5, { scale: v3(0.8, 0.8, 1) })
                                        .call(() => {
                                            this.roundV1.active = false
                                            this.timeNode.active = true
                                            this.FXTimeNode()
                                            this.roundV1.getComponent(UIOpacity).opacity = 0
                                        })
                                        .start()
                                }
                                element.active = false


                            })
                        }, 1)

                    })
                    .start()

            })
            .start()

    }

    SetIndex() {
        let list = this.node.getComponentsInChildren(ItemQuestion)
        list.forEach(e => {
            e.indexSP.spriteFrame = this.indexs[this.stepV1]
        })

        this.boardQuestion.node.parent.getComponent(Sprite).spriteFrame = this.boards[this.stepV1]
    }


}


