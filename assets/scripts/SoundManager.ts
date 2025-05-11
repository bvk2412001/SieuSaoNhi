import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
    source: AudioSource = null

    @property(AudioClip)
    clips: AudioClip[] = []

    @property(AudioClip)
    trueSound: AudioClip = null

    @property(AudioClip)
    falseSound: AudioClip = null

    @property(AudioClip)
    timeSound: AudioClip = null

    @property(AudioSource)
    sourceTime: AudioSource = null


    public static instance: SoundManager = null
    protected onLoad(): void {
        SoundManager.instance = this
    }


    playClip(index: number) {
        this.source.stop()
        this.source.clip = this.clips[index]
        this.source.play()
    }

    GetDurationClip(index: number) {
        return this.clips[index].getDuration()
    }

    playTrue() {
        this.source.playOneShot(this.trueSound)
    }

    playFail() {
        this.source.playOneShot(this.falseSound)
    }

    playTime() {
        this.sourceTime.clip = this.timeSound
        this.sourceTime.play()
    }

}


