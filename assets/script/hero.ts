import {
  _decorator,
  Component,
  Node,
  KeyCode,
  Vec2,
  Animation,
  RigidBody2D,
} from "cc";
const { ccclass, property } = _decorator;
import { AxInput } from "./Axinput";

const Input = AxInput.instance;

@ccclass("hero")
export class hero extends Component {
  // 移动速度
  private speed = 20;
  // 角色状态
  private state = "";
  // 角色坐标
  private sp = new Vec2(0, 0);

  onLoad() {}

  update(dt: number) {
    if (
      Input.is_action_pressed(KeyCode.KEY_A) ||
      Input.is_action_pressed(KeyCode.ARROW_LEFT)
    ) {
      this.sp.x = -1;
    } else if (
      Input.is_action_pressed(KeyCode.KEY_D) ||
      Input.is_action_pressed(KeyCode.ARROW_RIGHT)
    ) {
      this.sp.x = 1;
    } else {
      this.sp.x = 0;
    }
    if (
      Input.is_action_pressed(KeyCode.KEY_W) ||
      Input.is_action_pressed(KeyCode.ARROW_UP)
    ) {
      this.sp.y = 1;
    } else if (
      Input.is_action_pressed(KeyCode.KEY_S) ||
      Input.is_action_pressed(KeyCode.ARROW_DOWN)
    ) {
      this.sp.y = -1;
    } else {
      this.sp.y = 0;
    }

    // 移动位置
    // let heroXY = this.node.getPosition();
    // if (this.sp.x) {
    //   heroXY.x += this.sp.x * this.speed * dt;
    // }
    // if (this.sp.y) {
    //   heroXY.y += this.sp.y * this.speed * dt;
    // }
    // this.node.setPosition(heroXY);
    let rb = this.getComponent(RigidBody2D);
    let lv = rb!.linearVelocity;

    if (this.sp.x || this.sp.y) {
      lv.x = this.sp.x * this.speed;
      lv.y = this.sp.y * this.speed;
    } else {
      lv.y = lv.x = 0;
    }

    rb!.linearVelocity = lv;

    // 修改状态 动画
    let state = "";
    if (this.sp.x === 1) {
      state = "hero_right";
    } else if (this.sp.x === -1) {
      state = "hero_left";
    } else if (this.sp.y === 1) {
      state = "hero_up";
    } else if (this.sp.y === -1) {
      state = "hero_down";
    }

    if (state) {
      this.setState(state);
    }
  }

  setState(state) {
    if (this.state === state) return;
    // 角色动画
    const heroAni = this.node.getComponent(Animation);
    this.state = state;
    heroAni.play(state);
  }
}
