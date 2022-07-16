import {
  _decorator,
  Component,
  Node,
  PhysicsSystem2D,
  EPhysics2DDrawFlags,
  v2,
  TiledLayer,
  TiledMap,
  RigidBody2D,
  BoxCollider2D,
  TiledTile,
  ERigidBody2DType,
} from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = game
 * DateTime = Sun Jul 17 2022 00:38:30 GMT+0800 (中国标准时间)
 * Author = pumpkinPie
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/script/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass("game")
export class game extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @property({ type: TiledMap })
  public tiledMap: TiledMap | null = null;

  start() {
    // [3]
    let tiledSize = this.tiledMap.getTileSize();
    let layer = this.tiledMap.getLayer("wall");
    let layerSize = layer.getLayerSize();

    for (let i = 0; i < layerSize.width; i++) {
      for (let j = 0; j < layerSize.height; j++) {
        let tiledTile = layer.getTiledTileAt(i, j, true);

        if (tiledTile.grid !== 0) {
          // 设置静态刚体 设置分组
          let body = tiledTile.node.addComponent(RigidBody2D);
          body.type = ERigidBody2DType.Static;
          body.group = 2;

          // 设置物理碰撞
          let collider = tiledTile.node.addComponent(BoxCollider2D);
          collider.group = 2;
          collider.offset = v2(tiledSize.width / 2, tiledSize.height / 2);
          collider.size = tiledSize;
          collider.apply();
        }
      }
    }
  }

  onLoad() {
    PhysicsSystem2D.instance.enable = true;
    PhysicsSystem2D.instance.debugDrawFlags =
      //   EPhysics2DDrawFlags.Aabb |
      //   EPhysics2DDrawFlags.Pair |
      //   EPhysics2DDrawFlags.CenterOfMass |
      //   EPhysics2DDrawFlags.Joint |
      EPhysics2DDrawFlags.Shape;
    PhysicsSystem2D.instance.gravity = v2(0, 0);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
