/**
 * 讲解:
 * 1、材質暫存(Texture Cache)
 * 2、导入方法:
 *      a. PIXI.texture.from 引入图片
 *      b. 使用PIXI.utils.TextureCache,具体参考本文
 * 3、再通过PIXI.Sprite()方法将图片绘制到画布上。
 * 4、游戏循环: app.ticker.add(()=>{}),每帧执行一次、
 * 5、ticker:
 *      a. add()每帧执行一次
 *      b. addOnce()只执行一次
 *      c. destory()销毁add()动画方法，且不可再恢复，不推荐使用。
 *      d. remove()移除动画
 *      e. start() 启动动画,搭配监听器使用
 *      d. stop() 停止动画,搭配监听器使用
 *      f. update() 更新动画
 * 功能:
 * 1、移动精灵
 * 2、旋转精灵
 * 3、游戏循环
 * 
 * 注意
 */

import * as PIXI from 'pixi.js';
import { Init } from './comm';

export default function PIXIJS_ROTATE(ele) {
    this.app = null;
    this.container = null;
    this.ele = ele;

    this.init = (obj = {})=> {
        console.log("------rotate------")
        const app = Init(obj,ele);
        this.app = app;
        this.addImage();
    }

    // 添加图片
    this.addImage = () => {
        let that = this;
        // 第一种写法
        // const loader1 = PIXI.Loader.shared;
        
        // 第二种写法
        const loader2 = new PIXI.Loader();

        const app = this.app;
        // PIXI.Loader.shared
        loader2.add("catPic", require("./images/cat.png"))
        .load(setup);
        // 另一种loader方法
        // PIXI.Loader.shared
        // .add("catPic", require("./images/cat.png"))
        // .load(setup);

        //This `setup` function will run when the image has loaded
        function setup(loader, resources) {
            const container = new PIXI.Container();
            // const ticker = PIXI.Ticker.shared;
            app.stage.addChild(container);
            // Create a 5x5 grid of bunnies
            // 生成多次图片
            // for (let i = 0; i < 25; i++) {
                const texture = resources.catPic.texture;
                const bunny = new PIXI.Sprite(texture);
            //     // anchor设置锚点
            //     bunny.anchor.set(0.5);
            //     bunny.x = (i % 5) * (bunny.width + 10);
            //     bunny.y = Math.floor(i / 5) * (bunny.height + 10);
                container.addChild(bunny);
            // }
            that.container = container;
    
            // Move container to the center
            // 控制元素的位置
            container.x += app.screen.width / 2;
            container.y = app.screen.height / 2;
    
            // Center bunny sprite in local container coordinates
            // 控制元素中心的位置
            container.pivot.x = (container.width+10) / 2;
            container.pivot.y = (container.height+10) / 2;
            
            // Listen for animate update
            // ticker
            app.ticker.autoStart = false;
            app.ticker.add((delta) => {
                // rotate the container!
                // use delta to create frame-independent transform
                // 旋转
                container.rotation -= 0.01 * delta;
    
                // 移动
                // container.x += 1;
                // container.y += 1;
            });
            app.ticker.stop();
            setTimeout(() => {
                // 定时开始
                app.ticker.start();
            }, 1000)
        }
    }

    this.moveAnima = (X,Y) => {
        const app = this.app;
        const container = this.container;

        // 元素移动的速度属性
        container.vx = app.screen.width / 2;
        container.vy = app.screen.height / 2;
    }

}