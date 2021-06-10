> 最近使用 ssh 连接服务器的时候，经常一段时间没有操作就断开了（即无法正常操作，键盘输入无反应），一直以为这是服务器的保护措施，直到一次用公司电脑连接的时候，并没有出现这种问题，于是陷入了沉思.....

## 1.提问
提个问题：如果按照原来的想法，既然ssh是空闲过久导致连接超时而断开，那么`「ssh默认是多久时间，会自动断开连接？」`

结果翻遍大半个搜索引擎……全都是诸如`「如何设置，才能让ssh不超时自动断」`这样的鬼title，而且大部分都是互相抄，复制粘贴的内容……而我想问的问题是`「到底多久超时」`，却没人说过……或者说，其实跟本没有ssh超时这一说？！

再提个问题：如果ssh默认设置都没有限制，那`「为什么ssh会断开连接？」`

```bash
vim /etc/ssh/sshd_config
```
```
# ...
#ClientAliveInterval 0
#ClientAliveCountMax 3
# ...
```

本以为是ssh自动断开超时连接的，但通过配置看到，默认值中并没有做任何限制，那么理论上，ssh的连接是不会断开的。那到底是谁，干了这件`「坏事」`？


## 2.线索
既然是这样，为何公司电脑和家里的电脑变现不同呢？

> 最后通过各种摸索，终于知道了问题的主要原因，因为连接是可以的，只是会超时断开，根据网络结构来看，问题就可能出现在一下这几个部分：
1\. 服务器存在防火墙，会关闭超时空闲连接，或设置了关闭超时空闲连接。
2\. 客服端和服务器之间存在路由器，路由器也可能带有防火墙，会关闭超时空闲连接。
3\. 客服端存在防火墙，会关闭超时空闲连接。

原来，问题出在防火墙！！
## 3.深究
为什么会是防火墙呢？在iptables的一些NAT配置说明里有提到——
> 4.3.6 State match 状态匹配扩展要有内核里的连接跟踪代码的协助，因为它是从连接跟踪机制中得到包的状态的。这样我们就可以了解连接所处的状态。它几乎适用于所有的协议，包括那些无状态的协议，如ICMP和UDP。**针对每个连接都有一个缺省的超时值，如果连接的时间超过了这个值，那么这个连接的记录就被会从连接跟踪的记录数据库中删除，也就是说连接就不再存在了。**这个match必须有-m state作为前提才能使用。状态机制的详细内容在章节状态机制中。

> NAT firewalls like to time out idle sessions to keep their state tables clean and their memory footprint low.
> **NAT防火墙喜欢对空闲的会话进行超时处理，以确保它们状态表的干净和内存的低占用率。**
> Some firewalls are nice, and let you idle for up to a day or so; some are gestapo and terminate your session after 5 minutes.
> **一些防火墙比较友好，允许你的空闲会话时间为一天甚至超过一天；另一些却如盖世太保，5分钟空闲就终止你的会话。**

通过ssh连接后，客户端和服务端长时间没响应时，在两方机器设置中均没任何限制，但在各自的防火墙，或是中转网络连接路由的防火墙中，出现了`「闲置超时断开」`的缺省机制！

## 4.解决方法
#### 1、修改服务端配置（不建议）
![](https://upload-images.jianshu.io/upload_images/5780538-3e41da7163e3e9b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`TCPKeepAlive yes` #表示TCP保持连接不断开
`ClientAliveInterval 300` #指定服务端向客户端请求消息的时间间隔，单位是秒，默认是0，不发送。设置个300表示5分钟发送一次（注意，这里是服务端主动发起），然后等待客户端响应，成功，则保持连接。
`ClientAliveCountMax 3` #指服务端发出请求后客户端无响应则自动断开的最大次数。使用默认给的3即可。
（注意：`TCPKeepAlive` 必须打开，否则直接影响后面的设置。`ClientAliveInterval` 设置的值要小于各层防火墙的最小值，不然，也就没用了。）

注意：最后要重启sshd服务才生效
`sudo /etc/init.d/ssh restart`

修改服务端的配置往往会比较麻烦，也涉及到权限问题，以及安全问题。还是比较推荐下面的方法。
#### 2、修改客户端配置
`vim ~/.ssh/config`

```
Host *
    ServerAliveInterval 60

```
`Host *` #表示需要启用该规则的服务端（域名或ip）
`ServerAliveInterval 60` #表示没60秒去给服务端发起一次请求消息（这个设置好就行了）
`ServerAliveCountMax 3` #表示最大连续尝试连接次数（这个基本不用设置）
#### 3、修改连接工具的配置
通过改变连接工具的一些默认配置，把keepalive的配置打开起来即可：

- secureCRT：会话选项 - 终端 - 反空闲 - 发送NO-OP每xxx秒，设置一个非0值。
- putty：Connection - Seconds between keepalive(0 to turn off)，设置一个非0值。
- iTerm2：profiles - sessions - When idle - send ASCII code.
- XShell：session properties - connection - Keep Alive - Send keep alive message while this session connected. Interval [xxx] sec.

> 当然，用这个办法的副作用也是有的，比如iTerm2会出现一些并不想输入的字符、vim会有些多余字符插入等等，这些情况就按个人的需要酌情取舍了。

#### 4、连接参数-o
```
ssh -o ServerAliveInterval=30 root@host
```
