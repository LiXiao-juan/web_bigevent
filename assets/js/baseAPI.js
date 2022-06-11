$.ajaxPrefilter ((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options);
    // 注入token
    if(options.url.includes('/my/')){
        options.headers = {
            Authorization:localStorage.getItem('token')
        }
    }

    // 权限校验
    options.complete = (res) => {
        // console.log(res)
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