import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
    source: AudioSource = null

    @property(AudioClip)
    clips: AudioClip[] = []

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

}


