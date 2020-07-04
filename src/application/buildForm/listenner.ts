import * as PubSub from 'pubsub-js'

export default class Listener {

    /**
     * 元素被点击
     */
    public static onControllerClick: string = 'ONCONTROLLERCLICK'

    /**
     * 发送事件
     * @constructor
     * @param props
     */
    public static EmitControllerClick(props: {
        list: any,
        item: any,
        callbackUpdate: () => void
    }) {
        PubSub.publishSync(Listener.onControllerClick, props)
    }

}
