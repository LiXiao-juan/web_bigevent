$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChoose').click(() => {
    $('#file').click()
  })

  //   给文件上传按钮change
  $('#file').change((e) => {
    const fileLen = e.target.files.length
    if (fileLen === 0) return
    const file = e.target.files[0]
    const imgUrl = URL.createObjectURL(file)

    $('#image')
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  $('#btnUpload').click(() => {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png')

      $.ajax({
          method: 'POST',
          url:'/my/update/avatar',
          data:{
            avatar:dataURL
          },
          success: res => {
              if(res.status !== 0)return layer.msg(res.message)
              layer.msg('成功')
              window.parent.getUserInfo()
          }
      })
  })
})
