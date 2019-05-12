# node-practice
node.js实战(第二版)

```

# ES6新特性
http://node.green[http://node.green]

```
* 章节目录
    * chapter01 欢迎进入nodejs的世界
        * 1-1 使用核心模块和流
    * chapter02 Node编程基础
        * 2-4 用回调处理一次性事件
        * 2-9 事件发射器
            * win10启用：telnet命令[http://www.xitongcheng.com/jiaocheng/win10_article_37554.html]
        * 2-10 响应一次性事件
        * 2-11 事件发射器实现简单的发布/预定系统
            * 聊天室功能
            * 所有消息转发全频道
            * 监听用户断开连接
            * 关闭聊天室服务
            * 错误处理
        * 2-12 事件发射器实现简单的发布/预定系统(使用class类重构)
        * 2-13 文件监听器
            * 监视指定目录，将文件名改为小写，并将文件复制到一个单独目录中
        * 2-16 实现串行化控制
        * 2-17 实现串行化控制RSS数据转换
        * 2-18 实现并行化流程控制(单词频度计数)
    * 深入了解Connect和express
        * 6-1 创建Connect程序
        * 6-2 创建可配置的Connect中间件
        * 6-5 极简的Express程序
        * 6-6 生成的Express程序框架 
            * 安装命令：npm install -g express-generator
            * 初始命令 cd 6-6
            * express --view=ejs 生成ejs项目模板
            * npm install 安装依赖
            * npm start 启动项目
    * 存储数据
        * 8-1 redis
            * 普通键/值存储 get set
            * 检查某个键是否存在 exists
            * 默认将键和值强制转换成字符串(数字、布尔值、日期转换为字符串)
        * 8-2 set 陷阱、缓冲区
        * 8-3 使用散列表、列表、集合
            * 散列表 键/值对的数据集
                * hmset 设置键值对
                * hget 读取对应Object key的value
                * hkeys 数组形式获取 key
                * hvals 数组形式获取 value
            * 列表 有序数据集 类似数组
                * lpush 向列表添加一个值
                * lrange 按范围查找
            * 集合 无序数据集，不允许重复值
                * sadd 向集合中添加数据
                * smembers 查询集合中数据
        * 8-4 用频道实现发布/订阅功能