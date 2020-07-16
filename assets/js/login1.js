$(function () {
  // 点击 去注册账号的 链接
  $('#link_reg').on('click', function () {
    $('.reg-box').show();
    $('.login-box').hide();
  })

  // 点击 去登录的 链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  })

  // 从 layui 获取 form 对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过form.verify() 函数自定义正则校验
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 检验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到再次确认框的内容
      // 还需要拿到密码框输入的内容
      // 判断两次输入的内容是否一致
      // 如果失败, return 一个不一致的提示

      // 获取密码框的内容
      var pwd = $('.reg-box [name=password]').val();
      // 判断两次输入的内容是否一致
      if (pwd !== value) {
        return '两次输入的密码不一样';
      }
    }
  })

  //监听注册表单的提交事件 submit 
  $('#form-reg').on('submit', function (e) {
    // 1.阻止表单默认提交行为
    e.preventDefault();
    // 参数对象
    var data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val(),
    }
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录！');
      }
    })
    // 模拟人的点击行为
    $('#link_login').click();
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    // 阻止表单默认提交行为
    e.preventDefault();
    // 获取表单所有属性方法 serialize()

    // 发起ajax  post请求 
    $.ajax({
      method:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success: function(res){
        // 判断登录是否成功
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！');
        //token 用于有权限接口的身份认证
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token);
        // 登录成功后 跳转到后台页面
        // location.href = 'index.html';
      }
    })
  })
})