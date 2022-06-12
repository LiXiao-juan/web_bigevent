$(function () {
  const form = layui.form
  const laypage = layui.laypage
  // 需要将请求参数对象提交到服务器
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '', // 文章的发布状态
  }

  const initTable = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        const htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      },
    })
  }
  initTable()

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  //   初始化文章类别
  const initCate = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        const htmlStr = template('tpl-cate', res)
        $('#list').html(htmlStr)
        form.render()
      },
    })
  }

  // 分页
  const renderPage = (total) => {
    laypage.render({
      elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      jump: (obj, first) => {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 判断是否首次加载---每次调用renderPage都是首次加载
        if (!first) {
          initTable()
        }
      },
    })
  }

  // 筛选功能
  $('#form-search').submit((e) => {
    e.preventDefault()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable()
  })

  //   删除功能
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    const btnLength = $('.btn-delete').length
    // 询问用户是否要删除数据
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message)
          if (btnLength === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
          layer.close(index)
        },
      })
    })
  })
  initCate()
})
