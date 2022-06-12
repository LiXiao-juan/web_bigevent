$(function () {
  const form = layui.form
  const initArtCateList = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        let htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      },
    })
  }

  let indexAdd
  //   const layer = layui.layer
  $('#btnAdd').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    })
  })

  //   事件委托
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        //
        initArtCateList()
        layer.close(indexAdd)
      },
    })
  })
  let indexEdit
  $('tbody').on('click', '.btn-edit', function () {
    const id = $(this).attr('data-id')
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    })

    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        console.log(res);
        form.val('form-edit', res.data)
      },
    })
  })

  $('body').on('submit','#form-edit', function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success: function(res){
        if(res.status !== 0)return layer.msg(res.message);
        layer.msg('成功')
        initArtCateList()
        layer.close(indexEdit)
      }

    })
  })

  $('tbody').on('click','.btn-close',function(){
    const id = $(this).attr("data-id");
    // 提示用户是否删除
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
        $.ajax({
            method: "GET",
            url: "/my/article/deletecate/" + id,
            success: function (res) {
                if (res.status !== 0)return layer.msg(res.message);
                
                layer.msg("删除分类成功！");
                layer.close(index);
                initArtCateList();
            },
        });
    });
  })

  initArtCateList()
})
