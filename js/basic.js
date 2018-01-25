$(function () {
    // 控制预约表单操作选项
    $('#more-choice').on('click', function (e) {
        // 找到下一个元素
        var next = $('#more-choice').next();
        if (next.is(':hidden')) {
            $('#more-choice').html('隐藏选项 ');
            $('#more-choice').append($("<span class='fa fa-caret-down'></span>"));
        } else {
            $('#more-choice').html('展开更多 ');
            $('#more-choice').append($("<span class='fa fa-caret-up'></span>"));
        }
        next.toggle();
    });

    // 验证码发送按钮操作
    $('#check_btn').one('click', function () {
        $('#check_btn').html('验证码已发送');
    });

    //-------------------------------------------------------------分割线-----------------------------------------------------------------------------------//

    // 动画效果
    // 当点击toggle时动态修改下拉菜单的居中定位,而当屏幕小于768时，取消该操作
    $('ul.my-menu').on('mouseenter', 'a.dropdown-toggle', function () {
        if (window.innerWidth >= 768) {
            var width = $(this).next().width();
            $(this).next().css({
                'margin-left': (-1 * width / 2)
            });
        } else {
            $(this).next().css({
                'margin-left':0
            })
        }

    });

    // 点击隐藏/展开新闻左部侧滑导航栏
    $('div.news-main-left.visible-xs').on('click', 'div.left-control', function () {
        var flag = $('div.news-main-left.visible-xs').css('left');
        if (flag == '-200px') {
            $('div.news-main-left.visible-xs').css({
                'left':'0px'
            });
            $(this).html('隐藏选项');
        } else {
            $('div.news-main-left.visible-xs').css({
                'left': '-200px'
            });
            $(this).html('展开选项');
        }
    });
    // 配合新闻以及新闻详细 当屏幕宽度改为992以上时，若左侧导航被隐藏，则显示导航
    $(window).resize(function () {
        if (window.innerWidth >= 992) {
            // 如果此时导航栏被隐藏
            if ($('div.news-main-left').is(':hidden')) {
                $('div.news-main-left').show();
            }
        }
    })
    // 更改导航栏元素active样式
    $('.navbar-nav li > a').on('click', function (e) {
        $(e.target).parent().addClass('active').siblings().removeClass('active');
    });

    // 固定导航栏
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= $('.top-nav').height()) {
            $('.header').addClass('fixed');

        } else {
            $('.header').removeClass('fixed');
        }
    });

    // 留言气泡效果
    $('.bubble').on('click', function (e) {
        if ($(e.target).attr('data-show') == 'false') {
            $(e.target).addClass('show');
            $(e.target).attr('data-show', 'true');
            // 这时出现留言栏目
            $('.bubble .bubble_msg').slideToggle();
        } else {
            $(e.target).removeClass('show');
            $(e.target).attr('data-show', 'false');
            $('.bubble .bubble_msg').slideToggle();
        }
    });
    // 阻止默认事件和冒泡事件
    $('.bubble .bubble_msg').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    // 关闭按钮
    $('.close_msg').on('click', function (e) {
        $('.bubble').removeClass('show');
        $('.bubble').attr('data-show', 'false');
        $('.bubble .bubble_msg').slideUp();
    });

    // 悬停更改dropdown-menu伪元素样式
    $('ul.my-menu').on('mouseenter', 'ul.dropdown-menu li:nth-child(1)', function () {
        $(this).parent().addClass('full');
    });
    $('ul.my-menu').on('mouseleave', 'ul.dropdown-menu li:nth-child(1)', function () {
        $(this).parent().removeClass('full');
    });

    //----------------------------------------------------------------ZED----------------------------------------------------------------------------------//

    // 通用分页器控制
    // 最开始隐藏到只剩1,2和下一页
    $('div.changePage ul.pagination li.number').hide();
    $('div.changePage ul.pagination li:nth-child(2)').show().next().show();
    $('div.changePage ul.pagination li').on('click', 'a', function (e) {
        // 总页数
        var allNum = Number($('div.changePage ul.pagination').children().length) - 2;
        console.log(allNum);
        if ($(e.target).attr('data-page')) {
            $('div.changePage ul.pagination').attr('data-nowPage', $(e.target).attr('data-page'));
        } else if ($(e.target).html() == '下一页') {
            $('div.changePage ul.pagination').attr('data-nowPage', Number($('div.changePage ul.pagination').attr('data-nowPage')) + 1)
        } else if ($(e.target).html() == '上一页') {
            $('div.changePage ul.pagination').attr('data-nowPage', Number($('div.changePage ul.pagination').attr('data-nowPage')) - 1)
        } else {
            e.preventDefault();
        }

        var num = Number($('div.changePage ul.pagination').attr('data-nowPage'));
        var nowChoose = $('div.changePage ul.pagination li:nth-child(' + (num + 1) + ') a').parent();
        nowChoose.addClass('active').siblings().removeClass('active');
        // 隐藏前后
        // 先隐藏全部
        $('div.changePage ul.pagination li.number').hide();
        nowChoose.show();
        nowChoose.prev().show();
        nowChoose.next().show();



        // 当data-nowPage不大于1时，隐藏上一页按钮
        if (Number($('div.changePage ul.pagination').attr('data-nowPage')) > 1) {
            $('div.changePage ul.pagination li:first').show();
        } else {
            $('div.changePage ul.pagination li:first').hide();
        }
        // 当data-nowPage为最后一页时，隐藏下一页按钮
        if (Number($('div.changePage ul.pagination').attr('data-nowPage')) < allNum) {
            $('div.changePage ul.pagination li:last').show();
        } else {
            $('div.changePage ul.pagination li:last').hide();
        }



    });


    //------------------------------------------------------------------RIVEN------------------------------------------------------------------------------//

    // 登录
    // $('#head_login').on('click', function () {
    //     // 获取输入数据
    //     var username = $('#head_username').val();
    //     var pwd = $('#head_password').val();
    //     $.ajax({
    //         data:{
    //             username:username,
    //             password:pwd
    //         },
    //         type:'POST',
    //         dataType:'JSON',
    //         url:'',
    //         success:function (data) {
    //             // 假如登录成功,更改登录注册选项为头像栏目
    //             // 关闭登录模态框
    //             $('#SignIn').modal('hide');
    //             // 去除登录注册所在li
    //             $('a.SignIn').parent().hide();
    //             // 添加头像
    //             // 定义一个新li容器
    //             var newLi = $('<li class="dropdown li-head"></li>');
    //             // 定义一个a
    //             var newA = $('<a href="#" class="dropdown-toggle user_head" data-toggle="dropdown"></a>');
    //             // 去掉a的padding-top
    //             newA.css({
    //                 'paddingTop': 0,
    //                 'margin-top': -6
    //             });
    //             // 定义一个菜单menu
    //             var newMenu = $('<ul class="dropdown-menu" style="width:120px;"></ul>');
    //             // 选项一
    //             var op1 = $('<li><a href="#"><img src="./img/nav/zuopin_nav_icon_user.png" alt="" style="margin-right:6px;">我的主页</a></li>');
    //             // 选项二
    //             var op2 = $('<li><a href="#"><img src="./img/nav/zuopin_nav_icon_setup.png" alt="" style="margin-right:6px;">设置</a></li>');
    //             // 选项三
    //             var op3 = $('<li><a href="#" id="logOut"><img src="./img/nav/zuopin_nav_icon_signout.png" alt="" style="margin-right:6px;">退出</a></li>');
    //             // 选项添加进ul菜单
    //             newMenu.append(op1).append(op2).append(op3);
    //             // 获取头像src
    //             var src = data.src || './img/msg/zuopin_msg_img_qq.png';
    //             // 定义头像
    //             var newHead = $('<img src="' + src + '" style="width:60px;height:60px;" class="img-responsive">');
    //             // 头像加入新a
    //             newA.append(newHead);
    //             // a加入li容器
    //             newLi.append(newA);
    //             // 菜单加入li容器
    //             newLi.append(newMenu);
    //             // li容器加入导航
    //             $('ul.my-menu').append(newLi);

    //             // 添加注销事件
    //             // $('ul.my-menu li a#logOut').on('click', function () {
    //             //     $('li.li-head').hide();
    //             //     $('ul.my-menu li a.SignIn').parent().show();
    //             // });


    //         }
    //     })
    // });
    // 注销事件委托
    // $('ul.my-menu').on('click', 'li.dropdown ul.dropdown-menu li a#logOut', function () {
    //     var action = 'logOut';
    //     // 注销session
    //     $.ajax({
    //         url:'',
    //         type:'GET',
    //         dataType:'JSON',
    //         data:{

    //         },
    //         success:function (data) {
    //             // 假如注销成功，去掉头像，改为登录注册选项
    //             $('li.li-head').hide();
    //             $('ul.my-menu li a.SignIn').parent().show();
    //         },
    //         error:function (err) {

    //         }
    //     });
    // });

    // 注册
    $('#head_register').on('click', function () {
        // 获取数据
        var mail = $('#register_email').val();
        var username = $('#register_username').val();
        var pwd = $('#register_password').val();
        var pwd_confirm = $('#register_confirm').val();
        var phone = $('#register_phone').val();
        var check = $('#register_check').val();
    });



    //--------------------------------------------------------------------------select----------------------------------------------------------------------------------------------//
    // select改变事件，触发颜色更改
    $('div.modal#subscribe div.modal-content form select').change(function() {
        $(this).removeClass('a6');
    })
})