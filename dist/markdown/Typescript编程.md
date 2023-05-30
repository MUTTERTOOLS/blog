# 第一章：导言
我们不希望程序做如下事情, 所以我们需要类型检查
```typescript
let res = {} + '' + 1;

function fn(num) {
  return num / 2;
}
fn({});
```
# 第二章：概述
## 2.1 编译器
**类型检查器：**检查代码是否符合安全要求的特殊程序。
**编译和运行TS程序：**(AST就是抽象语法树)

1. TS源码 => TS AST
2. 类型检查器检查AST
3. TS AST => JS 源码
4. JS源码 => JS AST
5. JS AST => 字节码
6. 运行时计算字节码
> 第1~3步由TSC 操作，第4~6步由浏览器、NodeJS或其他JavaScript引擎中的JavaScript运行时操作。

## 2.2 类型系统
**类型系统：**类型检查器为程序分配类型时使用的一系列规则。
> 一般来说，类型系统有两种:一种通过显式句法告诉编译器所有值的类型，另一种自动推导值的类型。这两种类型系统各有利弊。

> TypeScript身兼两种类型系统，可以显式注解类型，也可以让 TypeScript推导多数类型。

```typescript
// 显示注解
let num: number;	// number

// 自动推导
let str = "123";	// string
```

## 2.3 代码编辑器设置
略


# 第三章： 类型全解

（箭头指向的是子类型）

## 3.1 类型术语
略

## 3.2 类型浅谈
### 3.2.1 any

- `any`是除了`unknown`类型外所有类型的父类
- 尽量不使用any，因为这样会让类型系统没有意义
- 你可以设置`noImplicityAny`来禁止出现隐式的`any`
- `any`类型的变量可以进行任何操作而不会报错**(危险)**
```typescript
let a: any;	// any

let b = a.age;	// any

let c = a();	// any
```

### 3.2.2 unknown
unknown类型是any的父类，它们似乎是一样的，然而TS对于unknown类型的变量，是禁止执行任何操作的**（安全）**。
```typescript
let a: unknown;	// unknown

let b = a.age;	// error: 'a' is of type 'unknown'.(18046)

let c = a();	// error: 'a' is of type 'unknown'.(18046)
```

我们可以通过**类型收窄**来实现对unknown类型的操作。

### 3.2.3 boolean
只允许为：`true``false`
```typescript
// 可以为下列值
let a = true;
let b = false;
let c = 1 > 2;
```

### 3.2.4 number
```typescript
// 可以为下列值
let a = 123;
let b = NaN;
let c = Infinity;
let d = 1.23;
```

### 3.2.5 bigint
详情见es6
```typescript
let a = 1234n;  // bigint
let b: bigint = 100n; // bigint
let c = a + b;  // bigint

let e = 88.5n;  // Error: A bigint literal must be an integer.(1353)
let f: bigint = 100; // Error: Type 'number' is not assignable to type 'bigint'.(2322)
```

### 3.2.6 string
```typescript
let a = 'hello';	// string
let b = 'a' + 'b' + 'c';	// string
```

### 3.2.7 symbol
```typescript
let d  = Symbol('d')  // symbol
const e  = Symbol('e'); // typeof e
const f: unique symbol = Symbol('f'); // typeof f
let g: unique symbol = Symbol('f');
// Error: A variable whose type is a 'unique symbol' type must be 'const'.(1332)

let h = e === e;  // boolean
let i = e === f;
// Error: This comparison appears to be unintentional because the types 'typeof e' and 'typeof f' have no overlap.(2367)
```

1. 使用let或var声明，变量将被推导为symbol类型
2. 使用const声明，变量将被推导为type variableName, 而不是`unique symbol`类型
3. 可以显式注解const变量的类型为`unique symbol`
4. `unique symbol`类型的值始终和自身相等
5. TypeScript在编译时知道一个`unique symbol`类型的值绝不会与另一个unique symbol类型的值相等。

上述规则只需了解即可。
### 3.2.8 对象
**结构化类型：**一种编程设计风格，只关心对象有哪些属性，而不管属性使用什么名称（名义化类型）。在某些语言中也叫鸭子类型(即不以貌取人)。

TS中的对象都是结构化的。
```typescript
let a: object = {
  b: 'x'
}
a.b;  // Property 'b' does not exist on type 'object'.(2339)
```
你可能会觉得奇怪，a明明是对象类型，却无法获取它的属性。
实际上TS对于对象这类结构化的类型，必须精确到具体的属性，如上述`object`类型，TS只知道它是个对象，却无法知道它有什么属性，所以不能进行操作。

解决措施：
```typescript
// 方法一：自动推导
let a = {
  b: 'x'
} // { b: string }
a.b; // string

// 方法二：声明接口A
interface A {
  b: string
}
let a: A = {
  b: 'x'
} // A
a.b; // string

// 方法三：声明类型A
type A = {
  b: string
}
let a: A = {
  b: 'x'
} // A
a.b; // string

// 方法四：直接声明
let a: {
  b: string
} = {
  b: 'x'
} // { b: string }
a.b; // string
```

`**object**`**类型就是所有结构对象类型的父类，请记住这一点**
### 字面量类型
如果你比较细心，你会发现上面的示例大部分都是采用了let进行变量的声明。因为在TS中，使用const进行声明会产生截然不同的效果。

```typescript
const a = 123;	// 123
const b = 'hello';	// 'hello'
const c = true; // true
const d = Symbol(); // typeof d
const e = 123456n;  // 123456n
```

注意，使用const声明的这些变量，都是属于字面量类型（这只是统称，并不代表真的存在字面量这一类型）。
譬如变量a的类型为`123`，这是`number`类型的子类型；又譬如变量c的类型为`true`，这是`boolean`类型的子类型。
显然，字面量类型是某一类型的具体值构成的。

等等，上述示例似乎又少了什么。没错，就是`object`！
按照上述规律，我们可能会认为使用const声明的object类型的变量，应该会是这样：
```typescript
const a = {
  name: 'zhangsan',
  age: 12,
  isMale: true
}
/**  
 自动推导为
 a: {
    name: 'zhangsan',
    age: 12,
    isMale: true
  }   
*/
```


**然而实际上，上述的分析是错误的，对于对象来说，使用let和const声明，推导后的类型并没有区别！**
正确的推导应该是：
```typescript
const a = {
  name: 'zhangsan',
  age: 12,
  isMale: true
}
/**  

 const a: {
    name: string;
    age: number;
    isMale: boolean;
  }

*/
```

### 明确赋值
有如下代码，请判断它是否报错。
```typescript
let a: number
a = 123;
```

答案是不报错，可能会有小伙伴疑惑，显示声明了变量a的类型为`nubmer`，但却没有在声明时进行初始化，那么a的值不就是`undefined`，不符合它的类型了。
这是因为TS会在变量使用前，确保它已经被赋值。
```typescript
let i:number
let j = i * 3;  // Error: Variable 'i' is used before being assigned.(2454)
```

然而这存在一个致命的问题，就是TS无法检测到函数中，对变量的初始化。
```typescript
let i:number;
function fn() {
    i = 123;
}
fn();
let j = i * 2;  // Error: Variable 'i' is used before being assigned.(2454)
```

### 索引签名
有时我们无法确定对象还会有哪些属性
```typescript
let airplaneSeatingAssignments: {
    [seatNumber: string]: string
} = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates ',
    abcde: '注意键名形式'
}
```

- `[seatNumber: string]: string`是索引签名，`seatNumber`是泛指的键名，也可以不写，键名的类型是`string`，值得类型也是`string`。
- 索引签名还有一条规则要记住: 键的类型(T)必须可赋值给`number`或`string`
- 使用索引签名可以为该类型的结构对象新增任意`string`类型的键名和值。

### 可选属性
有时我们无法确定某一属性是否存在
```typescript
let a: {
    name: string,
    age?: number	// age 属性是可选的
}
a = { name: 'zhangsan', age: 20 };
a = { name: 'lisi' }
```
此处的age属性的类型等价于`number | undefined`

### 3.2.9 中场休息：类型别名
#### 类型别名
我们可以使用`type`进行类型的声明或为其它类型取别名。

它的使用和JS中的`var``const``let`类似。
```typescript
// 声明结构对象类型Student
type Student = {
    name: string,
    age: number,
    school: string
}
let stu: Student = {
    name: 'zhangsan',
    age: 20,
    school: '门头沟小学'
}

// 为string取别名
type Name = string;
let myName: Name;
myName = 'zhangsan';
```

#### 交集（交叉类型）
:::info
本书此处写的不太好，所以此小节将以个人理解来进行描述。
:::


**并集和交集分别对应了其它文章中的联合类型和交叉类型，在后续也会使用这两个名称进行叙述。- **

**交叉类型：**由多个类型交叉组成，形如`type CatAndDog = Cat & Dog;`

在讲联合类型之前，我们需要先了解交叉类型。
**规则1：对于基本类型和字面量类型之间的交叉类型，都为它们的相交部分。**
```typescript
type a = number & string;	// never
type b = boolean & string;	// never
type c = object & symbol;	// never
type d = bigint & number;	// never

type e = 123 & number;  // 123
type f = 'hello' & string;  // 'hello'
type g = true & boolean;    // true

type h = 123 & string;  // never
type i = 'hello' & number;  // never
type j = 123 & 456;	// never
type k = 'hello' & 'world';	// never
```

**规则2： 不存在属性类型冲突的结构对象类型，它们之间的交叉类型，都为它们的合并。**
```typescript
type Cat = {
    name: string,
    purrs: boolean
}
type Dog = {
    name: string,
    barks: boolean,
    wags: boolean
}

type CatAndDog = Cat & Dog;
let a: CatAndDog = {
    name: 'CatAndDog',
    purrs: true,
    barks: true,
  	wags: true
}
/*
CatAndDog类型等价于结构对象类型
{
	name: string,
  purrs: boolean,
  barks: boolean,
  wags: boolean
}
*/
```

**规则3：存在属性类型冲突的结构对象类型，它们之间的交叉类型，都为**`**never**`**。**
```typescript
type Cat = {
    name: 'Cat',
    purrs: boolean
}
type Dog = {
    name: 'Dog',
    barks: boolean
}
type CatAndDog = Cat & Dog;	// never

// Cat类型和Dog类型之间的name属性的类型冲突了，所以永远无法合并
```

**规则4：结构对象类型和基本类型之间的交叉类型，都为表达式自身。**
```typescript
type Cat = {
    name: string,
    purrs: boolean
}
type StringAndCat = string & Cat;   // string & Cat

let a: StringAndCat = 'cat or stirng ?';
// Error: Type 'string' is not assignable to type 'StringAndCat'. 
// Type 'string' is not assignable to type 'Cat'.(2322)

let b: StringAndCat = {
    name: 'StringAndCat',
    purrs: true
}
// Error: Type '{ name: string; purrs: true; }' is not assignable to type 'StringAndCat'.
// Type '{ name: string; purrs: true; }' is not assignable to type 'string'.(2322)
```
是的，你没有看错，它的类型并不是`never`，而是我们所写的表达式！
我们无法为这个类型的变量赋任何值。
如果想了解它存在的作用，请跳转至类型烙印。

**重点：交叉类型是组成它的类型的子类型**
讲重点之前，我们得提前学习一下类型的条件判断`extends`，具体使用方法和三元表达式一样。
```typescript
type a = 123 extends number ? true : false;	// true
```
显然字面量类型`123`是`number`类型的子类型，所以类型`a`恒等价于字面量类型`true`。

:::info
如何判断子类型：包含范围越小的类型，越有可能是子类型。
譬如字面量类型123，它只包含了123这个字面量，远远不如number，所以123是number的子类型。
又譬如学生类型，可以细分为小学生，中学生，大学生，显然这三者是学生类型的子类型。（一般父类型身上的属性少或属性的类型更加宽泛）
:::

现在我们回归重点。
对于规则1-3，其实没什么好说的，很容易理解，`never`是所有类型的子类型。

主要是规则4。
`StringAndCat`的类型是`string`和`Cat`的交叉类型，但却不为`never`，这一交叉类型仍然是`string`和`cat`类型的子类型。
```typescript
type Cat = {
    name: string,
    purrs: boolean
}
type StringAndCat = string & Cat;   

type a = StringAndCat extends string ? true : false;    // true

type b = StringAndCat extends StringAndCat ? true : false;  // true

type c = StringAndCat extends number ? true : false;    // false
```
后面我们会利用到这一特性。

#### 并集（联合类型）
:::info
本书此处写的不太好，所以此小节将以个人理解来进行描述。
:::

**联合类型：**由多个类型联合，形如`type ID = string | number;``type CatOrDogOrBoth = Cat | Dog;`

从`|`这一符号可以看出，联合类型是一种或的关系，也就是说它既可以是`A`类型，也可以是`B`类型，不过在TS中它还可以是`A & B`类型。
```typescript
type Cat = {
    name: string,
    purrs: boolean
}
type Dog = {
    name: string,
    barks: boolean
}

type CatOrDogOrBoth = Cat | Dog;
// 上述类型等价于 Cat | Dog | (Cat & Dog)

let a: CatOrDogOrBoth = {
    name: 'CatOrDogOrBoth'
}
// Error: Type '{ name: string; }' is not assignable to type 'CatOrDogOrBoth'.
//  Property 'barks' is missing in type '{ name: string; }' but required in type 'Dog'.(2322)

let b: CatOrDogOrBoth = {
    name: 'CatOrDogOrBoth',
    purrs: true
}   // CatOrDogOrBoth

let c: CatOrDogOrBoth = {
    name: 'CatOrDogOrBoth',
    barks: true
}   // CatOrDogOrBoth

let d: CatOrDogOrBoth = {
    name: 'CatOrDogOrBoth',
    purrs: true,
    barks: true
}   // CatOrDogOrBoth
```

上述案例说明了联合类型其实是**三种类型**的或运算。
由于`never`类型是所有类型的子类型，它出现在`|`表达式中无意义，所以当第三种类型为never时，我们可以直接无视它。（也许这才是比较符合直觉的。）
```typescript
type Combination = string | number;
// string | number | (string | number) 可以被直接认为 string | number
```

### 3.2.10 数组
> TypeScript支持两种注解数组类型的句法:T[]和Array<T>。二者的作用和性能无异。本书采用T[]句法，因为写法更简洁。你在编写代码时，可以选择任何一种自己喜欢的方式。


```typescript
// 显式声明
let a:number[] = [1, 2, 3];

let b:Array<number> = [4, 5, 6];

let c: (string | boolean)[] = ['123', true, false, '456'];

// 自动推导
let e = [123, 456]; // number[]

let f = [123, 'hello', 'world'];	// (number | string)[]

let g = []; // any[]

// 特殊：数组离开函数作用域后类型会被收窄
function fn() {
    let a = []; // any[]
    a.push(1);  // any[]
    a.push(2);  // any[]
    return a;   // number[]
}
```

在TS中，我们希望使用数组时，尽可能让内部元素的类型是统一的。

### 3.2.11 元组
有时候我们不得不取使用内部元素类型不一致的数组，这时候我们就可以使用元组。
元组是array的子类型，是定义数组的一种特殊方式，长度固定，各索引位上的值具有固定的已知类型。与其他多数类型不同，**声明元组时必须显式注解类型**。这是因为，创建元组使用的句法与数组相同(都使用方括号)，而TypeScript遇到方括号，推导出来的是数组的类型。
```typescript
let a: [number, string] = [123, 'hello'];   // [number, string]

let b: [number, string] = ['hello', 123];
// Error: Type 'string' is not assignable to type 'number'.(2322)
// Error: Type 'number' is not assignable to type 'string'.(2322)


let c: [number, string] = [123];;
// Error: Type '[number]' is not assignable to type '[number, string]'.
// Error: Source has 1 element(s) but target requires 2.(2322)

let d: [number, string] = [123, 'hello', 456, 'world'];
// Type '[number, string, number, string]' is not assignable to type '[number, string]'.
// Source has 4 element(s) but target allows only 2.(2322)
```

如果你还是不清除元组的意义，你可以把它看作是一组数据，每一个类型的元素位置固定，我们能够通过它的位置来推断出它的意义。
```typescript
type Name = string;
type Age = number;
type Message = [Name, Age];

let a: Message = ['zhangsan', 20];
let b: Message = ['lisi', 30];

let arr = [a, b];   // Message[]

function fn([name, age]: Message) {
    console.log(name, age);
}
fn(a);  // 'zhangsan' 20
fn(b);  // 'lisi' 30
```

### 3.2.12 null、undefined、void 和 never
`undefined`类型只有undefined
`null`类型只有null
> JavaScript程序员往往不区分二者，但是它们在语义上有细微的差别:undefined 的意思是尚未定义，而null表示缺少值（例如在计算一个值的过程中遇到了错误)。

`void`类型表示函数没有显式的返回一个值。

```typescript
function fn() {
    console.log('no return')
}
// fn: () => void
```

`never`类型是所有类型的子类型，一般用来代表运行错误或者结果不可达。
### 3.2.13 枚举
> 枚举的作用是列举类型中包含的各个值。这是一种无序数据结构，把键映射到值上。枚举可以理解为编译时键固定的对象，访问键时，TypeScript将检查指定的键是否存在。


枚举的本质
```typescript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;	// 0

// 转换成JS
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
let dir = Direction.NORTH;

// 此时的Direction为
/*
{
  "0": "NORTH",
  "1": "SOUTH",
  "2": "EAST",
  "3": "WEST",
  "NORTH": 0,
  "SOUTH": 1,
  "EAST": 2,
  "WEST": 3
} 
*/
```

> 按约定,枚举名称为大写的单数形式。枚举中的键也为大写。


**枚举类型不会在生成JS后被清除，而是保留所使用的对象，所以它是横跨JS和TS的，也就是说它既可以当作类型使用，也可以当作值来使用。**

枚举类型属性的值，是根据上一个属性的值+1后得到的，当然你也可以自己手动初始化。
```typescript
enum Language {
    English,	// 0
    Spanish = 233,	// 233
    Russian	// 234
}

```

我们也可以使用字符串字面量来进行初始化，但使用字符串进行初始化后，就无法再利用自动推导了。
```typescript
enum Language {
    English,                // 0
    Spanish = 'Spanish',    // 'Spanish'
    Russian = 'Russian',    // 'Russian'
    Chinese,                // Error: Enum member must have initializer.(1061)
    Japanese = 233,         // 233
    Italian                 // 234
}
```

请不要使用类似`Language[0]`这样的形式去使用枚举类型。
使用`const enum`进行声明，TS将会禁止你这样的操作。
```typescript
const enum Language {
    English,
    Spanish,
    Russian
}
Language[0]	// A const enum member can only be accessed using a string literal.(2476)
```

注意，`const enum` 默认是会在JS中清除的，而是会在用到枚举成员的地方内插对应的值。
```typescript
const enum Language {
    English,
    Spanish,
    Russian
}
Language.English

// 转换为JS
0 /* Language.English */;
```

使用枚举类型或许是不安全的，即使我们传入数字类型的参数也不会产生类型报错。
```typescript
enum Language {
    English,
    Spanish,
    Russian
}

function fn(lang: Language) {
  	console.log(lang);
}
fn(0);	// no error
fn(Language.English);	// no error
```


# 第四章：函数
## 4.1 声明和调用函数
函数的**参数必须显式声明**，而返回值可以自动推导
```typescript
// 显式声明
function add(a: number, b: number): number {
    return a+b;
}   
// function add(a: number, b: number): number

let add:(a: number, b: number) => number
  = function(a: number, b: number) {
  return a+b;
}
// let add: (a: number, b: number) => number




// 自动推导
function add(a: number, b: number) {
    return a+b;
}
// function add(a: number, b: number): number

let add = function(a: number, b: number) {
  return a+b;
}
// let add: (a: number, b: number) => number
```

五种声明函数的方式：
```typescript
// 具名函数
function greet(name: string) {
    return 'hello' + name;
}
// function greet(name: string): string

// 函数表达式
let greet2 = function(name: string) {
    return 'hello' + name;
}
// let greet2: (name: string) => string

// 箭头函数表达式
let greet3 = (name: string) => {
    return 'hello' + name;
}
// let greet3: (name: string) => string

// 箭头函数表达式简写
let greet4 = (name: string) =>  'hello' + name;
// let greet4: (name: string) => string

// 函数构造方法
let greet5 = new Function('name', 'return "hello" + name');
// let greet5: Function

// greet和greet2的类型实际上是相等的(extends能够判断是否为自身或其子类型)
type a = typeof greet extends typeof greet2 ? true : false; // true
type b = typeof greet2 extends typeof greet ? true : false; // true
```

第五种方式尽量不要使用，因为它的类型是`Function`，我们无法通过编辑器的提示来判断形参和返回值的类型。

### 4.1.1 可选和默认的参数
可以使用`?`来标记参数是可选的，**注意可选参数必须放在参数列表的最后面**。
```typescript
function fn(arg?: string) {
    console.log(arg)
}   // function fn(arg?: string): void
fn();				// no error
fn('arg');	// no error
```
形参arg的类型是`string | undefined`

可以为参数设置默认值, 当参数的值为`undefined`时，会使用默认值，所以拥有默认值的参数不需要放到参数列表的最后面。
```typescript
// 参数默认值
function createUserId(
  name: string = "Semlinker",
  id: number,
  age?: number
): string {
  return name + id;
}

createUserId( undefined, 233);	// Semlinker233
```


### 4.1.2 剩余参数
尽量不要使用函数作用域中内置的arguments对象，因为TS无法从中推断类型。
我们应该使用es6中的剩余函数，来进行显式的类型声明。
```typescript
function fn(...args:string[]){
  let a = arguments[0]; // any
  
  let b = args[0];      // string
}
```

### 4.1.3 call、apply 和 bind
介绍函数使用，略

### 4.1.4 注解 this 类型
在JS中，this的指向一直是一个令人头疼的问题，而在TS中，我们可以显式的注解this。

- 为this声明类型必须放在参数列表最前面，但不需要为其进行传参。若不显式注解，this的类型默认为any。
- TS会对this进行类型检查，所以注解this后无法直接调用（因为严格模式下，直接调用函数，它的this是undefined，类型可能会不匹配）
- 需要通过call 、apply 和 bind 函数来进行使用。
- 不需要为类或对象的this进行显式注解，它们的this类型默认为自身。

```typescript
function fn1() {
  this; // any
}

function fn2(a: number, this: string) {   // Error: A 'this' parameter must be the first parameter.(2680)
  this;
}

function fn3(this: string, a: number) {
  this; // string
}

fn3(123); // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'string'.(2684)
fn3.call('bindString', 123);  // no error
fn3.apply('bindString', [123]); // no error
let fn4 = fn3.bind('bindString');  // no error
fn4(123);	// no error

let obj = {
  foo() {
    this; // this: { foo(): void; }
  }
}

class Dog {
  constructor() {
    this; // this
  }
  foo() {
    this; // this
  }
}
```

### 4.1.5 生成器函数
基本使用请右转ES6。
书上讲的不是很详细，可能是因为用的比较少，而且该部分在高版本中有所改动，所以下面只会简单介绍。

生成器函数的参数类型声明和普通函数相同，而函数结果声明略有不同，因为生成器函数默认会返回一个Generator类型的迭代器对象。
```typescript
function* createNumIterator() {
  let n = 0;
  while(true) {
    yield n++;
  }
} // function createNumbers(): Generator<number, void, unknown>
let numIterator =  createNumIterator(); // Generator<number, void, unknown>

let n0 = numIterator.next();  // IteratorResult<number, void>
let n1 = numIterator.next();  // IteratorResult<number, void>

let {value: v1, done: d1} = n0; // 解构赋值，不需要类型注解，冒号后面的是变量别名而不是类型
v1; // number | void
d1; // boolean | undefined
```


### 4.1.6 迭代器
基本使用请右转ES6。
本小节略。

### 4.1.7 调用签名
和对象类型一样，`Function`类型表示了所有的函数，但我们无从得知这个函数的参数类型和返回类型。
我们通常使用调用签名（或叫类型签名）来表示具体的某个函数类型，例如它可以为：`(a: number, b: number) => number`。这个调用签名表示了该函数的形参a和b都是number类型，且函数返回一个number类型的值。

> 函数的调用签名只包含类型层面的代码，即只有类型，没有值。因此，函数的调用签名可以表示参数的类型、this的类型(见4.1.4节)、返回值的类型、剩余参数的类型和可选参数的类型，但是无法表示默认值(因为默认值是值，不是类型)。调用签名没有函数的定义体，无法推导出返回类型，所以必须显式注解。


```typescript
// 调用签名是Function的子类型
type Add = (a: number, b: number) => number;
type a = Add extends Function ? true : false;    // true

```

上述例子中的`Add`类型，声明了一个函数的调用签名，然而这只是它的简写形式。
```typescript

// 简写形式的调用签名
type Add = (a: number, b: number) => number

// 完整形式的调用签名
type Add = {
  (a: number, b: number): number
}
```
### 4.1.8 上下文类型推导
当函数作为回调函数的参数时，无需注解,TS会自动推导。
```typescript
function callback(
  cb: (n: number) => void,
  n: number
) {
    for(let i=0; i < n; i++) {
        cb(i);
    }
}

callback(n => console.log(n), 3);	// 回调函数 n => console.log(n)不需要类型注解
// 0 1 2
```

### 4.1.9 函数类型重载
和java这类强类型语言一样，TS也提供了函数重载，然而实际上这更像是从类型层面上伪装的。

**重载函数: **有多个调用签名的函数。

**如果我们希望使用重载函数，一般有以下两种方式：**

**方法一：使用完整形式的调用签名**
```typescript
type Sum =  {
    (): number							// 重载一
    (a: number): number					// 重载二
    (a: number, b: number): number	// 重载三
}
let sum: Sum = (a?: number, b?: number) => {
    if(typeof a == 'undefined') return 0;
    if(typeof b == 'undefined') return a;
    return a + b;
}
```

在声明完整形式的调用签名时，可以在声明体内同时定义多个签名，TS会将这些签名进行`|`运算，也就是说
`type Sum = () => number | (a: number) => number | (a: number, b: number) => number`
而这一操作是不可见的，不过我们了解即可。

学习过其它语言的同学，可能会发现我们所谓的函数重载，竟然**仅有一个函数实现**，也就是说多个函数声明只对应一个函数体。现在你该明白了为什么会说TS中的函数重载是伪装的了，毕竟具体的类型细分仍要在唯一的函数体中去实现。
不过这样做的意义是什么？
我认为是为了IDE中的类型提示，假设我们使用了一个陌生的函数，我们必须通过阅读文档（然而项目中往往不会拥有开发文档）或查看函数具体实现（那就太累了）才能了解它的参数类型和返回类型，而现在有了函数重载，我们可以直接通过IDE的提示知道这些信息，当我们输入了不正确的参数时，也能够及时的反应过来。

**方法二：使用function声明**
```typescript
function Sum(a: number): number;	// 函数重载
function Sum(a: number, b: number): number;	// 函数重载
function Sum(a?: number, b?: number) {	// 函数实现
    if (typeof a == 'undefined') return 0;
    if (typeof b == 'undefined') return a;
    return a + b;
}
```
显然这种方式更加的符合大多数人的习惯。

**注意：函数实现中的类型是不起作用的**
在这个示例当中，我们减少了不传入参数情况下的函数重载。然而在函数实现中，我们的形参a和b是可选的，假如我们尝试直接调用`Sum`函数会发生什么？
```typescript
Sum();  // Error：Expected 1-2 arguments, but got 0.(2554)
```
函数实现中的类型并不是函数调用的入口之一，它的作用仅是为了实现上述重载的函数。

**函数重载的语法：**
```typescript
函数重载1(参数列表1): 返回值1
函数重载2(参数列表2): 返回值2
函数重载3(参数列表3): 返回值3
函数实现(参数列表4): 返回值4
```
注意，函数实现的参数列表类型，必须是所有函数重载参数列表类型的父类；函数实现的返回值类型，必须是所有函数重载返回值类型的父类。
上面这段话可能难以理解，通俗点讲参数列表4的类型必须是参数列表123的父类，返回值4的类型必须是返回值123的父类
```typescript
// function Sum(a: null): number;      // Error：This overload signature is not compatible with its implementation signature.(2394)
// function Sum(a: number): string;    // Error：This overload signature is not compatible with its implementation signature.(2394)
function Sum(a: 111): number;       // no error
function Sum(a: number): 111;       // no error
function Sum(a: number): number;		// no error
function Sum(a: number, b: number): number;	// no error
function Sum(a?: number, b?: number): number {
    if (typeof a == 'undefined') return 0;
    if (typeof b == 'undefined') return a;
    return a + b;
}


```

TS通过函数重载的声明顺序来进行匹配的，当匹配到相符合的重载声明，将直接跳转进入函数实现当中去，所以**参数类型越细的函数重载，应该放在越上面。**
那上面的`Sum`函数举例子。
```typescript
let res = Sum(222);	// 111
```
TS根据函数重载的声明顺序，匹配到了`function Sum(a: number): 111; `这一重载，所以推导出`res`的类型是`111`，同时你会发现，这一重载完全覆盖了下面的`function Sum(a: number): number;`，所以我们在使用函数重载时，尽量避免这种情况。

函数重载最典型的例子就是JS原生的`createElement`方法
```typescript
type CreateElement = {
	(tag: 'a'): HTMLAnchorElement
  (tag: 'canvas '): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement
  // ...
}
let createElement: CreateElement = (tag: string): HTMLElement => {
  // ...
}
```

**函数属性**
函数也是对象，自然也能够添加属性，我们同样也拥有两种声明方式


## 4.2 多态
有时我们无法提前确定参数的类型。
比如，我们需要实现一个函数，它传入某个类型的参数，再返回这个参数。再确切些，我们传入`number`，函数返回`number`，传入`string`，函数返回`string`。
也许你会想到使用上面的函数重载，将所有可能的类型情况一一列举，但这实在是太过麻烦了。
我们可以通过使用**泛型**来实现这一需求。

**泛型参数：**在类型层面施加约束的占位类型，也称多态类型参数。

```typescript
// 方法一
function foo<T>(arg: T): T {
    return arg;
}

// 方法二
type Fn = {
    <T>(arg: T): T
}
const fn: Fn = function<T>(arg: T): T {
    return arg;
}
```
`<T>`就是泛型，它并不指代某个确定的类型，而是在函数执行时，由传入的参数的类型进行推导得出。

#### 任务列表

- [x] 发布 Sym
- [x] 发布 Solo
- [ ] 预约牙医

### 表格

如果需要展示数据什么的，可以选择使用表格。

| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |
| cell 5   | cell 6   |



### 数学公式

多行公式块：

$$
\frac{1}{
  \Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{
  \frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {
    1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}}{1+\cdots}}
  }
}
$$

行内公式：

公式 $a^2 + b^2 = \color{red}c^2$ 是行内。





























