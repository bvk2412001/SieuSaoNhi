import { _decorator, Component, Node } from 'cc';
import { Question } from './Question';
const { ccclass, property } = _decorator;

@ccclass('DataGame')
export class DataGame extends Component {
    @property(Question)
    v1: Question[] = []
}


