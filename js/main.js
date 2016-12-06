$('.nav-pills a').on('click', function (e) {
    e.preventDefault();

    /*if($(this).attr('href')=='#three'){
        $('#lorem-text').hide();
        $('#hidden-text div').removeClass('hidden')
    }
    else{
        $('#lorem-text').show();
        $('#hidden-text div').addClass('hidden')
    }
    $(this).tab('show');*/
    
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
});