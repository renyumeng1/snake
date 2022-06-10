// 引入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";


// 游戏控制器,控制其他所有类
class GameControl {
    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 存储蛇的移动方法（案件方向）
    direction: string = 'Right';
    // 创建一个属性用来记录游戏是否结束
    isLive:boolean = true

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,4)
        this.init()
    }


    // 游戏的初始化方法,调用后游戏开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keyDownHandler.bind(this))
        this.run()
    }

    // 创建键盘按下的响应函数
    keyDownHandler(event: KeyboardEvent) {
        // 检查event.key是否合法
        // 修改direction属性
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run(): void {
        /*

                根据this.direction改变蛇的位置
                    向上top减少
                    向下top增加
                    向左left减少
                    向右left增加
         */
        let X: number = this.snake.X;
        let Y: number = this.snake.Y;


        // 根据按键的方向修改X和Y
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动
                Y += 10
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动
                X -= 10
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动
                X += 10
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X,Y);

        // 检查X和Y
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e:any) {
            // 进入catch说明出现了异常，游戏结束
            alert(e.message + ' GAME OVER!');
            this.isLive = false;

        }


        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 定义一个方法检查蛇是否迟到了食物
    checkEat(X:number,Y:number):void{
        if(X === this.food.X && Y === this.food.Y){
            // 食物位置重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
    }


}

export default GameControl