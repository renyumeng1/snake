// 定义食物类
class Food {
    // 定义一个属性表示食物对应的元素
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素并且赋值给element
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物x轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物位置的方法
    change() {
        // 生成一个随机位置
        // 食物位置0-290
        // 蛇移动一次时1格，一格的大小时10，食物的坐标必须是整10
        let left: number = Math.round(Math.random() * 29) * 10;
        let top: number = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }

}

export default Food;


// food测试
// const food: Food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);