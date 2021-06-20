### compositionstart
>事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）。

### compositionupdate
> 事件触发于字符被输入到一段文字的时候（这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）

### compositionend
> 当文本段落的组成完成或取消时, compositionend 事件将被触发 (具有特殊字符的触发, 需要一系列键和其他输入, 如语音识别或移动中的字词建议)。
------
> 经测试该三种事件，仅在**输入法**中触发。

## 对比 keydown、input、keyup 事件，产生的顺序

![](https://upload-images.jianshu.io/upload_images/5780538-a06ffa234cd91192.gif?imageMogr2/auto-orient/strip)

![结果](https://upload-images.jianshu.io/upload_images/5780538-ddeac55b14c42c2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



