$(function () {
  const form = layui.form
  // 初始化富文本编辑器
  initEditor()
  const initCate = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        const htmlStr = template('tpl-cate', res)
        $('[name = cate_id]').html(htmlStr)
        form.render('select')
      },
    })
  }
  //   定义发布状态
  let art_state = '已发布'

  $('#btnSave2').click(function () {
    art_state = '草稿'
  })
  // 给form表单注册提交事件
  $('#form-pub').submit(function (e) {
    // 取消表单按钮的默认提交事件
    e.preventDefault()
    // 将表单内的内容提交给form---转换成dom
    let fd = new FormData($(this)[0])
    // 将发布状态提交到form
    fd.append('state', art_state)
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        publishArticle(fd)
      })
  })

  function publishArticle(fd) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message)
        //   跳转到文章列表----占位
        location.href = '/article/art_list.html'
        window.parent.change()
        },
      })
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  //   点击调用选择文件
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })

  //   改变事件
  $('#coverFile').change((e) => {
    const fileLen = e.target.files.length
    if (fileLen <= 0) return
    const file = e.target.files[0]
    const imgUrl = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  initCate()
})
