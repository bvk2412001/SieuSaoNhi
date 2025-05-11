import { _decorator, AudioClip, CCString, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Answer')
export class Answer {
    @property(CCString)
    title: String = ""
    @property(SpriteFrame)
    bg: SpriteFrame = null

    @property(AudioClip)
    clip: AudioClip = null
    isTrue = false
}


