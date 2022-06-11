$(function () {
  const form = layui.form

  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '用户名不能长度大于6位'
    },
  })

  // 获取用户信息函数
  const initUserInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('获取成功')
        form.val('userInfo', res.data)
      },
    })
  }

  // 重置表单
  $('#btn-reset').click((e) => {
    e.preventDefault()
    initUserInfo()
  })

  // 更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('成功')
        // 调用更新父页面
        window.parent.getUserInfo()
        console.log(window)
      },
    })
  })

  initUserInfo()
})
