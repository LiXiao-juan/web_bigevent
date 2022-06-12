$.ajaxPrefilter ((options) => {
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    // 注入token
    if(options.url.includes('/my/')){
        options.headers = {
            Authorization:localStorage.getItem('token')
        }
    }

    // 权限校验
    options.complete = (res) => {
        if (
          res.responseJSON.status === 1 &&
          res.responseJSON.message === "身份认证失败！"
        ) {
          // 强制清空token、
          localStorage.removeItem('token')
          location.href = '/login.html'
        }
      }
})