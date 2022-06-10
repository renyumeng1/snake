class Snake {
    // 表示蛇的元素
    head: HTMLElement;
    // 蛇的身体
    bodies: HTMLCollection;
    //获取蛇的容器
    element: HTMLElement;


    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');

    }

    // 获取蛇的X坐标
    get X(): number {
        return this.head.offsetLeft;
    }

    // 获取蛇的Y坐标
    get Y(): number {
        return this.head.offsetTop;
    }

    // 设置蛇头坐标
    set X(value) {
        // 如果新值和旧值相同不做任何处理
        if (this.X === value) {
            return;
        }
        // X的合法范围
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了!')
        }
        // 修改x时修改的是水平坐标，向右走的时候不能向左掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果发生了掉头 蛇反方向继续移动
            if (value > this.X) {
                // 如果value大于旧值说明蛇在向右走 发生掉头
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }
        // 移动身体
        this.moveBody()

        this.head.style.left = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody()


    }

    set Y(value: number) {
        if (this.Y === value) {
            return
        }
        // Y的合法范围
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error('蛇撞墙了!')
        }
        // 修改x时修改的是水平坐标，向右走的时候不能向左掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了掉头 蛇反方向继续移动
            if (value > this.Y) {
                // 如果value大于旧值说明蛇在向右走 发生掉头
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = value + 'px';
        // 检查有没有撞到自己
        this.checkHeadBody()


    }

    // 蛇增加身体
    addBody(): void {
        // 向element中添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    // 蛇身体移动
    moveBody() {
        /*
                将后边的身体设置成前边身体的位置
         */
        // 遍历获取所以身体
        for (let i: number = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体位置
            let X: number = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y: number = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将这个值设置到当前身体

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';

        }
    }

    // 检查蛇头是否撞到自己
    checkHeadBody() {
        // 获取所有身体检查其是否和蛇头的坐标重叠
        for (let i: number = 1; i < this.bodies.length; i++) {
            let bd: HTMLElement = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体
                throw new Error('撞到自己了~~')

            }

        }
    }

}

export default Snake