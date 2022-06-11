// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers:{Authorization:localStorage.getItem('token')},
    success: (res) => {
      if(res.status !== 0 )return layer.msg(res.message)
      // layer.msg('成功')
      // 调用渲染函数
      render(res.data)
    },
    // complete: (res) => {
    //   // console.log(res)
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 强制清空token、
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // },
  })
}

getUserInfo()

// 渲染
function render(user) {
  const name = user.nickname || user.username
  $('#welcome').html(`欢迎 ${name}`)
  // 若上传过图片
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    // 用户名首字母大写
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

$('#btnClose').click(function () {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
    }
  )
})
