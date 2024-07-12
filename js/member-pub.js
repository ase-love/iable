

const autoHyphen = (target) => {
  target.value = target.value
  .replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

function pwReg(pw){
  return pw.match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/); //비밀번호 : 영문+숫자+특수기호(.!@#$%*/)포함 8~15자리
};

function emailReg(email){
  return email.match(/^(\".*\"|[A-Za-z0-9_-]([A-Za-z0-9_-]|[\+\.])*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9][A-Za-z0-9_-]*)+)$/);
};

function nameReg(name){
  if(name !== '' && name.length > 1 && name.match(/^[가-힣]{2,4}|[a-zA-Z]{2,10}$/) && name.match()) { //한글 또는 영문 사용하기(혼용X)
    return true;
  }else{
    return false;
  }
};


function activeCheck(){
  $('[data-id="inpchk"]').on('keyup', function(){
    let $btnActive = $('[data-id="active"]');

    setTimeout(function(){
      if($('.ico-val-check').is(':hidden')){
        $btnActive.attr('disabled', 'disabled');
      }else{
        $btnActive.removeAttr('disabled');
      }
    }, 10);
  });
}

function emailCheck(){
  $('#input-email').on('keyup', function(){
    let $inp = $(this);
    let $icon = $inp.next('.ico-val-check');
    let $btnSend = $('#btn-send');
    let checked = emailReg($inp.val());

    if(checked){
      $icon.show();
      $btnSend.removeAttr('disabled');
    }else{
      $icon.hide();
      $btnSend.attr('disabled', 'disabled');
    }
  });
  //에러텍스트
  $('#input-email').on('blur', function(){
    let $inp = $(this);
    let $icon = $inp.next('.ico-val-check');
    let $error = $inp.parents('.form-type1').find('.txt-error');

    if($icon.is(':hidden')){
      $error.show();
    }else{
      $error.hide();
    }
  });
  //초기화
  $('#input-email').on('focus', function(){
    let $inp = $(this);    
    let $error = $inp.parents('.form-type1').find('.txt-error');

    $error.hide();
  });
}

function pwView(){
  $('.btn-val-view').on('click', function(){
    let $wrap = $(this).parents('.form-type1'); 
    let $inpPw = $wrap.find('[id*=input-pw]'); 
    let $icon = $wrap.find('.ico-val-view'); 
    let $iconOff = $wrap.find('.ico-val-view-off'); 
    
    if($inpPw.attr('type') === 'password'){
      $inpPw.attr('type', 'text');
      $icon.hide();
      $iconOff.show();
    }else{
      $inpPw.attr('type', 'password');
      $icon.show();
      $iconOff.hide();
    }
  });
}

function pwCheck(){
  $('#input-pw').on('keyup', function(){
    let $inp = $(this);
    let $icon = $inp.next('.ico-val-check');
    let checked = pwReg($inp.val());

    if(checked){
      $icon.show();
    }else{
      $icon.hide();
    }
  });

  //비밀번호확인 초기화
  $('#input-pw').on('focus', function(){
    $('#input-pw-check').val('');
    $('#input-pw-check').next('.ico-val-check').hide();
    $('#input-pw-check').parents('.form-type1').find('.txt-error').hide();
  });

  //비밀번호확인
  $('#input-pw-check').on('keyup', function(){
    let $inp = $(this);    
    let $icon = $inp.next('.ico-val-check');    
    let $checkPw = $('#input-pw');

    if($inp.val() === $checkPw.val()){
      $icon.show();
    }else{
      $icon.hide();
    }
  });
  //비밀번호확인 에러텍스트
  $('#input-pw-check').on('blur', function(){
    let $inp = $(this);    
    let $error = $inp.parents('.form-type1').find('.txt-error');
    let $checkPw = $('#input-pw');

    if($inp.val() === $checkPw.val()){
      $error.hide();      
    }else{
      $error.show();
    }
  });
}

function phoneCheck(){
  $('#input-phone').on('keyup', function(){
    let $inp = $(this);
    let $btnSend = $('#btn-send');
    let checked = $(this).val().length >= 13
    
    if(checked){
      $inp.next('.ico-val-check').show();
      $btnSend.removeAttr('disabled');
    }else{
      $inp.next('.ico-val-check').hide();
      $btnSend.attr('disabled', 'disabled');
    }
  });
};

function certifyCheck(){
  $('#btn-send').on('click', function(){
    $('#form-certify').show();
  });

  $('#input-certify').on('input', function(){
    $(this).val($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').substr(0, 6));

    let $btnCertify = $('#btn-certify');
    let checked = $(this).val().length >= 6;
    
    if(checked){
      $btnCertify.removeAttr('disabled');
    }else{
      $btnCertify.attr('disabled', 'disabled');
    }    
  });

  $('#btn-certify').on('click', function(){
    let $btnActive = $('[data-id="active"]');    
    $btnActive.removeAttr('disabled');
  });

}

function nameCheck(){
  $('#input-name').on('keyup', function(){
    let $inp = $(this);
    let $icon = $inp.next('.ico-val-check');    
    let checked = nameReg($inp.val());

    if(checked){
      $icon.show();
    }else{
      $icon.hide();
    }
  });
}

function alertEmailSend(){
  function callback(type){
    alert(type);
  }  
  alertOpen('이메일로 인증번호를 확인하세요.<br>(메일을 발송하였으나 지연될 수 있습니다.)', ['확인'], callback);
}


$(function(){
  activeCheck();
  emailCheck();
  pwView();
  pwCheck();
  phoneCheck();
  certifyCheck();
  nameCheck();

});
