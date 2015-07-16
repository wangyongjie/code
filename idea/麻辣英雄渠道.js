注意事项：
1.uc_a 渠道：
	他们打包 打了 release包  就是默认正式环境。。  其他渠道都不分的。
	 @石竹 这个还是要想办法 记下。不然每次为了这种问题一大伙人查半天 太浪费时间了。
2.mz_a的回调地址改了以后  还得找他们人  手动生效一次才会生效
3.http://119.145.5.182:8089/hw_a/buy_result?test=shuimu 连不通的话，
	需要检查10.237的commont_config文件的default_site属性，并确定di.syyx.com已经启动了。






麻辣英雄
测试回调地址统一为：http://pay.mlyx.syyx.com/test/req_jump/ + 渠道标示
正式回调地址统一为：http://pay.mlyx.syyx.com/ + 渠道标示 + /buy_result




