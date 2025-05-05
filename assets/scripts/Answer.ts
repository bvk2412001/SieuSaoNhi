import { _decorator, CCString, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Answer')
export class Answer {
    @property(CCString)
    title: String = ""
    @property(SpriteFrame)
    bg: SpriteFrame = null


    isTrue = false
}


