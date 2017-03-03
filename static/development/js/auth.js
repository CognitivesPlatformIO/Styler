var AuthController = (function ($) {
    return {
        loginOrSignup: function () {
            AuthController.LoginOrSignup.init();
        },
        socialSignup: function () {
            AuthController.SocialSignup.init();
        },
        forgotPassword: function () {
            AuthController.ForgotPassword.init();
        },
        resetPassword: function () {
            AuthController.ResetPassword.init();
        }
    };
}(jQuery));

AuthController.LoginOrSignup = (function ($) {

    var attachEvents = function () {
        $("#loginForm").validateLoginForm();
        $("#signupForm").validateSignupForm();
        
        $('.signupBtn').on('click', function (e) {
            e.preventDefault();
            $('.loginTab, #Login').removeClass('active');
            $('.signupTab, #SignUp').addClass('active');
        });
        $('.loginBtn').on('click',function (e) {
            e.preventDefault();
            $('.loginTab, #Login').addClass('active');
            $('.signupTab, #SignUp').removeClass('active');
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));
AuthController.SocialSignup = (function ($) {

    var attachEvents = function () {
        $("#signupForm").validateSocialSignupForm();
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ForgotPassword = (function ($) {

    var attachEvents = function () {
        $("#forgotPasswordForm").validate({
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: "Email or username cannot be blank."
            }
        });

    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ResetPassword = (function ($) {

    var attachEvents = function () {
        $("#resetPasswordForm").validate({
            rules: {
                password: {
                    required: true,
                    minlength: 6
                },
                verifypassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            messages: {
                password: {
                    required: "Password cannot be blank.",
                    minlength: "Password should contain at least 6 characters."
                },
                verifypassword: {
                    required: "Verify password cannot be blank.",
                    minlength: "Verify Password should contain at least 6 characters.",
                    equalTo: "Verify Password should exactly match Password"
                }
            }
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));