import { _decorator, Camera, Component, instantiate, Node, randomRangeInt, Size, Sprite, SpriteFrame, tween, UIOpacity, UITransform, v3 } from 'cc';
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
    spTrueFalse0: SpriteFrame[] = []


    @property(SpriteFrame)
    spTrueFalse1: SpriteFrame[] = []


    @property(SpriteFrame)
    spTrueFalse2: SpriteFrame[] = []


    @property(Sprite)
    boardQuestion: Sprite = null

    @property(DataGame)
    dataQuestNormal: DataGame = null
    @property(DataGame)
    dataQuestFinal: DataGame = null


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


    @property(Node)
    roundV2: Node = null;

    @property(Node)
    bell: Node = null



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

        this.dataQuestFinal.v1 = this.shuffleNodes(this.dataQuestFinal.v1)

        this.V1.push(...this.dataQuestFinal.v1.slice(0, 5))

        console.log(this.V1)
    }


    listItem: ItemQuestion[] = []

    InitQuetionV1() {
        if (this.questionCurrentV1 == 17) {
            return
        }
        let question = this.V1[this.questionCurrentV1]
        console.log(question)
        if (question.type == 2) {
            this.boardQuestion.spriteFrame = question.bgQuestion
            this.boardQuestion.node.getComponent(UITransform).setContentSize(Gameplay.resizeImage(470, 470, question.bgQuestion))
        }


        let currentQ = 0
        let sp;

        let boardSp;
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
                if (this.questionCurrentV1 < 12) {
                    currentQ = 2
                    Time.instance.timeNumber = 10
                }
                else {
                    currentQ = 3
                    Time.instance.timeNumber = 20

                }

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
        let question = this.V1[this.questionCurrentV1 - 1]


        let spTrue;
        let spFalse;

        if (question.type == 0) {
            spTrue = this.spTrueFalse0[0]
            spFalse = this.spTrueFalse0[1]
        }
        else {
            if (question.type == 1) {
                spTrue = this.spTrueFalse1[0]
                spFalse = this.spTrueFalse1[1]
            }
            else {
                spTrue = this.spTrueFalse2[0]
                spFalse = this.spTrueFalse2[1]
            }
        }


        if (itemTarget.answer.isTrue == false) {
            itemTarget.bg.spriteFrame = spFalse
        }
        this.listItem.forEach(item => {
            if (item.answer.isTrue == true) {
                item.bg.spriteFrame = spTrue
            }
        })
        Time.instance.Stop()
        this.scheduleOnce(() => {
            this.FXNextQuestion()

        }, 2)
    }

    FXNextQuestion() {
        console.log(this.questionCurrentV1)
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
                if (this.questionCurrentV1 == 12) {
                    this.FxChungKet()
                } else {
                    this.NextQuestion()
                }

            }
        }
    }

    NextQuestion() {
        // Time.instance.timeNumber = 5
        this.InitQuetionV1()
        this.scheduleOnce(() => {
            this.isBell = false
            this.isBot = false
            if (this.stepV1 == 3) {
                Time.instance.timeNumber = 20
                this.bell.active = true

                this.scheduleOnce(this.ScheduleBot, randomRangeInt(10, 14))
            }
            this.isAnswer = false
            Time.instance.RunTime()
        })


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

    FxChungKet() {
        this.stepV1 = 3
        this.SetIndex()
        this.icon?.destroy()
        this.Quests.forEach(q => {
            q.active = false
        })

        tween(this.timeNode)
            .to(0.5, { scale: v3(0, 0, 0) })
            .call(() => {
                this.FXRoundV2()
            })
            .start()
    }

    FXRoundV2() {
        this.roundNode.scale = v3(0.5, 0.5, 0.5)
        tween(this.roundV2).to(0.5, { scale: v3(1, 1, 1) }, { easing: "backOut" })
            .start()
    }


    BtnStartRound2() {
        tween(this.roundV2).to(0.5, { scale: v3(0.5, 0.5, 0.5) }, { easing: "backIn" })
            .call(() => {
                this.roundV2.active = false
                //this.FXBoardInf()
                Time.instance.SetTheme(3)
                this.FXTimeNode()
            })
            .start()
    }

    isBell = false
    isBot = false
    BtnBell() {
        if (this.isBot == true) return
        this.isBell = true

        this.scheduleOnce(this.BotPlay, 3)

    }

    OnClickItemFinal(itemTarget: ItemQuestion) {
        if (this.isBell == false) return
        if (this.isAnswer == true) return
        this.isAnswer = true
        let question = this.V1[this.questionCurrentV1 - 1]


        let spTrue;
        let spFalse;

        if (question.type == 0) {
            spTrue = this.spTrueFalse0[0]
            spFalse = this.spTrueFalse0[1]
        }
        else {
            if (question.type == 1) {
                spTrue = this.spTrueFalse1[0]
                spFalse = this.spTrueFalse1[1]
            }
            else {
                spTrue = this.spTrueFalse2[0]
                spFalse = this.spTrueFalse2[1]
            }
        }


        if (itemTarget.answer.isTrue == false) {
            itemTarget.bg.spriteFrame = spFalse

            this.scheduleOnce(() => {
                itemTarget.bg.spriteFrame = itemTarget.spriteDefault
                // this.BotPlay()
            }, 2)
        }
        else {
            this.unschedule(this.ScheduleBot)
            itemTarget.bg.spriteFrame = spTrue
            this.bell.active = false
            Time.instance.Stop()
            this.scheduleOnce(() => {
                this.NextQuestion()
            }, 2)
        }
    }

    ScheduleBot() {
        this.BotPlay()
    }

    BotPlay() {
        this.unschedule(this.ScheduleBot)
        // Time.instance.Stop()
        // Time.instance.timeNumber
        // Time.instance.RunTime()
        this.isBell = true
        this.isBot = true
        this.isAnswer = true
        let question = this.V1[this.questionCurrentV1 - 1]


        let spTrue;
        let spFalse;

        if (question.type == 0) {
            spTrue = this.spTrueFalse0[0]
            spFalse = this.spTrueFalse0[1]
        }
        else {
            if (question.type == 1) {
                spTrue = this.spTrueFalse1[0]
                spFalse = this.spTrueFalse1[1]
            }
            else {
                spTrue = this.spTrueFalse2[0]
                spFalse = this.spTrueFalse2[1]
            }
        }
        this.scheduleOnce(() => {
            Time.instance.Stop()
            // Time.instance.timeNumber
            // Time.instance.RunTime()
            this.listItem.forEach(item => {
                if (item.answer.isTrue == true) {
                    item.bg.spriteFrame = spTrue
                    this.bell.active = false
                    this.scheduleOnce(() => {
                        this.NextQuestion()
                    }, 2)
                }
            })
        }, randomRangeInt(3, 5))
    }




}


