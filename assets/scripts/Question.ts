import { _decorator, AudioClip, CCInteger, CCString, Component, Node, SpriteFrame } from 'cc';
import { Answer } from './Answer';
const { ccclass, property } = _decorator;

@ccclass('Question')
export class Question {
    @property(CCString)
    title: String = ""
    @property(SpriteFrame)
    bgQuestion: SpriteFrame = null

    @property(CCInteger)
    type: number = 0
    
    @property(Answer)
    answerTrue: Answer[] = []

    @property(Answer)
    answerFalse: Answer[] = []

    @property(AudioClip)
    clip: AudioClip = null
}


