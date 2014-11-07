//--------------------------------------------------------------------------
//-通过http请求读取某个站点下的csv文件
//-注：和从数据库中读数据相比，这种方法有优也有劣。
//-优：需求方只需要上传文件到指定的站点即可，当数据更新太频繁时会显得非常方便。
//-劣：访问时间会变长，只适用于数据信息比较少的情况，最好csv文件少于5000行，否则
//-    加载速度很慢。
var http  = require('http')
var https = require('https')
var url   = require('url')
var qs    = require('querystring')
var http_request = function(method, url_str, data, cb, type, content_type, headers) {
    var url_info = url.parse(url_str)  

    var options  = {}
    options.hostname = url_info.hostname
    options.path     = url_info.path
    options.port     = url_info.port
    options.method   = method

    if(method == 'POST') {
        options.headers = { }

        if(content_type) {
            options.headers["Content-Type" ] = content_type 
        }
        else {
            options.headers["Content-Type" ] = "application/x-www-form-urlencoded"             
        }
    }

    if(typeof data == 'function') {
        type =  cb  
        cb   = data
        data = null
    }
    
    if(typeof data == "object") {
        data = qs.stringify(data)
    }

    if(method == 'GET' && data) {
        options.path += '?' + data
    }

    if(url_info.protocol == 'http:') {
        var request = http.request
    }
    else if(url_info.protocol == 'https:') {
        var request = https.request
    }
    else {
        console.log('unknown protocol:' + url_info.protocol)
    }

    headers && headers.forEach(function(h) {
        options.headers[h.key] = h.value
    })

    var req = request(options, function(res) {
        var str = ''
        res.setEncoding('binary');
        
        res.on('data', function (chunk) {
            str += chunk
        })

        res.on('end', function() {
            if(type && type.toLowerCase() == 'json') {
                str  =  JSON.parse(str)
            }

            if(type && type.toLowerCase() == 'string') {
                str  =  JSON.stringify(str)
            }

            cb(null, str)
        })
    })

    if (exports.request_timeout_len) {
        req.setTimeout(exports.request_timeout_len, function() {
            req.abort()
        })
    }
    req.on('error', function(e) {
        cb(e)
    })

    if(method == 'POST' && data) {
        req.write(data)
    }

    req.end()
}

//------------------------------------------------------------------------------------------
//-对csv文件进行解析，组合成对象传到前台。
//-注：1、如果直接在csv文件上修改，可能会有多余的空格出现，建议在excel修改后再另存为csv文件。
//-2、在linux环境下，换行是\n，但在window环境下，换行是\r\n，为了兼容两种环境，代码上会对字
//-   符按照\n来进行分割，并通过trim（）方法去掉\r。另外，也对空行进行了处理。
function get_info(data, cb) {
    var name = data.name
    var url_str = "http://v.lz.syyx.com/lz/other/"
    url_str = url_str + name + ".csv"
    var args = {}

    ms.log.info("get_name_list from >>> ", url_str)
    http_request('get', url_str, args, function(err, data) {
        if (err) {
            ms.log.error('glory', 'get_name_list err', err)
            cb(err); return
        }

        var arr = urlencode.decode(data, 'gbk')
        var item_list = arr.split('\n')

        var result = new Array()
        var i = 0

        //处理空内容
        var len = 0
        if(item_list.length == 0) {
            len = 0
        }
        else {
            var j = item_list.length - 1
            while(j >= 0 && item_list[j].trim() == "") {
                --j
            }
            len = j + 1
        }

        for (var x=0; x < Math.ceil(len/6.0); x++) {
            var temp = {}
            temp['name1']   = item_list[6*x + 0] || ""
            temp['name2']   = item_list[6*x + 1] || ""
            temp['name3']   = item_list[6*x + 2] || "" 
            temp['name4']   = item_list[6*x + 3] || ""
            temp['name5']   = item_list[6*x + 4] || ""
            temp['name6']   = item_list[6*x + 5] || ""
            result[i++]     = temp
        }

        ms.log.info("get_name_list length is ", len)
        cb(null, result)
    })
}