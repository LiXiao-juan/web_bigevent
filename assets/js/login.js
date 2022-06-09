$(function () {
  // 注册点击事件切换界面
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 引入form
  const form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: (value) => {
      const pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致'
    },
  })

  // 注册界面
  // const baseUrl = 'http://www.liulongbin.top:3007'
  $('#form_reg').submit((e) => {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url:'/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 模拟点击跳转
        $('#link_login').click()
      },
    })
  })

  // 登录界面
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url:'/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        // location.href = '/index.html'
      },
    })
  })
})
