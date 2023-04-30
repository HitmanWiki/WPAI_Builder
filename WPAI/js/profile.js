$(document).ready(function() {
    /*if (document.getElementById('topProject').offsetTop < document.getElementById('newProjectButton').offsetTop + document.getElementById('newProjectButton').offsetHeight) {
        document.getElementById('topProject').style.marginTop = (document.getElementById('newProjectButton').offsetTop + document.getElementById('newProjectButton').offsetHeight + 20).toString() + 'px';
    }*/
    
    if (window.innerWidth > 1000) {
        if (document.getElementsByClassName('omb_login').length > 0) {
            document.getElementsByClassName('omb_login')[0].className = 'omb_login col-sm-6 col-sm-offset-3';
            document.getElementsByClassName('omb_forgotPwd')[0].style.marginTop = '20px';
        }
    } else {
        var svgInterval = setInterval(function() {
            if (document.getElementsByTagName('svg').length === 9) {
                clearInterval(svgInterval);
                document.getElementsByTagName('svg')[0].parentElement.removeChild(document.getElementsByTagName('svg')[0]);
                document.getElementsByTagName('svg')[0].parentElement.removeChild(document.getElementsByTagName('svg')[0]);
            }
        }, 100);
    }
    
    window.fbAsyncInit = function() {
        FB.init({
            appId: '409165766194370',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        });
          
        FB.AppEvents.logPageView();
            FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                signInType = 'facebook';
            }
        });
    };
    
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    startApp();
    
    if (window.location.search === "?type=first") {
        if (window.localStorage.getItem('projectItem') !== 'shown') {
            window.localStorage.setItem('projectItem', 'shown');
            
            swal({
                title: localize("Step 2/2 Complete"),
                text: localize("You did it! Hopefully you like your site and want to keep it up forever. If at any point you'd like to take it down, simply delete it from this page with the touch of a button. Here are three quick slides on next steps:"),
                type: "success",
                icon: 'success',
                closeOnClickOutside: false,
                button: localize("Next"),
                closeOnConfirm: false
            }).then(function(isConfirm) {
                swal({
                    title: localize("Your Account (1/3)"),
                    text: localize("To protect your site, you'll want to attach it to an account. If you have already created one, then great! If not, you can make one for free by simply entering your name, email, and a password. You can also sign in using your Facebook or Google account with a simple tap."),
                    type: "info",
                    icon: 'info',
                    closeOnClickOutside: false,
                    button: localize("Next"),
                    animation: false
                }).then(function(isConfirm) {
                    swal({
                        title: localize("Dashboard (2/3)"),
                        text: localize("If you have a place for users to buy products or book services on your website, the Dashboard is a place for you to manage all of that stuff. You can access the Dashboard from this page once you sign in."),
                        type: "info",
                        icon: 'info',
                        closeOnClickOutside: false,
                        button: localize("Next"),
                        animation: false
                    }).then(function(isConfirm) {
                        swal({
                            title: localize("Editing Your Site (3/3)"),
                            text: localize("Your site is currently hosted for free at a *." + sld + " domain, and it can remain that way forever. If, however, you want to add a custom domain name to your site (like a .com domain), you'll want to upgrade to Leia Pro, which includes a number of other awesome features that the free plan does not have. You can learn more by clicking the \"Upgrade Plan\" button next to your site."),
                            type: "info",
                            icon: 'info',
                            closeOnClickOutside: false,
                            button: localize("Got It!"),
                            animation: false
                        });
                    });
                });  
            });
        }
    } else if (window.location.search === "?msg=signIn") {
        swal(localize('Sign In'), localize('In order to create Leia email accounts, you\'ll need to sign into your account with Leia.'), 'info');
        backToMail = true;
        setTimeout(function() {
            document.getElementById('signInButton').click();
        }, 1000);
    } else if (window.location.search === "?type=domain") {
        checkDomainAfterUG();
    } else if (window.location.search.includes("&domain=")) {
        platformType = "business";
        currentId = window.location.search.split('siteId=')[0].split('&domain=')[0];
        domainToBuy = window.location.search.split('&domain=')[1];
        getDomain(domainToBuy);
    } else if (window.location.search.includes("ssl=")) {
        platformType = "business";
        currentId = window.location.search.split('siteId=')[0].split('&ssl=')[0];
        domainToBuy = window.location.search.split('&d=')[1];
        getSSLPayment();
    } else if (window.location.search === "?action=nosites") {
        swal('No Websites', 'Before you have any leads to view or a budget to set, you\'ll need to create a website.', 'error').then(function(){
            window.location.href = '/';
        });
    } else {
        if (topProject !== 'none' && window.localStorage.getItem(topProject) !== 'shown') {
            var msg = "none";
            var ttl = 'none';
            if (topProject === 'silver') {
                msg = "Nice work! One of your websites reached 100 page views, and has achieved silver status. Get to 1,000 to reach gold!";
                ttl = 'Silver Status!';
            } else if (topProject === 'bronze') {
                msg = "Nice work! One of your websites reached 10 page views, and has achieved bronze status. Get to 100 to reach silver!";
                ttl = 'Bronze Status!';
            } else if (topProject === 'platinum') {
                msg = "Wow! One of your websites has achieved platinum status with more than 10,000 page views. You are conquering the web.";
                ttl = 'Platinum Status!';
            } else if (topProject === 'gold') {
                msg = "Nice work! One of your websites reached 1,000 page views, and has achieved gold status. Get to 10,000 to reach platinum!";
                ttl = 'Gold Status!';
            }

            if (msg !== 'none') {
                swal(ttl, msg, 'success');
                window.localStorage.setItem(topProject, 'shown');
            }
        }
        
        if (window.location.href.includes('/projects')) {
            //loadPageViews();
            
            /*if (document.getElementsByClassName('websiteTitleClass').length > 10) {
                document.getElementById('websiteSearch').style.display = '';
                
                $('#websiteSearch').keyup(function() {
                    if (this.value === '') {
                        $('.projectCell').css('display', '');
                    } else {
                        var cells = document.getElementsByClassName('websiteTitleClass');
                        for (var i = 0; i < cells.length; i++) {
                            if (cells[i].textContent.toLowerCase().includes(this.value.toLowerCase())) {
                                cells[i].parentElement.parentElement.style.display = '';
                            } else {
                                cells[i].parentElement.parentElement.style.display = 'none';
                            }
                        }
                    }
                });
            }*/
        }
    }
    
    if (window.location.href.includes('/projects')) {
        $(document).on('scroll', function() {
            var pContainer = document.getElementsByTagName('html')[0];
            if (!loadingNext && $(pContainer).scrollTop() + $(pContainer).innerHeight() >= $(pContainer)[0].scrollHeight - 100) {
                loadNext();
            }
        });
        
        $('#websiteSearch').keyup(function() {
            if (this.value === '') {
                currentOffset = 0;
                loadingNext = false;
                clearProjectResults();
                loadNext();
            } else {
                var cells = document.getElementsByClassName('websiteTitleClass');
                for (var i = 0; i < cells.length; i++) {
                    if (cells[i].textContent.toLowerCase().includes(this.value.toLowerCase())) {
                        cells[i].parentElement.parentElement.style.display = '';
                    } else {
                        cells[i].parentElement.parentElement.style.display = 'none';
                    }
                }
            }
        });
        
        if (document.getElementsByClassName('websiteTitleClass').length == 10) {
            document.getElementById('websiteSearch').style.display = '';
        }
        
        $('.pageViewLoader').click(function() {
             loadPageViewsById(this.getAttribute('name'));
        });
    }
    
    $('input[type="radio"]').click(function() {
        if($(this).attr("value")=="zip"){
            $("#datumZip").show('slow');
        }
        
        if($(this).attr("value")!="zip"){
            $("#datumZip").hide('slow');
        }
        
//        if ($('#zipRadio').prop('checked', true)) {
//            $('#datumZip').css('display','inline-block');
//        }
//
//        if ($('#zipRadio').prop('checked', false)) {
//            $('#datumZip').css('display','none');
//        }                  
    });
});

var clearProjectResults = function() {
    while (document.getElementsByClassName('projectCell').length > 0) {
        document.getElementsByClassName('projectCell')[0].parentElement.parentElement.removeChild(document.getElementsByClassName('projectCell')[0].parentElement);
    }
}

var loadProjectsBySearch = function() {
    $.ajax({
        url: '/php/getProjectsByName.php?search=' + encodeURI($('#websiteSearch').val()),
        type: 'GET',
        success: function(data) {
            loadingNext = false;
            if (data.length > 100) {
                currentOffset += 10;
                $('#projectsContainer').append(data);
            }
        },
        error: function(err) {
            loadingNext = false;
            console.log(err);
        }
    });
}

var currentOffset = 10;
var loadingNext = false;
var loadNext = function() {
    if (loadingNext) {
        return;
    }
    
    loadingNext = true;
    $.ajax({
        url: '/php/getProjectsNoPageViews.php?offset=' + currentOffset.toString(),
        type: 'GET',
        success: function(data) {
            loadingNext = false;
            if (data.length > 100) {
                currentOffset += 10;
                $('#projectsContainer').append(data);
            }
        },
        error: function(err) {
            loadingNext = false;
            console.log(err);
        }
    });
}

//Load the page views for the user's websites
var loadPageViews = function() {
    $.ajax({
        url: '/php/getProjects.php',
        type: 'GET',
        success: function(data) {
            var items = JSON.parse(data);
            for (var i = 0; i < items.length; i++) {
                var m = document.getElementById('M-' + items[i].id);
                var t = document.getElementById('T-' + items[i].id);
                
                if (m.innerHTML.trim() !== 'Requires Upgrade') {
                    while (m.firstChild) {
                        m.removeChild(m.firstChild);
                    }

                    while (t.firstChild) {
                        t.removeChild(t.firstChild);
                    }

                    m.appendChild(document.createTextNode(items[i].monthly));
                    t.appendChild(document.createTextNode(items[i].total));
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

var currPvId;
var loadPageViewsById = function(id) {
    currPvId = id;
    appendSpinner();
    
    $.ajax({
        url: '/php/getPageViews.php?platformId=' + id,
        type: 'GET',
        success: function(data) {
            removeSpinner();
            
            var items = JSON.parse(data);
            var m = document.getElementById('M-' + currPvId);
            var t = document.getElementById('T-' + currPvId);

            if (m.innerHTML.trim() !== 'Requires Upgrade') {
                while (m.firstChild) {
                    m.removeChild(m.firstChild);
                }

                while (t.firstChild) {
                    t.removeChild(t.firstChild);
                }

                m.appendChild(document.createTextNode(items[0].monthly));
                t.appendChild(document.createTextNode(items[0].total));
            }
        },
        error: function(err) {
            removeSpinner();
            console.log(err);
        }
    });
}

var showDatumOverlay = function() {
    document.getElementById('datumOverlayOuter').style.display = '';
}

var show401kOverlay = function() {
    document.getElementById('saveDayOverlayOuter').style.display = '';
}

var transferPlatformId;
var initiateTransfer = function() {
    var formString = '<select onchange="" id="html-section-field" class="multiselect-ui form-control">';
    var projects = document.getElementsByClassName('projectCell');
    for (var i = 0; i < projects.length; i++) {
        var name = projects[i].getElementsByTagName('h2')[0].innerHTML;
        var id = projects[i].getElementsByTagName('h2')[0].getAttribute('id').substring(1, 50);
        formString += '<option value="' + id + '">' + name + '</option>';
    }
    
    formString += "</select>";   
    var form = $.parseHTML(formString)[0];

    swal({
        icon: 'info',
        title: localize("Transfer Website"),
        text: localize("Choose which website you want to transfer. Please note that this will also transfer domains, SSL certs, and email addresses associated with the website."),
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Next"),
                value: "next",
            }
        },
        content: form
    }).then((value) => {
        if (value === 'next') {
            transferPlatformId = document.getElementById('html-section-field').options[document.getElementById('html-section-field').selectedIndex].value;
            getTransferId();
        }
    });
}

var getTransferId = function() {
    swal({
        icon: 'info',
        title: localize("Transfer ID"),
        text: localize('Please enter the transfer ID of the account you would like to transfer this website to.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Transfer ID..."),
                type: "text",
                id: "transferIdInput",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            skip: {
                text: localize("Cancel"),
                className: 'swal-button--cancel'
            },
            change: {
                text: localize("Submit"),
                closeModal: false
            }
        }
    }).then((name) => {
        if (name == 'change') {
            postTransfer(transferPlatformId, document.getElementById('transferIdInput').value);
        } 

        swal.close();
    });
}

var postTransfer = function(id, toAccount) {
    appendSpinner();
    
    $.ajax({
        url: '/php/initiateTransfer.php',
        type: 'POST',
        data: {'platformId': id, 'transferId': toAccount},
        success: function(data) {
            removeSpinner();
            
            if (data === 'success') {
                swal('Transfer Made', 'Your website has been transfered over to the account you\'ve chosen.', 'success').then(function() {
                    window.location.reload();
                });
            } else {
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(xmlhttprequest, textstatus, message) {
            removeSpinner();
            
            if (textstatus === "timeout") {
                swal(localize('Uh Oh!'), localize('The request timed out. Please ensure that you have a good connection to the internet, then try again. If the issue persists, contact us.'), 'error');
            } else {
                swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a moment.'), 'error'); 
            }
        }
    });
}

var topProject = 'none';
var backToMail = false;
var activeButton = false;
var signInType = 'none';
var viewDashboard = function(id, hType) {
    if (hType === "free") {
        currentId = id;
        swal({
            title: localize("Upgrade Required"),
            icon: "info",
            text: localize("In order to sell products and book services through your site, you'll need to upgrade your website plan. This can be done for as little as $9.99 per year!"),
            buttons: {
                cancel: localize('Cancel'),
                yes: {
                    text: localize("View Plans"),
                    value: "upgrade",
                }
            },
        }).then((value) => {
            switch (value) {
                case "upgrade":
                    document.getElementById("B" + currentId).click();
                    break;
                default:
                    break;
            }
        });
    } else {
        if (signInType !== 'none') {
            window.location.href = "../dashboard?id=" + id;
        } else {
            swal(localize('Sign In'), localize('You must sign in to view the Dashboard.'), 'info');
            viewSignIn(document.getElementById('signInButton'));
        }   
    }
}

var viewAnalytics = function(id, hType) {
    if (hType !== "business") {
        currentId = id;
        swal({
            title: localize("Upgrade Required"),
            icon: "info",
            text: localize("In order to view analytics, you'll need to upgrade your website plan to Leia Business. This can be done for as little as $39.99 per year!"),
            buttons: {
                cancel: 'Cancel',
                yes: {
                    text: localize("View Plans"),
                    value: "upgrade",
                }
            },
        }).then((value) => {
            switch (value) {
                case "upgrade":
                    document.getElementById("B" + currentId).click();
                    break;
                default:
                    break;
            }
        });
    } else {
        window.location.href = "../analytics?id=" + id; 
    }
}

var logInClick = function() {
    document.getElementById('signInSection').style.display = '';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('signInTitle').className = 'inactiveLink';
    document.getElementById('signUpTitle').className = 'activeLink';
}

var signUpClick = function() {
    document.getElementById('signInSection').style.display = 'none';
    document.getElementById('registerSection').style.display = '';
    document.getElementById('signInTitle').className = 'activeLink';
    document.getElementById('signUpTitle').className = 'inactiveLink';
}

var signOut = function() {
    if (signInType === 'facebook') {
        logOutFacebook();
    } else if (auth2.isSignedIn.get()) {
        logOutGoogle();
    } else {
        logUserOut();
    }
}

var logUserOut = function() {
    appendSpinner();
    
    $.ajax({
        url: '../php/signOut.php',
        success: function() {
            window.location.href = "/signIn";
        },
        error: function(err) {
            removeSpinner();
            activeButton.disabled = false;
            activeButton = false;
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var registerUser = function(button) {
    if (activeButton) {
        return;
    }
    
    appendSpinner();
    button.disabled = true;
    activeButton = button;
    $.ajax({
        url: '../php/signUp.php',
        type: 'POST',
        data: {
            'name': document.getElementById('name').value,
            'email': document.getElementById('email').value,
            'confirmEmail': document.getElementById('confirmEmail').value,
            'password': document.getElementById('password').value,
            'confirmPassword': document.getElementById('confirmPassword').value
        },
        success: function(data) {
            if (data === 'success') {
                if (backToMail) {
                    window.location.href = '/mail/register';
                } else {
                    if (!inIframe()) {
                        window.location.href = "/projects";
                    } else {
                        alertAboutSuccessfulSignIn();
                    }
                }
            } else {
                removeSpinner();
                activeButton.disabled = false;
                activeButton = false;
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            activeButton.disabled = false;
            activeButton = false;
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var logUserIn = function(button) {
    if (activeButton) {
        return;
    }
    
    appendSpinner();
    button.disabled = true;
    activeButton = button;
    $.ajax({
        url: '../php/signIn.php',
        type: 'POST',
        data: {'email': document.getElementById('logInEmail').value, 'password': document.getElementById('logInPassword').value},
        success: function(data) {
            if (data === 'success') {
                if (backToMail) {
                    window.location.href = '/mail/register';
                } else {
                    if (!inIframe()) {
                        window.location.href = "/projects";
                    } else {
                        alertAboutSuccessfulSignIn();
                    }
                }
            } else {
                removeSpinner();
                activeButton.disabled = false;
                activeButton = false;
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            activeButton.disabled = false;
            activeButton = false;
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var alertAboutSuccessfulSignIn = function() {
    for (var i = 0; i < document.body.children.length; i++) {
    	if (document.body.children[i].className !== 'swal-overlay swal-overlay--show-modal') {
    		document.body.children[i].style.display = 'none';
        }
    }
    
    var newH = $.parseHTML("<div style='position: fixed;width: 100%;height: 100%;left: 0;top: 0;vertical-align: middle;display: table;padding: 0 20%;'><h2 style='display: table-cell;vertical-align: middle;line-height: 1.4;text-align: center;font-size: 50px;}'>You have successfully created an account to store your website! You may now close this window. Feel free to continue editing, but don\'t forget to save your changes from time to time.</h2></div>")[0];
    document.body.appendChild(newH);
    
    swal(localize('Success!'), localize('You have successfully created an account to store your website! You may now close this window. Feel free to continue editing, but don\'t forget to save your changes from time to time.'), 'success');
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var fbToken;
var logInFacebook = function() {
    /*swal('Temporarily Disabled', "Facebook sign in has been temporarily disabled. If you are signing in for the first time, please use a different method. If you already have an account, please create a new one using another method, then get in touch with us at leia@vybesoftware.com so we can copy your account contents over to it. Sorry for the inconvenience!", 'error');
    return;*/
    
    FB.login(function(response){
        if (response.status === 'connected') {
            appendSpinner();
            fbToken = response.authResponse.accessToken;
            FB.api('/me?fields=email,name', function(response) {
                $.ajax({
                    url: '../php/updateClient.php',
                    type: 'POST',
                    data: {'email': response.email, 'name': response.name, 'type': 'Facebook', 'id': response.id, 'token': fbToken},
                    success: function(data) {
                        if (data === 'success') {
                            if (backToMail) {
                                window.location.href = '/mail/register';
                            } else {
                                if (!inIframe()) {
                                    window.location.href = "/projects";
                                } else {
                                    alertAboutSuccessfulSignIn();
                                }
                            }
                        } else {
                            removeSpinner();
                            activeButton.disabled = false;
                            activeButton = false;
                            swal('Uh Oh!', data, 'error');
                        }
                    },
                    error: function(err) {
                        removeSpinner();
                        activeButton.disabled = false;
                        activeButton = false;
                        swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
                    }
                });
            });
        } else {
            console.log(JSON.stringify(response, undefined, 2));
        }
    }, {scope: 'public_profile,email'});
}

var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '135526911582-n7e61jnb5s3cvttp6r265nsnhg86qk2m.apps.googleusercontent.com',
            cookiepolicy: 'http://heyleia.com'
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
    
        attachSignin(document.getElementById('googleButton'));
    });
};

var attachSignin = function(element) {
    auth2.attachClickHandler(element, {}, function(googleUser) {
        appendSpinner();
        swal('Google Sign In', 'Google sign-in can sometimes take a minute or two - hang tight!', 'info').then(function() {
            document.getElementsByClassName('swal-overlay')[0].style.zIndex = '';
        });
        
        document.getElementsByClassName('swal-overlay')[0].style.zIndex = '100001';
        
        var id = googleUser.Ca;
        
        if (!id) {
            id = googleUser.El;
            
            if (!id) {
                id = googleUser.Ea;
                
                if (!id) {
                    id = googleUser.Da;
                    
                    if (!id) {
                        id = googleUser.Aa;
                    }
                }
            }
        }
        
        if (!id) {
            id = googleUser.ya;
        }
        
        if (!id) {
            id = googleUser.wa;
        }
        
        if (!id) {
            id = googleUser.Ba;
        }
        
        $.ajax({
            url: '../php/updateClient.php',
            type: 'POST',
            data: {'email': googleUser.getBasicProfile().getEmail(), 'name': googleUser.getBasicProfile().getName(), 'type': 'Google', 'id': id, 'token': googleUser.getAuthResponse().id_token},
            success: function(data) {
                if (data === 'success') {
                    if (backToMail) {
                        window.location.href = '/mail/register';
                    } else {
                        if (!inIframe()) {
                            window.location.href = "/projects";
                        } else {
                            alertAboutSuccessfulSignIn();
                        }
                    }
                } else {
                    removeSpinner();
                    activeButton.disabled = false;
                    activeButton = false;
                    swal(localize('Uh Oh!'), data, 'error');
                }
            },
            error: function(err) {
                removeSpinner();
                activeButton.disabled = false;
                activeButton = false;
                swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
            }
        });
    }, function(error) {
        console.log(JSON.stringify(error, undefined, 2));
    });
}

var logOutFacebook = function() {
    appendSpinner();
    FB.logout(function(response) {
       logUserOut();
    });
}

var logOutGoogle = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        logUserOut();
    });
}

var appendSpinner = function() {
    var spinner = document.createElement('div');
    var outer = document.createElement('div');
    
    outer.id = 'spinnerLoading';
    spinner.className = 'spinnerLoading';
    outer.style.background = 'rgba(0,0,0,0.7)';
    outer.style.borderRadius = '20px';
    outer.style.position = 'fixed';
    outer.style.left = ((window.innerWidth - 205) / 2).toString() + 'px';
    outer.style.width = '205px';
    outer.style.top = '30%';
    outer.style.height = '205px';
    outer.style.zIndex = '100000';
    spinner.style.marginLeft = '42.5px';
    spinner.style.marginTop = '42.5px';
    outer.appendChild(spinner);
    document.body.appendChild(outer);
    
    if (!addedSpinner) {
        addedSpinner = true;
        addSpinnerStyle();
    }
}

var removeSpinner = function() {
    document.getElementById('spinnerLoading').parentElement.removeChild(document.getElementById('spinnerLoading'));
}

var addedSpinner = false;
var addSpinnerStyle = function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(".spinnerLoading {border: 16px solid #f3f3f3; /* Light grey */border-top: 16px solid #3498db; /* Blue */border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}"));
    document.body.appendChild(style);
};

var currentNameId;
var makeEditable = function(id, button) {
    currentNameId = id;
    swal({
        icon: 'info',
        title: localize("Rename Site"),
        text: localize('Enter the new name for your site. This is just for your reference.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Site Name"),
                type: "text",
                id: "newSiteInput",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Update"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        }
        
        makeSave(currentNameId, document.getElementById('newSiteInput').value);
    });
}

var makeSave = function(id, name) {
    appendSpinner();
    $.ajax({
        url: '../php/updateName.php',
        type: 'POST',
        data: {'id': id, 'name': name},
        success: function(data) {
            if (data === 'success') {
                removeSpinner();
                swal(localize('Success!'), localize('Your project name has been updated successfully.'), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === 'expired') {
                removeSpinner();
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var deleteProject = function(id) {
    currentId = id;
    swal({
        title: localize("Warning"),
        text: localize("Are you sure you want to delete this website? Note that this will also delete any upgrade you've made to the site. This action can't be undone."),
        icon: 'warning',
        showCancelButton: true,
        buttons: {
                cancel: localize("Cancel"),
                site: {
                    text: localize("Delete"),
                    value: "delete",
                    closeModal: false
                }
            },
        closeOnConfirm: true
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        } else {
            getReasonForDelete(currentId);
        }
    });
}

var getReasonForDelete = function(id) {
    currentNameId = id;
    swal({
        icon: 'info',
        title: localize("Quick Feedback"),
        text: localize('To help us understand how to improve upon the platform for future users, please take a second to tell us the reason(s) why you are deleting this website:'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Reason to delete..."),
                type: "text",
                id: "newSiteInput"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Submit & Delete"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        } else if (document.getElementById('newSiteInput').value === '') {
            swal({
                icon: 'error',
                title: localize("Feedback Required"),
                text: localize("Please let us know why you are deleting the website."),
                buttons: {
                    ok: {
                        text: localize("OK"),
                        value: "OK",
                    }
                },
            }).then((value) => {
                getReasonForDelete(currentNameId);
            });
            
            return;
        }
        
        makeDelete(currentNameId, document.getElementById('newSiteInput').value);
    });
}

var makeDelete = function(id, reason) {
    appendSpinner();
    $.ajax({
        url: '../php/deleteProject.php',
        type: 'POST',
        data: {'id': id, 'reason': reason},
        success: function(data) {
            if (data === 'success') {
                window.location.href = "/projects";
            } else if (data === 'expired') {
                removeSpinner();
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var currentId;
var currentDomain;
var changeDomainName = function(id, current) {
    currentId = id;
    currentDomain = current;
    swal(localize("Would you like to change to a " + sld + " domain (free), or link a custom domain name?"), {
        buttons: {
            cancel: localize("Cancel"),
            site: {
                text: sld,
                value: "site.live",
                closeModal: false
            },
            registrar: {
                text: localize("Custom"),
                value: "registrar",
                closeModal: false
            },
        },
        title: localize("Change Domain"),
	    icon: 'info'
    }).then((value) => {
        switch (value) {
            case "registrar":
                if (signInType === 'none') {
                    swal(localize('Sign In'), localize('You must sign in to choose a custom domain.'), 'info');
                    viewSignIn(document.getElementById('signInButton'));
                    return;
                }
                
                getRegistrar(currentId);
                break;
            case "site.live":
                getSiteLive(currentId, currentDomain);
                break;
            default:
                break;
        }
    });
}

var getRegistrar = function(id) {
    swal({
        title: localize("Custom Domain"),
        icon: 'info',
        text: localize("Do you already own a domain name that you would like to use?"),
        buttons: {
            cancel: localize('Cancel'),
            no: {
                text: localize("No, Search For One"),
                value: "No",
                closeModal: false
            },
            yes: {
                text: localize("Yes, I Have One"),
                value: "Yes",
                closeModal: false
            }
        }
    }).then((value) => {
        switch (value) {
            case "No":
                searchForDomain();
                break;
            case "Yes":
                getCurrentDomain();
                break;
            default:
                break;
        }
    });
}

var searchForDomain = function() {
     swal({
        title: localize("Your Domain"),
        icon: 'info', 
        text: localize('Enter the domain name that you want.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("domain.com"),
                type: "text",
                id: "newSiteInput",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Search"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        }
        
        name = document.getElementById('newSiteInput').value; 
        checkDomainAvailability(currentId, name);
        swal.close();
    });
}

var platformType = 'free';
var domainToBuy;
var checkDomainAvailability = function(id, name) {
    domainToBuy = name;
    appendSpinner();
    $.ajax({
        url: '../php/checkAvailability.php',
        type: 'POST',
        data: {'id': id, 'name': name},
        success: function(message) {
            removeSpinner();
            var data = JSON.parse(message);
            if (data.type === 'taken') {
                swal(localize('Uh Oh!'), localize('That name is already being used by a website we are hosting. Please choose a different one.'), 'error').then(function() {
                    searchForDomain();
                });
            } else if (data.type === 'takenElsewhere') {
                swal(localize('Uh Oh!'), localize('That name is already taken. Please choose a different one.'), 'error').then(function() {
                    searchForDomain();
                });
            } else if (data.type  === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data.type  === 'invalid') {
                swal(localize('Uh Oh!'), localize('That domain name is invalid. Please ensure that you\'ve entered it correctly.'), 'error').then(function() {
                    searchForDomain(); 
                });
            } else if (data.type === 'success') {
                //Show list of available domains
                platformType = data.platformType;
                swal({
                    icon: 'success',
                    title: localize("Available!"),
                    text: localize("You can purchase your domain name \"") + domainToBuy + localize("\" for ") + data.message + localize(" per year. Would you like to buy it?"),
                    buttons: {
                        cancel: localize('Cancel'),
                        yes: {
                            text: localize("Purchase"),
                            value: "purchase",
                            closeModal: false
                        }
                    },
                }).then((value) => {
                    switch (value) {
                        case "purchase":
                            getDomain(domainToBuy)
                            break;
                        default:
                            break;
                    }
                });
            } else {
                swal(localize('Uh Oh!'), data.message, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var getDomain = function(domainName) {
    currentDomain = domainName;
    if (platformType === 'free') {
        swal({
            title: localize("Upgrade Required"),
            icon: 'info',
            text: localize("In order to use a custom domain, you'll need to upgrade your website plan."),
            buttons: {
                cancel: 'Cancel',
                yes: {
                    text: localize("Upgrade"),
                    value: "upgrade"
                }
            },
        }).then((value) => {
            switch (value) {
                case "upgrade":
                    document.getElementById('B' + currentId).click();
                    break;
                default:
                    break;
            }
        });
        
        return;
    } else {
        var formString = '<div>' +
            '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="form-group">' +
                        localize('<label for="cardNumber">CARD HOLDER</label>') +
                        '<div class="input-group">' +
                            localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                            '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                        '</div>' +
                    '</div>' +                   
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="form-group">' +
                        localize('<label for="cardNumber">CARD NUMBER</label>') +
                        '<div class="input-group">' +
                            localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                            '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                        '</div>' +
                    '</div>' +                   
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardExpiry"><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                        localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                    '</div>' +
                '</div>' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardCVC">CVC</label>') +
                        localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                    '</div>' +
                '</div>' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardCVC">ZIP CODE</label>') +
                        localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
        var form = $.parseHTML(formString)[0];
        
        swal({
            icon: 'info',
            title: localize("Purchase Domain"),
            text: localize("Enter your card info to purchase this domain name and add it to your website."),
            buttons: {
                cancel: localize('Cancel'),
                basic: {
                    text: localize("Purchase"),
                    value: "upgrade"
                }
            },
            closeOnClickOutside: false,
            content: form
        }).then((value) => {
            switch (value) {
                case "upgrade":
                    var cardNumber = document.getElementById('cardNumber').value;
                    var exp = document.getElementById('expDate').value;
                    var cvv = document.getElementById('cvc').value;
                    currentPurchaseBillingName = document.getElementById('cardName').value;
                    currentPurchaseZip = document.getElementById('cardZip').value;
                    
                    if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                        swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                            getDomain(currentDomain);
                        });
                        return;
                    } else if (cvv === '' || cardNumber === '') {
                        swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                            getDomain(currentDomain);
                        });
                        return;
                    } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                        exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                    }
                    
                    makeDomainPurchase(currentDomain, cardNumber, exp, cvv);
                    
                    break;
                default:
                    break;
            }
        });
    }
}

var manageBudget = function(id) {
    window.location.href = '/budget?id=' + id;
}

var showHelpInfo = function(icon) {
    var message;
    var title;
    if (icon.id === 'forMonthly') {
        title = 'Monthly Budget';
        message = "This is the total amount you want to spend each month.";
    } else if (icon.id === 'forAdSpend') {
        title = 'Ad Spend';
        message = "Since we keep 10% of the marketing budget, this is always 90% of what you want to spend each month. We will set the budget of the ad campaigns we create to this number, but sometimes Google will spend slightly more or less than the amount we set. We will never charge you any extra, though.";
    } else if (icon.id === 'forRecentPayment') {
        title = 'Recent Payment';
        message = "This is the date of the most recent payment you've made to fund your advertising account with us.";
    } else if (icon.id === 'forNextPayment') {
        title = 'Next Payment';
        message = "This is the date we expect to bill you for the next month's advertising spend. This may be slightly off at times because of changes to how quickly Google spends our budget.";
    }
    
    swal(title, message, 'info');
}

var chosenBudget;
var cNum;
var cName;
var cExp;
var cCvc;
var cZip;
var changeBudget = function() {
    var btnText = "Next";
    if (document.getElementById('changePaymentMethodBtn').style.display === 'none') {
        btnText = "Update Budget";
    }
    
    swal({
        title: "Set Budget",
        icon: 'info',
        text: "Set the amount your would like to spend each month to drive users to your website.",
        content: {
            element: "input",
            attributes: {
                placeholder: "$1000",
                type: "number",
                id: "budgetInput"
            }
        },
        buttons: {
            cancel: "Cancel",
            change: {
                text: btnText,
                value: "next",
                closeModal: false
            }
        }
    }).then((name) => {
        chosenBudget = document.getElementById('budgetInput').value;
        
        if (name === "next") {
            nextBudgetSteps();
        } else {
            swal.close();
        }
    });
}

var nextBudgetSteps = function() {
    if (!(parseInt(chosenBudget) >= 400)) {
        swal({
            title: "Minium Budget",
            icon: 'error',
            text: "In order to ensure you see results, the miniumum monthly budget for advertising is $400.",
            buttons: {
                cancel: "Cancel",
                change: {
                    text: "Ok",
                    value: "next",
                    closeModal: false
                }
            }
        }).then((name) => {
            if (name === "next") {
                changeBudget();
            } else {
                swal.close();
            }
        });
        
        return;
    }
    
    if (document.getElementById('changePaymentMethodBtn').style.display === 'none') {
        var formString = '<div>' +
            '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="form-group">' +
                        localize('<label for="cardNumber">CARD HOLDER</label>') +
                        '<div class="input-group">' +
                            localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                            '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                        '</div>' +
                    '</div>' +                   
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="form-group">' +
                        localize('<label for="cardNumber">CARD NUMBER</label>') +
                        '<div class="input-group">' +
                            localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                            '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                        '</div>' +
                    '</div>' +                   
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardExpiry"><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                        localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                    '</div>' +
                '</div>' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardCVC">CVC</label>') +
                        localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                    '</div>' +
                '</div>' +
                '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                    '<div class="form-group">' +
                        localize('<label for="cardCVC">ZIP CODE</label>') +
                        localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
        var form = $.parseHTML(formString)[0];
        
        swal({
            icon: 'info',
            title: "Payment Mathod",
            text: "Enter your card info to fund the first month of your advertising account with $" + chosenBudget.toString() + ".",
            buttons: {
                cancel: localize('Cancel'),
                basic: {
                    text: localize("Submit"),
                    value: "upgrade"
                }
            },
            content: form
        }).then((value) => {
            switch (value) {
                case "upgrade":
                    cNum = document.getElementById('cardNumber').value;
                    cExp = document.getElementById('expDate').value;
                    cCvc = document.getElementById('cvc').value;
                    cName = document.getElementById('cardName').value;
                    cZip = document.getElementById('cardZip').value;
                    
                    if (cExp.split('/').length !== 2 || cExp.length < 4 || cExp.length > 7) {
                        swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                            nextBudgetSteps();
                        });
                        return;
                    } else if (cCvc === '' || cNum === '') {
                        swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                            nextBudgetSteps();
                        });
                        return;
                    } else if ((cExp.length === 7 || cExp.length === 6) && cExp.split('/').length === 2) {
                        cExp = cExp.split("/")[0] + "/" + cExp.split("/20")[1];
                    }
                    
                    completeBudgetChange(cNum, cName, cExp, cCvc, cZip);
                    
                    break;
                default:
                    break;
            }
        });
    } else {
        submitBudgetChange();   
    }
        
}

var changePaymentMethod = function() {
    //Get card info for a new card
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];

    swal({
        icon: 'info',
        title: "Payment Mathod",
        text: "Enter the card details for your new payment method.",
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Submit"),
                value: "upgrade"
            }
        },
        content: form
    }).then((value) => {
        switch (value) {
            case "upgrade":
                cNum = document.getElementById('cardNumber').value;
                cExp = document.getElementById('expDate').value;
                cCvc = document.getElementById('cvc').value;
                cName = document.getElementById('cardName').value;
                cZip = document.getElementById('cardZip').value;

                if (cExp.split('/').length !== 2 || cExp.length < 4 || cExp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        nextBudgetSteps();
                    });
                    return;
                } else if (cCvc === '' || cNum === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        nextBudgetSteps();
                    });
                    return;
                } else if ((cExp.length === 7 || cExp.length === 6) && cExp.split('/').length === 2) {
                    cExp = cExp.split("/")[0] + "/" + cExp.split("/20")[1];
                }

                submitPaymentMethodChange(cNum, cName, cExp, cCvc, cZip);

                break;
            default:
                break;
        }
    });
}

var viewLeads = function(id) {
    window.location.href = '/leads?id=' + id; 
}

var submitPaymentMethodChange = function(cNum, cName, cExp, cCvc, cZip) {
    //Submit the new card info to the server
    appendSpinner();
    
    $.ajax({
        url: '/php/updatePaymentMethod.php',
        type: 'POST',
        data: {'id': platformId, 'cardNumber': cNum, 'cardExp': cExp, 'cardCvc': cCvc, 'billingName': cName, 'zip': cZip},
        success: function(message) {
            removeSpinner();
            
            if (message === 'success') {
                swal('Success', "Your payment method has been updated!", 'success').then(function() {
                    window.location.reload();
                });
            } else {
                swal('Uh Oh!', message, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal('Uh Oh!', 'There appears to be an issue. Please try again in a few minutes.', 'error');
        }
    });
}

var submitBudgetChange = function() {
    //Submit the new budget amount to the server
    appendSpinner();
    
    $.ajax({
        url: '/php/updateBudget.php',
        type: 'POST',
        data: {'id': platformId, 'budget': chosenBudget},
        success: function(message) {
            removeSpinner();
            
            if (message === 'success') {
                swal('Success', "Your monthly budget has been updated to $" + chosenBudget + "! This will go into effect for next month's spend.", 'success').then(function() {
                    window.location.reload();
                });
            } else {
                swal('Uh Oh!', message, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal('Uh Oh!', 'There appears to be an issue. Please try again in a few minutes.', 'error');
        }
    });
}

var completeBudgetChange = function(cNum, cName, cExp, cCvc, cZip) {
    //Submit the budget and card info to server to be charged
    appendSpinner();
    
    $.ajax({
        url: '/php/createAdAccount.php',
        type: 'POST',
        data: {'id': platformId, 'budget': chosenBudget, 'cardNumber': cNum, 'cardExp': cExp, 'cardCvc': cCvc, 'billingName': cName, 'zip': cZip},
        success: function(message) {
            removeSpinner();
            
            if (message === 'success') {
                swal('Success', "Your adversiting account has been funded! Our team will now get to work on setting up your campaign and will be in touch shortly with next steps.", 'success').then(function() {
                    window.location.reload();
                });
            } else {
                swal('Uh Oh!', message, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal('Uh Oh!', 'There appears to be an issue. Please try again in a few minutes.', 'error');
        }
    });
}

var backToLeads = function() {
    currentLead = '';
    document.getElementById('specificLead').style.display = 'none';
    document.getElementById('topProject').style.display = '';
}

var switchDomains = function() {
    var options = '';
    for (var i = 0; i < domains.length; i++) {
        options += ("<option value='" + domains[i].id + "'>" + domains[i].domain + "</option>");    
    }
    
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    '<div class="input-group">' +
                        '<select style="height: auto" class="form-control" id="domainPicker">' +
                            options
                        '</select>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];

    swal({
        icon: 'info',
        title: "Change Domains",
        text: "View information for one of your other websites.",
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Change"),
                value: "switch"
            }
        },
        content: form
    }).then((value) => {
        switch (value) {
            case "switch":
                var id = $('#domainPicker').val();
                window.location.search = "?id=" + id;
                
                break;
            default:
                break;
        }
    });
}

var currentLead;
var loadLead = function(id) {
    var lead;
    currentLead = id;
    for (var i = 0; i < leads.length; i++) {
        if (leads[i].leadId === id) {
            lead = leads[i];
            break;
        }    
    }
    
    document.getElementById('leadName').value = lead.name;
    document.getElementById('leadEmail').value = lead.email;
    document.getElementById('leadPhone').value = lead.phone;
    document.getElementById('leadPreference').value = lead.preference;
    document.getElementById('leadCategory').value = lead.category;
    document.getElementById('leadStatus').value = lead.status;
    document.getElementById('leadLocation').value = lead.location;
    document.getElementById('leadMessage').value = lead.message.split("<br>").join("\n");
    document.getElementById('leadNotes').value = lead.notes.split("<br>").join("\n");
    document.getElementById('leadSource').value = lead.source;
    document.getElementById('leadSubmitted').value = lead.sentOn;
    document.getElementById('leadSource').setAttribute('disabled', '');
    document.getElementById('leadSubmitted').setAttribute('disabled', '');
    document.getElementById('leadMessage').setAttribute('disabled', '');
    document.getElementById('leadSource').style.cursor = 'not-allowed';
    document.getElementById('leadSubmitted').style.cursor = 'not-allowed';
    document.getElementById('leadMessage').style.cursor = 'not-allowed';
    
    while (document.getElementById('specificEmail').firstChild) {
        document.getElementById('specificEmail').removeChild(document.getElementById('specificEmail').firstChild)
    }
    
    document.getElementById('specificEmail').appendChild(document.createTextNode(lead.email));
    
    document.getElementById('specificLead').style.display = '';
    document.getElementById('topProject').style.display = 'none';
}

var addLead = function() {
    document.getElementById('leadName').value = '';
    document.getElementById('leadEmail').value = '';
    document.getElementById('leadPhone').value = '';
    document.getElementById('leadPreference').value = '';
    document.getElementById('leadCategory').value = '';
    document.getElementById('leadStatus').value = '';
    document.getElementById('leadLocation').value = '';
    document.getElementById('leadMessage').value = '';
    document.getElementById('leadNotes').value = '';
    document.getElementById('leadSource').value = '';
    document.getElementById('leadSubmitted').value = '';
    document.getElementById('leadSource').removeAttribute('disabled');
    document.getElementById('leadSubmitted').removeAttribute('disabled');
    document.getElementById('leadMessage').removeAttribute('disabled');
    document.getElementById('leadSource').style.cursor = 'auto';
    document.getElementById('leadSubmitted').style.cursor = 'auto';
    document.getElementById('leadMessage').style.cursor = 'auto';
    
    while (document.getElementById('specificEmail').firstChild) {
        document.getElementById('specificEmail').removeChild(document.getElementById('specificEmail').firstChild)
    }
    
    document.getElementById('specificEmail').appendChild(document.createTextNode("New Lead"));
    
    document.getElementById('specificLead').style.display = '';
    document.getElementById('topProject').style.display = 'none';
}

var saveLead = function() {
    var lead = {
        name: document.getElementById('leadName').value,
        email: document.getElementById('leadEmail').value,
        phone: document.getElementById('leadPhone').value,
        preference: document.getElementById('leadPreference').value,
        category: document.getElementById('leadCategory').value,
        status: document.getElementById('leadStatus').value,
        location: document.getElementById('leadLocation').value,
        notes: document.getElementById('leadNotes').value.split("\n").join("<br>"),
        platformId: platformId
    };
    
    
    if (currentLead) {
        lead.id = currentLead;
    } else {
        lead.source = document.getElementById('leadSource').value;
        lead.message = document.getElementById('leadMessage').value.split("\n").join("<br>");
    }
    
    appendSpinner();
    
    $.ajax({
        url: '/php/createLead.php',
        type: 'POST',
        data: lead,
        success: function(data) {
            if (data === "success") {
                window.location.reload();
            } else {
                removeSpinner();
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            swal('Uh Oh!', 'There was an error saving this lead. Please try again later.', 'error');
            console.log(err);
            removeSpinner();
        }
    });
}

var postLeadDeletion = function() {
    $.ajax({
        url: '/php/deleteLead.php',
        type: 'POST',
        data: {leadId: currentLead, platformId: platformId},
        success: function(data) {
            if (data === "success") {
                window.location.reload();
            } else {
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            swal('Uh Oh!', 'There was an error deleting this lead. Please try again later.', 'error');
            console.log(err);
        }
    });
    
    currentLead = undefined;
}

var deleteLead = function(id) {
    currentLead = id;
    var message = "Are you sure you want to delete this lead?";
    for (var i = 0; i < leads.length; i++) {
        if (leads[i].leadId === id) {
            message = "Are you sure you want to delete this lead for " + leads[i].email + "?";
            break;
        }
    }
    
    swal({
        title: "Warning",
        text: message,
        icon: 'warning',
        showCancelButton: true,
        buttons: {
                cancel: localize("Cancel"),
                site: {
                    text: localize("Delete"),
                    value: "delete",
                    closeModal: false
                }
            },
        closeOnConfirm: true
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        } else {
            postLeadDeletion();
        }
    });
}

var currentPurchaseBillingName;
var currentPurchaseZip;
var makeDomainPurchase = function(domainName, cardNumber, cardExp, cardCVC) {
    appendSpinner();
    $.ajax({
        url: '../php/purchaseDomain.php',
        type: 'POST',
        data: {'id': currentId, 'name': domainName, 'cardNumber': cardNumber, 'cardExp': cardExp, 'cardCvc': cardCVC, 'billingName': currentPurchaseBillingName, 'zip': currentPurchaseZip},
        success: function(message) {
            removeSpinner();
            var data = JSON.parse(message);
            if (data.type === 'taken') {
                swal(localize('Uh Oh!'), localize('That name is already being used by a website we are hosting. Please choose a different one.'), 'error').then(function() {
                    getCurrentDomain();
                });
            } else if (data.type === 'takenElsewhere') {
                swal(localize('Uh Oh!'), localize('That name is already taken. Please choose a different one.'), 'error').then(function() {
                    getCurrentDomain();
                });
            } else if (data.type  === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data.type  === 'invalid') {
                swal(localize('Uh Oh!'), localize('That domain name is invalid. Please ensure that you\'ve entered it correctly.'), 'error').then(function() {
                    getCurrentDomain(); 
                });
            } else if (data.type === 'success') {
                swal(localize('Success'), localize('Your domain name has been updated successfully! Please allow a few minutes for the change to update on the internet. If your domain is not working after two hours, please contact us.'), 'success').then(function() {
                    window.location.href = "/projects";
                });
            } else {
                swal(localize('Uh Oh!'), data.message, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var upgradeDomainType;
var upgradeType;
var durationType = "annual";
var todayPrice = "";
var gettingType = "";

var chooseMonthlyOrAnnually = function(type) {
    upgradeType = type;
    pickedPaypal = false;
    
    if (document.getElementsByClassName('sidebar-wrapper')[0].getElementsByClassName('nav-link')[1].innerHTML.includes(localize("Sign In"))) {
        swal(localize('Free Account'), localize("Before we complete the upgrade, let's get you signed into an account to store the website. You can do this with one-tap sign-in via Google/Facebook, or by choosing a password."), 'info').then(function() {
            window.location.href = '../signIn';  
        });
        return;
    }
    
    if (currentId !== '') {
        getDurType(upgradeType);
    } else {
        swal(localize('Choose Website'), localize('We\'re going to take you back to the projects page now. To upgrade a website, click on the "Upgrade" button next to it to come back here, then choose your plan!'), 'info').then(function() {
            window.location.href = '/projects'; 
        });
    }
}

var getDurType = function(type) {
    freeDomain = "";
    durationType = "annual";
    startFreeTrial(upgradeType);
}

var freeDomain = "";
var getFreeDomain = function() {
    swal({
        title: localize("Your Free Domain"),
        icon: 'info',
        text: localize('Enter the domain name that you want.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("domain.com"),
                type: "text",
                id: "newSiteInput",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Check Availability"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        }
        
        freeDomain = document.getElementById('newSiteInput').value; 
        checkFreeDomainAvailability();
        swal.close();
    });
}

var checkFreeDomainAvailability = function() {
    appendSpinner();
    $.ajax({
        url: '../php/checkFreeDomain.php',
        type: 'POST',
        data: {'id': currentId, 'name': freeDomain},
        success: function(message) {
            removeSpinner();
            var data = JSON.parse(message);
            if (data.type === 'taken') {
                swal(localize('Uh Oh!'), localize('That name is already being used by a website we are hosting. Please choose a different one.'), 'error').then(function() {
                    getFreeDomain();
                });
            } else if (data.type === 'takenElsewhere') {
                swal(localize('Uh Oh!'), localize('That name is already taken. Please choose a different one.'), 'error').then(function() {
                    getFreeDomain();
                });
            } else if (data.type  === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data.type  === 'invalid') {
                swal(localize('Uh Oh!'), localize('That domain name is invalid. Please ensure that you\'ve entered it correctly.'), 'error').then(function() {
                    getFreeDomain(); 
                });
            } else if (data.type === 'success') {
                swal('Available', 'That domain is available! Leia will apply it to your website when you complete your upgrade.', 'success').then(function() {
                    startFreeTrial(chosenUpgradeType);
                });
            } else {
                swal(localize('Uh Oh!'), data.message, 'error').then(function() {
                    getFreeDomain(); 
                });
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var pickPaypal = function() {
    swal({
        title: localize("Pick Payment Method"),
        icon: 'info',
        text: localize('Do you want to use a card or PayPal to upgrade?'),
        buttons: {
            cancel: localize('Cancel'),
            paypal: {
                text: localize("PayPal"),
                closeModal: true,
                value: 'paypal'
            },
            card: {
                text: localize("Card"),
                closeModal: false,
                value: 'card'
            }
        }
    }).then((value) => {
        switch (value) {
            case "paypal":
                document.getElementById('paypalProSection').style.display = '';
                
                while (document.getElementById('paypal-button-container').firstChild) {
                    document.getElementById('paypal-button-container').removeChild(document.getElementById('paypal-button-container').firstChild);
                }
                
                if (upgradeType === 'business') {
                    paypal.Buttons({
                      style: {
                          shape: 'pill',
                          color: 'gold',
                          layout: 'vertical',
                          label: 'paypal'
                      },
                      createSubscription: function(data, actions) {
                        return actions.subscription.create({
                          'plan_id': 'P-86X6193230915140SLZKGCWI'
                        });
                      },
                      onApprove: function(data, actions) {
                        activateSubscription(data.subscriptionID);
                      }
                  }).render('#paypal-button-container');
                } else {
                    paypal.Buttons({
                      style: {
                          shape: 'pill',
                          color: 'gold',
                          layout: 'vertical',
                          label: 'paypal'
                      },
                      createSubscription: function(data, actions) {
                        return actions.subscription.create({
                          'plan_id': 'P-9RE62331RS885524JLZKGBPQ'
                        });
                      },
                      onApprove: function(data, actions) {
                        activateSubscription(data.subscriptionID);
                      }
                  }).render('#paypal-button-container');
                }
                
                break;
            case "card":
                startFreeTrial(upgradeType);
            default:
                break;
        }
    });
}

var chosenUpgradeType;
var pickedPaypal = false;
var startFreeTrial = function(type) {
    if (type === currentPaymentType && durationType === currentBilling) {
        swal(localize('Nothing To Do'), localize('It appears that you have already upgraded to this plan with the selected duration.'), 'info');
        return;
    } else if (currentPaymentType == type && currentBilling == "annual") {
        swal(localize('Nothing To Do'), localize('You have already paid for a year of this plan, so you can change your billing to monthly once the year is up.'), 'info');
        return;
    } else if (type === "business" && durationType === "annual" && freeDomain === "") {
        chosenUpgradeType = type;
        getFreeDomain();
        return;
    }
    
    var now = new Date();
    var stringDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toString();
    stringDate = stringDate.split(" ")[1] + " " + stringDate.split(" ")[2];
    
    var pPrice = "$6.99";
    if (durationType === "annual") {
        pPrice = "$9.99";
        if (type === "business") {
            pPrice = "$39.99";
        }
    } else if (type === "business") {
        pPrice = "$9.99";
    }
    
    domainToBuy = "none";
    upgradeDomainType = "none";
    upgradeType = type;
    
    if (!pickedPaypal) {
        pickedPaypal = true;
        pickPaypal();
        return;
    }
    
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input style="height: 42px" type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input style="height: 42px" type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                    localize('<input style="height: 42px" type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input style="height: 42px" type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input style="height: 42px" type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];
    
    swal({
        icon: 'info',
        title: localize("Enter Card Details"),
        text: localize("Enter the card details below for your payment of ") + pPrice,
        animation: false,
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Upgrade"),
                value: "upgrade"
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "upgrade":
                var cardNumber = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvv = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;
                
                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        startFreeTrial(upgradeType); 
                    });
                    return;
                } else if (cvv === '' || cardNumber === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        startFreeTrial(upgradeType); 
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }
                
                makeUpgrade(currentId, upgradeType, upgradeDomainType, domainToBuy, cardNumber, exp, cvv);
                break;
            default:
                break;
        }
    });
}

var noPaymentNecessary = function() {
    swal({
        icon: 'info',
        title: localize("Downgrade"),
        text: localize("Based on what you've signed up for thus far, you will not be charged to make this downgrade."),
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Got It"),
                value: "downgrade"
            }
        },
        content: form
    }).then((value) => {
        switch (value) {
            case "downgrade":
                makeUpgrade(currentId, gettingType, "", "", "", "", "");
            default:
                break;
        }
    });
}

var askedAboutEmail = false;
var preferredEmail = "";
var storeId;
var storeHostingType;
var storeDomainNameType;
var storeDomainName;
var storeCardNumber;
var storeCardExp;
var storeCardCVC;
var getUserEmail = function() {
    swal({
        title: localize("Your Email"),
        icon: 'info',
        text: localize('Please provide the best email we can use to reach you if we see any problems!'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Your email..."),
                type: "email",
                id: "instructionsEmail",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            change: {
                text: localize("Submit"),
                closeModal: false
            }
        }
    }).then((name) => {
        preferredEmail = document.getElementById('instructionsEmail').value;
        askedAboutEmail = true;
        
        if (serviceType === "dns") {
            submitServicePayment(storeCardNumber, storeCardExp, storeCardCVC);     
        } else if (serviceType === "ssl") {
            submitSSLPayment(storeCardNumber, storeCardExp, storeCardCVC);  
        } else if (serviceType === "engineer") {
            submitEngineerPayment(storeCardNumber, storeCardExp, storeCardCVC);  
        } else if (currencyOptions[currencyIndex].currency === 'usd') {
            makeUpgrade(storeId, storeHostingType, storeDomainNameType, storeDomainName, storeCardNumber, storeCardExp, storeCardCVC);  
        } else {
            startRaveUpgrade();
        }
        
        swal.close();
    });
}

var currencyIndex = 0;
var currencyOptions = [
    {
        'currency': 'usd',
        'pro': 0.99,
        'business': 3.99,
        'proId': '3989',
        'businessId': '4028'
    },
    {
        'currency': 'gbp',
        'pro': 0.88,
        'business': 3,
        'proId': '4021',
        'businessId': '4042'
    },
    {
        'currency': 'eur',
        'pro': 0.89,
        'business': 3.50,
        'proId': '4043',
        'businessId': '4044'
    },
    {
        'currency': 'ngn',
        'pro': 360,
        'business': 1435,
        'proId': '4025',
        'businessId': '4029'
    },
    {
        'currency': 'ghs',
        'pro': 6,
        'business': 21,
        'proId': '4026',
        'businessId': '4031'
    },
    {
        'currency': 'zar',
        'pro': 16,
        'business': 58,
        'proId': '4027',
        'businessId': '4030'
    },
    {
        'currency': 'kes',
        'pro': 99.99,
        'business': 401.99,
        'proId': '4045',
        'businessId': '4046'
    }
];

var startRaveUpgrade = function() {
    if (!askedAboutEmail) {
        getUserEmail();
        return;
    } else if (preferredEmail === '') {
        swal(localize('Uh Oh!'), localize('Please enter a valid email address.'), 'error').then(function() {
            askedAboutEmail = false;
            getUserEmail();
        });
        
        return;
    }
    
    payWithRave(currencyOptions[currencyIndex]);
}

var getPreferredCurrency = function() {
    var formString = '<select style="height: 40px;" onchange="" id="get-currency-section-field" class="multiselect-ui form-control">';
    for (var i = 0; i < currencyOptions.length; i++) {
        var txt = currencyOptions[i].currency;
        formString += '<option value="' + txt + '">' + txt.toUpperCase() + '</option>';
    }
    
    formString += localize("<option>Other</option></select>");   
    var form = $.parseHTML(formString)[0];
    
    var instructions = localize("Choose your preferred currency:");
    
    swal({
        icon: 'info',
        title: localize("Choose Currency"),
        text: instructions,
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Next"),
                value: "next",
            }
        },
        content: form
    }).then((value) => {
        currencyIndex = document.getElementById('get-currency-section-field').selectedIndex;
        if (currencyIndex === currencyOptions.length) {
            currencyIndex = 0;
        }
        
        switch (value) {
            case "next":
                if (currencyOptions[currencyIndex].currency === 'usd') {
                    startFreeTrial(upgradeType);
                } else {
                    startRaveUpgrade();
                }
                
                break;
            default:
                break;
        }
    });
}

var payWithRave = function(currency) {
    var amt = currency.pro;
    var planId = parseInt(currency.proId);
    if (upgradeType === 'business') {
        amt = currency.business;
        planId = parseInt(currency.businessId);
    }
    
    var x = getpaidSetup({
          PBFPubKey: "FLWPUBK-3d4f09eae84340ceb42a5ac06fce1ab0-X",
          customer_email: preferredEmail,
          amount: amt,
          payment_plan: planId,
          //payment_options: "account,ussd,card,qr,mpesa,mobilemoneyghana",
          payment_method: 'both',
          currency: currency.currency.toUpperCase(),
          txref: randomObjectId(),
          onclose: function() {},
          callback: function(response) {
          document.getElementById('flwpugpaidid').parentElement.removeChild(document.getElementById('flwpugpaidid'));
              if (response.tx.chargeResponseCode =='00' || response.tx.chargeResponseCode == '0') {
                    makeRaveUpgrade(response.tx.txRef);
              } else {
                    swal(localize('Uh Oh!'), localize('There was an error submitting this upgrade. Please try again later.'), 'error');
              }
          }
    });
}

var randomObjectId = function() {
    var newId = "";
    for (var i = 0; i < 40; i++) {
        if (i === 0) {
            letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var newIdx = Math.floor((Math.random() * letters.length) + 0);
            newId = newId + letters.charAt(newIdx);
        } else {
            letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var newIdx = Math.floor((Math.random() * letters.length) + 0);
            newId = newId + letters.charAt(newIdx);
        }
    }
    return newId;
}

var makeRaveUpgrade = function(txRef) {
    appendSpinner();
    $.ajax({
        url: '../php/upgradePlatformRave.php',
        type: 'POST',
        data: {'id': currentId, 'type': upgradeType, 'email': preferredEmail, 'duration': durationType, 'token': txRef, 'currency': currencyOptions[currencyIndex].currency},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                if (upgradeType === 'noBrain' && currentPaymentType === "brain") {
                    swal(localize('Success!'), localize('Your platform has been downgraded successfully.'), 'success').then(function() {
                        window.location.href = "/projects";
                    });
                } else {
                    swal(localize('Success!'), localize('Your platform has been upgraded successfully.'), 'success').then(function() {
                        window.location.href = "/projects?type=domain";
                    });
                }
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === localize("Please ensure that the email you provided is correct, then try again.")) {
                swal('Uh Oh!', message, 'error').then(function() {
                    askedAboutEmail = false;
                    getUserEmail();
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var topFeature = '';
var getTopFeature = function() {
    var formString = '<select style="height: 40px" onchange="" id="html-section-field" class="multiselect-ui form-control"><option default value="none">Choose one</option>';
    var projects = ["No Ads", "Custom Domain Name", "eCommerce", "Booking form", "Editing the HTML", "Blog Comments"];
    
    if (storeHostingType === "business") {
        projects.push("Multiple pages on the site");
        projects.push("Blog posts with their own pages");
        projects.push("Leia Analytics");
    }
    
    for (var i = 0; i < projects.length; i++) {
        formString += '<option value="' + projects[i] + '">' + projects[i] + '</option>';
    }
    
    formString += "</select>";   
    var form = $.parseHTML(formString)[0];

    swal({
        icon: 'info',
        title: localize("Quick Feedback"),
        text: localize("Which feature are you most excited about?"),
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Next"),
                value: "next",
                closeModal: false
            }
        },
        content: form
    }).then((value) => {
        if (value === 'next') {
            topFeature = document.getElementById('html-section-field').options[document.getElementById('html-section-field').selectedIndex].value;
            if (topFeature === "none") {
                getTopFeature();
                return;
            }
            
            makeUpgrade(storeId, storeHostingType, storeDomainNameType, storeDomainName, storeCardNumber, storeCardExp, storeCardCVC);  
        }
    });
}

var makeUpgrade = function(id, hostingType, domainNameType, domainName, cardNumber, cardExp, cardCVC) {
    upgradeDomainType = "none";
    domainName = "none";
    
    if (freeDomain !== '') {
        domainNameType = 'new';
    } else {
        domainNameType = '';
    }
    
    appendSpinner();
    $.ajax({
        url: '../php/upgradePlatformNew.php',
        type: 'POST',
        data: {'id': id, 'type': hostingType, 'domainName': freeDomain, 'domainType': domainNameType, 'cardNumber': cardNumber, 'cardExp': cardExp, 'cardCvc': cardCVC, 'email': preferredEmail, 'duration': durationType, 'name': currentPurchaseBillingName, 'zip': currentPurchaseZip, 'feature': topFeature},
        success: function(data) {
            if (data === 'success') {
                if (upgradeDomainType === "new") {
                    swal(localize('Success!'), localize('Your platform has been upgraded successfully. Please allow a few minutes for the domain name change to appear on the internet. We will also install an SSL certificate on your with within 48 hours.'), 'success').then(function() {
                        window.location.href = "/projects";
                    });
                } else if (upgradeDomainType === "transfer") {
                    removeSpinner();
                    if (signInType === 'none') {
                        swal({
                            icon: 'success',
                            type: 'success',
                            title: localize("Next Steps"),
                            text: localize("You have successfully updated your account and your domain name. In order to make your site appear at the new name, you'll need to point it toward our servers. We can either send you instructions on how to do that, or you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                            buttons: {
                                yes: {
                                    text: localize("Send Instructions"),
                                    value: "manual",
                                },
                                no: {
                                    text: localize("Hire Representative"),
                                    value: "hire",
                                }
                            }
                        }).then((value) => {
                            switch (value) {
                                case "manual":
                                    viewDomainInstructions();
                                    break;
                                case "hire":
                                    //Open instructions to point domain to our server
                                    beginServiceProcess();
                                    break;
                                default:
                                    window.location.href = "/projects";
                                    break;
                            }
                        });
                    } else {
                        removeSpinner();
                        swal(localize('Success!'), localize("You have successfully upgraded your account and updated your domain name. In order for your site to show up at this new name, you'll need to point it toward our servers. We just sent you instructions on how to do that."), 'success').then(function() {
                            swal({
                                icon: 'info',
                                type: 'info',
                                title: localize("Personal Assistance"),
                                text: localize("If you want to follow the instructions on your own, then great! But if you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                                buttons: {
                                    no: {
                                        text: localize("No Thanks"),
                                        value: "cancel",
                                    },
                                    hire: {
                                        text: localize("Hire Representative"),
                                        value: "hire",
                                    }
                                }
                            }).then((value) => {
                                switch (value) {
                                    case "hire":
                                        //Open instructions to point domain to our server
                                        beginServiceProcess();
                                        break;
                                    default:
                                        window.location.href = "/projects";
                                        break;
                                }
                            });
                        });
                    }
                } else {
                    if (upgradeType === 'noBrain' && currentPaymentType === "brain") {
                        swal(localize('Success!'), localize('Your platform has been downgraded successfully.'), 'success').then(function() {
                            window.location.href = "/projects";
                        });
                    } else {
                        swal(localize('Success!'), localize('Your platform has been upgraded successfully.'), 'success').then(function() {
                            window.location.href = "/projects?type=domain";
                        });
                    }
                }
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === localize("Please ensure that the email you provided is correct, then try again.")) {
                removeSpinner();
                swal(localize('Uh Oh!'), message, 'error').then(function() {
                    askedAboutEmail = false;
                    getUserEmail();
                });
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var checkDomainAfterUG = function() {
    swal({
        icon: 'info',
        type: 'info',
        title: localize("Custom Domain"),
        text: localize("Now that you've upgraded your site, you can add a custom domain name to it. Want to search for one?"),
        buttons: {
            cancel: localize('No Thanks'),
            hire: {
                text: localize("Let's Do It"),
                value: "search",
                closeModal: false
            }
        }
    }).then((value) => {
        switch (value) {
            case "search":
                searchForDomain();
                break;
            default:
                break;
        }
    });
}

var getCurrentDomain = function() {
    swal({
        title: localize("Your Domain"),
        text: localize('Enter the domain that you own.'),
        icon: 'info',
        content: {
            element: "input",
            attributes: {
                placeholder: localize("domain.com"),
                type: "text",
                id: "newSiteInput",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Submit"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        }
        
        name = document.getElementById('newSiteInput').value; 
        checkCurrentRegistrar(currentId, name);
        swal.close();
    });
}

var checkCurrentRegistrar = function(id, name) {
    domainToBuy = name;
    currentId = id;
    appendSpinner();
    $.ajax({
        url: '../php/checkRegistrar.php',
        type: 'POST',
        data: {'id': id, 'name': name},
        success: function(data) {
            removeSpinner();
            if (data === 'taken') {
                swal(localize('Uh Oh!'), localize('That name is already being used by a website we are hosting. Please choose a different one.'), 'error').then(function() {
                    getCurrentDomain();
                });
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === 'invalid') {
                swal(localize('Uh Oh!'), localize('That domain name is invalid. Please ensure that you\'ve entered it correctly.'), 'error').then(function() {
                    getCurrentDomain(); 
                });
            } else if (data === 'unregistered') {
                swal({
                    title: localize("Uh Oh!"),
                    text: localize("The domain name \"") + domainToBuy + localize("\" doesn\'t appear to have an owner. Would you like to register it?"),
                    buttons: {
                        cancel: localize('Cancel'),
                        no: {
                            text: localize("Search Again"),
                            value: "search",
                        },
                        yes: {
                            text: localize("Register Domain"),
                            value: "register",
                        }
                    },
                }).then((value) => {
                    switch (value) {
                        case "search":
                            getCurrentDomain();
                            break;
                        case "register":
                            checkDomainAvailability(currentId, domainToBuy);
                            break;
                        default:
                            break;
                    }
                });
            } else if (data === 'needs upgrade') {
                swal({
                    icon: 'info',
                    title: localize("Upgrade Required"),
                    text: localize("In order to use a custom domain, you'll need to upgrade your website plan. This can be done for as little as $9.99 per year!"),
                    buttons: {
                        cancel: localize('Cancel'),
                        yes: {
                            text: localize("View Plans"),
                            value: "upgrade",
                        }
                    },
                }).then((value) => {
                    switch (value) {
                        case "upgrade":
                            document.getElementById("B" + currentId).click();
                            break;
                        default:
                            break;
                    }
                });
            } else {
                if (signInType === 'none') {
                    swal({
                        icon: 'success',
                        type: 'success',
                        title: localize("Next Steps"),
                        text: localize("You have successfully updated your domain name. In order to make your site appear at the new name, you'll need to point it toward our servers. We can either send you instructions on how to do that, or you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                        buttons: {
                            yes: {
                                text: localize("Send Instructions"),
                                value: "manual",
                            },
                            no: {
                                text: localize("Hire Representative"),
                                value: "hire",
                            }
                        }
                    }).then((value) => {
                        switch (value) {
                            case "manual":
                                viewDomainInstructions();
                                break;
                            case "hire":
                                //Open instructions to point domain to our server
                                beginServiceProcess();
                                break;
                            default:
                                window.location.href = "/projects";
                                break;
                        }
                    });
                } else {
                    swal(localize('Success!'), localize("You have successfully updated your your domain name. In order for your site to show up at this new name, you'll need to point it toward our servers. We just sent you instructions on how to do that."), 'success').then(function() {
                        swal({
                            icon: 'info',
                            type: 'info',
                            title: localize("Personal Assistance"),
                            text: localize("If you want to follow the instructions on your own, then great! But if you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                            buttons: {
                                no: {
                                    text: localize("No Thanks"),
                                    value: "cancel",
                                },
                                hire: {
                                    text: localize("Hire Representative"),
                                    value: "hire",
                                }
                            }
                        }).then((value) => {
                            switch (value) {
                                case "hire":
                                    //Open instructions to point domain to our server
                                    beginServiceProcess();
                                    break;
                                default:
                                    window.location.href = "/projects";
                                    break;
                            }
                        });
                    });
                }
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var introduceSSL = function(id, domain) {
    domainToBuy = domain;
    currentId = id;
    
    swal({
        icon: 'info',
        type: 'info',
        title: localize("SSL Encryption"),
        text: localize("SSL is a way to encrypt traffic to your site to ensure that it is secure. All " + sld + " subdomains are automatically encrypted this way, but individual SSL certificates are required for custom domain names. We sell SSL certificates for $9.99 annually, and will install them on your website for free."),
        buttons: {
            cancel: localize('No Thanks'),
            hire: {
                text: localize("Purchase SSL"),
                value: "hire",
                closeModal: false
            }
        }
    }).then((value) => {
        switch (value) {
            case "hire":
                //Open instructions to point domain to our server
                getSSLPayment();
                break;
            default:
                break;
        }
    });
}

var introduceEngineer = function(id, domain) {
    domainToBuy = domain;
    currentId = id;
    
    swal({
        icon: 'info',
        type: 'info',
        title: localize("Dedicated Support"),
        text: localize("We have a team of industry leading developers and SEO specialists standing by to help optimize your website so it ranks hire on Google searches. We can also help you install Google Analytics, make money with ads, set up Live Chat, and other more complex features! You can hire one of us to take care of everything you need 24/7 for just $99.99/month."),
        buttons: {
            cancel: localize('No Thanks'),
            hire: {
                text: localize("Hire Us"),
                value: "hire",
                closeModal: false
            }
        }
    }).then((value) => {
        switch (value) {
            case "hire":
                //Open instructions to point domain to our server
                getEngineerPayment();
                break;
            default:
                break;
        }
    });
}

var getSSLPayment = function() {
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];
    
    swal({
        icon: 'info',
        title: localize("SSL Protection"),
        text: localize("Please enter the card that you would like to use for the first years's payment of $9.99."),
        buttons: {
            cancel: localize('Cancel'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "submit":
                var num = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvc = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;
                
                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        getSSLPayment(); 
                    });
                    return;
                } else if (cvc === '' || num === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        getSSLPayment(); 
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }
                
                submitSSLPayment(num, exp, cvc);
                break;
            default:
                break;
        }
    });
}

var getEngineerPayment = function() {
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];
    
    swal({
        icon: 'info',
        title: localize("Vybe Support Engineer"),
        text: localize("Please enter your card information to hire a dedicated Vybe engineer to help you optimize your website!"),
        buttons: {
            cancel: localize('Cancel'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "submit":
                var num = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvc = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;
                
                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        getEngineerPayment(); 
                    });
                    return;
                } else if (cvc === '' || num === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        getEngineerPayment(); 
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }
                
                submitEngineerPayment(num, exp, cvc);
                break;
            default:
                break;
        }
    });
}

var serviceType;
var submitSSLPayment = function(number, exp, cvc) {
    if (!askedAboutEmail) {
        serviceType = 'ssl';
        storeCardNumber = number;
        storeCardExp = exp;
        storeCardCVC = cvc;
        getUserEmail();
        return;
    } else if (preferredEmail === '') {
        swal(localize('Uh Oh!'), localize('Please enter a valid email address.'), 'error').then(function() {
            askedAboutEmail = false;
            getUserEmail();
        });
        
        return;
    }
    
    appendSpinner();
    $.ajax({
        url: '../php/requestSSL.php',
        type: 'POST',
        data: {'id': currentId, 'name': domainToBuy, 'cardNumber': number, 'cardCvc': cvc, 'cardExp': exp, 'email': preferredEmail, 'billingName': currentPurchaseBillingName, 'zip': currentPurchaseZip},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('Your SSL Certificate has been created! Please allow 48 hours for one of our technical representatives to install it on your website. We will be in touch as soon as that is completed.'), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this request.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var submitEngineerPayment = function(number, exp, cvc) {
    if (!askedAboutEmail) {
        serviceType = 'ssl';
        storeCardNumber = number;
        storeCardExp = exp;
        storeCardCVC = cvc;
        getUserEmail();
        return;
    } else if (preferredEmail === '') {
        swal(localize('Uh Oh!'), localize('Please enter a valid email address.'), 'error').then(function() {
            askedAboutEmail = false;
            getUserEmail();
        });
        
        return;
    }
    
    appendSpinner();
    $.ajax({
        url: '../php/requestEngineer.php',
        type: 'POST',
        data: {'id': currentId, 'name': domainToBuy, 'cardNumber': number, 'cardCvc': cvc, 'cardExp': exp, 'email': preferredEmail, 'billingName': currentPurchaseBillingName, 'zip': currentPurchaseZip},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize("We're so excited to begin working with you! Your dedicated Vybe support engineer with be Alan Houston. Alan will follow up with you via email within the next 48 hours to begin helping you optimize your website!"), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this request.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var introduceService = function(id, domain) {
    domainToBuy = domain;
    currentId = id;
    
    swal({
        icon: 'info',
        type: 'info',
        title: localize("Domain Service"),
        text: localize("When you connect a domain name purchased outside of the Leia app, you need to log into your account with the registrar who you bought the domain name from and point it toward the Leia servers. If you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
        buttons: {
            cancel: localize('No Thanks'),
            hire: {
                text: localize("Hire Representative"),
                value: "hire",
                closeModal: false
            }
        }
    }).then((value) => {
        switch (value) {
            case "hire":
                //Open instructions to point domain to our server
                beginServiceProcess();
                break;
            default:
                break;
        }
    });
}

var currentRegistrar = "";
var registrarUsername = "";
var registrarPassword = "";
var beginServiceProcess = function() {
    swal({
        title: localize("Your Registrar"),
        text: localize('Please enter the name of the company who you bought your domain name from.'),
        icon: 'info',
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Your registrar..."),
                type: "text",
                id: "servicesInput"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Next"),
                value: 'next',
                closeModal: false
            }
        }
    }).then((name) => {
        if (!name) {
            swal.close();
            return;
        }
        
        currentRegistrar = document.getElementById('servicesInput').value;
        swal({
            title: localize("Your Username"),
            icon: 'info',
            text: localize('Please enter the username/email we can use to log into your registrar to make the changes.'),
            content: {
                element: "input",
                attributes: {
                    placeholder: localize("Your username/email..."),
                    type: "email",
                    id: "servicesInput",
                    spellcheck: "false",
                    autocorrect: "off",
                    autocapitalize: "off"
                }
            },
            buttons: {
                cancel: localize('Cancel'),
                change: {
                    text: localize("Next"),
                    value: 'next',
                    closeModal: false
                }
            }
        }).then((name) => {
            if (!name) {
                swal.close();
                return;
            }
            
            registrarUsername = document.getElementById('servicesInput').value;
            swal({
                title: localize("Your Password"),
                icon: 'info',
                text: localize('Please enter the password we can use to log into your registrar to make the changes.'),
                content: {
                    element: "input",
                    attributes: {
                        placeholder: localize("Your password..."),
                        type: "password",
                        id: "servicesInput",
                        spellcheck: "false",
                        autocorrect: "off",
                        autocapitalize: "off"
                    }
                },
                buttons: {
                    cancel: localize('Cancel'),
                    change: {
                        text: localize("Next"),
                        value: 'next',
                        closeModal: false
                    }
                }
            }).then((name) => {
                if (!name) {
                    swal.close();
                    return;
                }
                
                registrarPassword = document.getElementById('servicesInput').value;
                getServicePayment();
            });
        });
    });
}

var getServicePayment = function() {
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];
    
    swal({
        icon: 'info',
        title: localize("Card Info"),
        text: localize("Please enter the card that you would like to use for this payment of $19.99."),
        buttons: {
            cancel: localize('Cancel'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "submit":
                var num = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvc = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;
                
                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        getServicePayment(); 
                    });
                    return;
                } else if (cvc === '' || num === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        getServicePayment(); 
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }
                
                submitServicePayment(num, exp, cvc);
                break;
            default:
                break;
        }
    });
}

var submitServicePayment = function(number, exp, cvc) {
    if (!askedAboutEmail) {
        serviceType = 'dns';
        storeCardNumber = number;
        storeCardExp = exp;
        storeCardCVC = cvc;
        getUserEmail();
        return;
    } else if (preferredEmail === '') {
        swal(localize('Uh Oh!'), localize('Please enter a valid email address.'), 'error').then(function() {
            askedAboutEmail = false;
            getUserEmail();
        });
        
        return;
    }
    
    appendSpinner();
    $.ajax({
        url: '../php/requestDNS.php',
        type: 'POST',
        data: {'id': currentId, 'name': domainToBuy, 'cardNumber': number, 'cardCvc': cvc, 'cardExp': exp, 'cardDigits': '', token: '', 'registrar': currentRegistrar, 'rUser': registrarUsername, 'rPass': registrarPassword, 'email': preferredEmail, 'billingName': currentPurchaseBillingName, 'zip': currentPurchaseZip},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('Your request has been submitted! Once of our technical representatives will attend to this matter and follow up in the next 48 hours.'), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this request.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var viewDomainInstructions = function() {
    swal({
        title: localize("View Instructions"),
        icon: 'info',
        text: localize('Enter the email that we should send the instructions to.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Your email..."),
                type: "email",
                id: "instructionsEmail",
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Change"),
                closeModal: false
            }
        }
    }).then((name) => {
        if (!name) {
            swal.close();
            return;
        }
        
        name = document.getElementById('instructionsEmail').value;
        sendInstructionsRequest(name);
        swal.close();
    });
}

var sendInstructionsRequest = function(email) {
    appendSpinner();
    $.ajax({
        url: '../php/domainInstructions.php',
        type: 'POST',
        data: {'id': currentId, 'email': email},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('We have sent you an email with instructions on how to point your domain toward our servers.'), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === 'email') {
                swal(localize('Uh Oh!'), localize('The email you provided appears to be invalid. Please try entering it again.'), 'error').then(function() {
                    viewDomainInstructions(); 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var submitDatumQuestions = function() {
    appendSpinner();
    
    var radio;
    if (document.getElementById('local').checked) {
        radio = 'Local';
    } else if (document.getElementById('regional').checked) {
        radio = 'Regional';
    } else if (document.getElementById('national').checked) {
        radio = 'National';
    } else if (document.getElementById('zipRadio').checked) {
        radio = 'Zip Code: ';
        if (document.getElementById('datumZip').value.length < 5) {
            swal('Zip', 'Please enter the zip code you want to target.', 'error');
            return;
        } else {
            radio += document.getElementById('datumZip').value;
        }
    } else {
        swal('Area', 'Please select the area you wish to target.', 'error');
        return;
    }
    
    $.ajax({
        url: '/php/submitDatum.php',
        type: 'POST',
        data: {
            'name': document.getElementById('datumName').value,
            'email': document.getElementById('datumEmail').value,
            'phone': document.getElementById('datumPhone').value,
            'what': document.getElementById('datumSelling').value,
            'customer': document.getElementById('datumIdealCustomer').value,
            'target': document.getElementById('datumTargetCustomer').value,
            'howLong': $('#datumAdLength').val(),
            'location': radio
        },
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                document.getElementById('datumOverlayOuter').style.display = 'none';
                swal('Success', "Your information has been submitted successfully! Someone will be reaching out shortly to help you get your campaign set up.", "success");
            } else if (data === 'account') {
                swal('Sign In', "You will need to sign in or create an account in order to access this perk.", "info").then(function() {
                    window.location.href = '../signIn';
                });
            } else {
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var submitSaveDayQuestions = function() {
    appendSpinner();
    
    $.ajax({
        url: '/php/submitSaveDay.php',
        type: 'POST',
        data: {
            'name': document.getElementById('saveDayName').value,
            'email': document.getElementById('saveDayEmail').value,
            'phone': document.getElementById('saveDayPhone').value,
            'payroll': document.getElementById('saveDayTargetCustomer').value,
            'employees': $('#saveDayEmployeeCount').val()
        },
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                document.getElementById('saveDayOverlayOuter').style.display = 'none';
                swal('Success', "Your information has been submitted successfully! Someone will be reaching out shortly to help you get your 401k set up.", "success");
            } else if (data === 'account') {
                swal('Sign In', "You will need to sign in or create an account in order to access this perk.", "info").then(function() {
                    window.location.href = '../signIn';
                });
            } else {
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var initializeLeiaGCUpgrade = function() {
    //Validate the card info, pass info to joinLeiaGC
    let id = $('#lgcPmtID :selected').val();
    let cardHolder = $('#lgcPmtCardHolder').val().trim();
    let cardNumber = $('#lgcPmtNumber').val().trim();
    let expMonth = $('#lgcPmtExpMonth :selected').val();
    let expYear = $('#lgcPmtExpYear :selected').val();
    let cardCVC = $('#lgcPmtCvc').val().trim();
    let cardZip = $('#lgcPmtZip').val().trim();
    if (id === '') {
        swal('Uh oh','Please select a website to join the Leia Growth Club.','error');
    } else if (cardHolder === '') {
        swal('Uh oh','Please enter a valid card holder name.','error');
    } else if (isNaN(cardNumber) || cardNumber.length < 11) {
        swal('Uh oh','Please enter a valid card number.','error');
    } else if (expMonth === '') {
        swal('Uh oh','Please select an expiration month.','error');
    } else if (expYear === '') {
        swal('Uh oh','Please select an expiration year.','error');
    } else if (isNaN(cardCVC) || cardCVC.length < 3) {
        swal('Uh oh','Please enter a valid CVC.','error');
    } else if (cardZip.length < 4) {
        swal('Uh oh','Please enter a valid zip code.','error');
    } else {
        let cardExp = expMonth + '/' + expYear;
        joinLeiaGC(id, cardNumber, cardExp, cardCVC, cardHolder, cardZip);
    }
}

var initializeOneTimeUpgrade = function() {
    //Validate the card info, pass info to joinLeiaGC
    let id = $('#lgcPmtID :selected').val();
    let cardHolder = $('#lgcPmtCardHolder').val().trim();
    let cardNumber = $('#lgcPmtNumber').val().trim();
    let expMonth = $('#lgcPmtExpMonth :selected').val();
    let expYear = $('#lgcPmtExpYear :selected').val();
    let cardCVC = $('#lgcPmtCvc').val().trim();
    let cardZip = $('#lgcPmtZip').val().trim();
    if (id === '') {
        swal('Uh oh','Please select a website to join the Leia Growth Club.','error');
    } else if (cardHolder === '') {
        swal('Uh oh','Please enter a valid card holder name.','error');
    } else if (isNaN(cardNumber) || cardNumber.length < 11) {
        swal('Uh oh','Please enter a valid card number.','error');
    } else if (expMonth === '') {
        swal('Uh oh','Please select an expiration month.','error');
    } else if (expYear === '') {
        swal('Uh oh','Please select an expiration year.','error');
    } else if (isNaN(cardCVC) || cardCVC.length < 3) {
        swal('Uh oh','Please enter a valid CVC.','error');
    } else if (cardZip.length < 4) {
        swal('Uh oh','Please enter a valid zip code.','error');
    } else {
        let cardExp = expMonth + '/' + expYear;
        joinLeiaLifetime(id, cardNumber, cardExp, cardCVC, cardHolder, cardZip);
    }
}

var joinLeiaLifetime = function(id, cardNumber, cardExp, cardCVC, cardHolder, cardZip) {
    appendSpinner();
    
    $.ajax({
        url: '/php/upgradeLeiaLifetime.php',
        type: 'POST',
        data: {'id': id, 'cardNumber': cardNumber, 'cardExp': cardExp, 'cardCvc': cardCVC, 'name': cardHolder, 'zip': cardZip},
        success: function(data) {
            if (data === 'success') {
                swal('Success!', 'Your website has been upgraded successfully.', 'success').then(function() {
                    window.location.href = "/projects?type=domain";
                });
            } else if (data === 'expired') {
                swal('Uh Oh!', 'Your session has expired. Please sign in to make this change.', 'error').then(function() {
                    window.location.href = "/account"; 
                });
            } else if (data === 'deleted') {
                removeSpinner();
                swal('Uh Oh!', 'We couldn\'t find the site you are trying to upgrade. Please refresh the page and try again.', 'error');
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal('Uh Oh!', 'There appears to be an issue. Please try again in a few minutes.', 'error');
        }
    });
}

var joinLeiaGC = function(id, cardNumber, cardExp, cardCVC, cardHolder, cardZip) {
    appendSpinner();
    
    $.ajax({
        url: '/php/upgradeLeiaGC.php',
        type: 'POST',
        data: {'id': id, 'cardNumber': cardNumber, 'cardExp': cardExp, 'cardCvc': cardCVC, 'name': cardHolder, 'zip': cardZip},
        success: function(data) {
            if (data === 'success') {
                swal('Success!', 'Your website has been upgraded successfully.', 'success').then(function() {
                    window.location.href = "/projects?type=domain";
                });
            } else if (data === 'expired') {
                swal('Uh Oh!', 'Your session has expired. Please sign in to make this change.', 'error').then(function() {
                    window.location.href = "/account"; 
                });
            } else if (data === 'deleted') {
                removeSpinner();
                swal('Uh Oh!', 'We couldn\'t find the site you are trying to upgrade. Please refresh the page and try again.', 'error');
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal('Uh Oh!', 'There appears to be an issue. Please try again in a few minutes.', 'error');
        }
    });
}

var sld = 'site.live';

var getSiteLive = function (id, current) {
    swal({
        title: localize("Change Domain"),
        icon: 'info',
        text: localize('Enter the new ' + sld + ' domain for your site.'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("domain." + sld),
                type: "text",
                id: "newSiteInput",
                value: currentDomain.toLowerCase(),
                spellcheck: "false",
                autocorrect: "off",
                autocapitalize: "off",
                autocomplete: "off"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Change")
            }
        }
    }).then((name) => {
        if (!name) {
            swal.close();
            return;
        }
        
        name = document.getElementById('newSiteInput').value;
        if (name.split('.').length !== 3 || name.toLowerCase().indexOf('.' + sld) === -1) {
            swal(localize('Uh Oh!'), localize('Please enter a domain in the form of "domain.' + sld + '".'), 'error').then(function() {
                getSiteLive(currentId, currentDomain);
            });
        } else {
            updateDomainName(currentId, name);
            swal.close();
        }
    });
}

var updateDomainName = function(id, newName) {
    appendSpinner();
    $.ajax({
        url: '../php/updateDomain.php',
        type: 'POST',
        data: {'id': id, 'name': newName.toLowerCase()},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('Your domain name has been updated successfully.'), 'success').then(function() {
                    window.location.href = "/projects"; 
                });
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === 'taken') {
                swal(localize('Uh Oh!'), localize('That name has already been taken. Please try a different one.'), 'error').then(function() {
                    getSiteLive(currentId, currentDomain);
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var explainPlan = function(type) {
    var title = "Brainalytics";
    var message = "This plan offers you all of the same features as the other one, but with the addition of Brainalytics. Brainalytics is the process by which our AI engine constantly makes small tweaks to your site based upon how your visitors are interacting with it. Through Brainalytics, you can rest assured that your site is always up-to-date and looking it's best.";
    if (type === "noBrain") {
        title = "No Brainalytics";
        message = "This plan enables you to use a custom domain name, and it also provides you with preferred access to our human developers if you ever want to hire a real person to edit your site. Additionally, you'll be provided with unlimited bandwidth to ensure that your site is always operating - no matter how much traffic you get. Lastly, if you're a developer, it allows you to add custom HTML, CSS, and Javascript to your site.";
    }
    
    swal({
        title: title,
        icon: 'info',
        text: message
    });
}

var requestDeveloper = function(id) {
    if (signInType === 'none') {
        swal(localize('Sign In'), localize('You must sign in to request a developer.'), 'info');
        viewSignIn(document.getElementById('signInButton'));
        return;
    }
    
    currentId = id;
    swal({
        icon: 'info',
        title: localize("Request a Human"),
        text: localize('If you have a question about something, please describe your needs below. We will get back to you as soon as possible with next steps!'),
        content: {
            element: "textarea",
            attributes: {
                placeholder: localize("Describe the type of help you require..."),
                id: "developerChanges"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Submit"),
                closeModal: false
            }
        }
    }).then((name) => {
        if (!name) {
            swal.close();
            return;
        }
        
        name = document.getElementById('developerChanges').value;
        submitDeveloperRequest(currentId, name);
    });
}

var submitDeveloperRequest = function(id, request) {
    appendSpinner();
    $.ajax({
        url: '../php/requestDeveloper.php',
        type: 'POST',
        data: {'id': id, 'request': request},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('Your request has been submitted successfully. Our team is still pretty small, but we promise to get back to you as soon as possible.'), 'success');
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error').then(function() {
                    requestDeveloper(currentId);
                });
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var currentPaymentId;
var editPayment = function(autoRenew, digits, id) {
    currentPaymentId = id;
    if (autoRenew === "yes") {
        //We are either canceling or changing the card
        var message = localize("Would you like to cancel this renewal or change the card on file? This payment currently uses a card ending in ") + digits + '.';
        
        if (digits === "N/A" || digits === "") {
            swal({
                icon: 'info',
                title: localize("Edit Payment"),
                text: localize("Would you like to cancel this renewal? Your website will remain upgraded until the end of the period that has already been paid for."),
                buttons: {
                    cancel: localize('Exit'),
                    cRenewal: {
                        text: localize("Cancel Renewal"),
                        value: "cRenewal",
                        closeModal: false
                    }
                },
            }).then((value) => {
                switch (value) {
                    case "cRenewal":
                        getReasonForCancel();
                        break;
                    default:
                        break;
                }
            });
        } else {
            swal({
                icon: 'info',
                title: localize("Edit Payment"),
                text: message,
                buttons: {
                    cancel: localize('Exit'),
                    cRenewal: {
                        text: localize("Cancel Renewal"),
                        value: "cRenewal",
                        closeModal: false
                    },
                    yes: {
                        text: localize("Change Card"),
                        value: "card",
                        closeModal: false
                    }
                },
            }).then((value) => {
                switch (value) {
                    case "card":
                        changeCard();
                        break;
                    case "cRenewal":
                        getReasonForCancel();
                        break;
                    default:
                        break;
                }
            });
        }
    } else {
        //We are either autorenewing or changing the card
        var message = localize("Would you like to have this product autorenew on the expiration date or change the card on file? This payment currently uses a card ending in ") + digits + '.';
        
        if (digits === "N/A" || digits === "") {
            swal({
                icon: 'info',
                title: localize("Edit Payment"),
                text: localize("Would you like to have this product autorenew on the expiration date?"),
                buttons: {
                    cancel: localize('Exit'),
                    cRenewal: {
                        text: localize("Add Autorenew"),
                        value: "autoRenew",
                        closeModal: false
                    }
                },
            }).then((value) => {
                switch (value) {
                    case "autoRenew":
                        postRenew();
                        break;
                    default:
                        break;
                }
            });
        } else {
            swal({
                icon: 'info',
                title: localize("Edit Payment"),
                text: message,
                buttons: {
                    cancel: localize('Exit'),
                    cRenewal: {
                        text: localize("Add Autorenew"),
                        value: "autoRenew",
                        closeModal: false
                    },
                    yes: {
                        text: localize("Change Card"),
                        value: "card",
                        closeModal: false
                    }
                },
            }).then((value) => {
                switch (value) {
                    case "card":
                        changeCard();
                        break;
                    case "autoRenew":
                        postRenew();
                        break;
                    default:
                        break;
                }
            });
        }
    }
}

var changeCard = function() {
    //Prompt user to enter a new card
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">' +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>') +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="hidden-xs">EXP.</span><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];
    
    swal({
        icon: 'info',
        title: localize("Change Card"),
        text: localize("Please enter the card that you would like to use for future payments on this product."),
        buttons: {
            cancel: localize('Cancel'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "submit":
                var num = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvc = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;
                
                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        changeCard(); 
                    });
                    return;
                } else if (cvc === '' || num === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        changeCard(); 
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }
                
                updateCard(num, exp, cvc);
                break;
            default:
                break;
        }
    });
}

var getReasonForCancel = function(id) {
    swal({
        title: localize("Quick Feedback"),
        icon: 'info',
        text: localize('To help us understand how to improve upon the platform for future users, please take a second to tell us the reason(s) why you are canceling this renewal:'),
        content: {
            element: "input",
            attributes: {
                placeholder: localize("Reason to cancel..."),
                type: "text",
                id: "newSiteInput"
            }
        },
        buttons: {
            cancel: localize('Cancel'),
            change: {
                text: localize("Submit & Cancel"),
                closeModal: false
            }
        }
    }).then(name => {
        if (!name) {
            swal.close();
            return;
        } else if (document.getElementById('newSiteInput').value === '') {
            swal({
                icon: 'warning',
                title: localize("Feedback Required"),
                text: localize("Please let us know why you are canceling the renewal."),
                buttons: {
                    ok: {
                        text: localize("OK"),
                        value: "OK",
                        closeModal: false
                    }
                }
            }).then((value) => {
                getReasonForCancel();
            });
            
            return;
        }
        
        postCancel(document.getElementById('newSiteInput').value);
    });
}

var postCancel = function(reason) {
    appendSpinner();
    $.ajax({
        url: '../php/cancelRenewal.php',
        type: 'POST',
        data: {'id': currentPaymentId, 'reason': reason},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('This product will NOT automatically renew on it\'s expiration date.'), 'success').then(function() {
                    window.location.href = "/account"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var postRenew = function() {
    appendSpinner();
    $.ajax({
        url: '../php/addRenewal.php',
        type: 'POST',
        data: {'id': currentPaymentId},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('This product will now automatically renew on it\'s expiration date.'), 'success').then(function() {
                    window.location.href = "/account"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var updateCard = function(number, exp, cvv) {
    appendSpinner();
    $.ajax({
        url: '../php/updateCard.php',
        type: 'POST',
        data: {'id': currentPaymentId, 'number': number, 'cvv': cvv, 'exp': exp, 'name': currentPurchaseBillingName, 'zip': currentPurchaseZip},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('The payment method for this product has been updated.'), 'success').then(function() {
                    window.location.href = "/account"; 
                });
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var changeType;
var editUser = function(type) {
    changeType = type;
    var message = localize('Please enter the new name for your account.');
    var inputType = 'text';
    
    if (changeType === 'email') {
        message = localize('Please enter the new email for your account.');
        inputType = 'email';
    } else if (changeType === 'password') {
        forgotPassword();
        return;
    }
    
    swal({
        icon: 'info',
        title: localize("Update Info"),
        text: message,
        buttons: {
            cancel: localize('Exit'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        content: {
            element: "input",
            attributes: {
                type: inputType,
                id: "newInfo"
            }
        },
    }).then((value) => {
        switch (value) {
            case "submit":
                postUserUpdate(document.getElementById('newInfo').value);
                break;
            default:
                break;
        }
    });
}

var postUserUpdate = function(newVal) {
    appendSpinner();
    $.ajax({
        url: '../php/updateUser.php',
        type: 'POST',
        data: {'type': changeType, 'value': newVal},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                if (changeType === 'email') {
                    swal(localize('Verification'), localize('Please use the link in the email we just sent you to confirm your new email address'), 'info');
                } else {
                    swal(localize('Success!'), localize('Your account information has been updated.'), 'success').then(function() {
                        window.location.href = "/account"; 
                    });
                }
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var localize = function(s) {
    return s;
}

var forgotPassword = function() {
    swal({
        icon: 'info',
        type: 'info',
        title: localize("Reset Password"),
        text: localize('Enter your email, and we\'ll send you a link to reset your password.'),
        buttons: {
            cancel: localize('Exit'),
            submit: {
                text: localize("Submit"),
                value: "submit",
            }
        },
        content: {
            element: "input",
            attributes: {
                type: "email",
                id: "renewalEmail"
            }
        },
    }).then((value) => {
        switch (value) {
            case "submit":
                passwordChange(document.getElementById('renewalEmail').value);
                break;
            default:
                break;
        }
    });
}

var passwordChange = function(email) {
    appendSpinner();
    $.ajax({
        url: '../php/forgotPassword.php',
        type: 'POST',
        data: {'email': email},
        success: function(data) {
            removeSpinner();
            if (data === 'success') {
                swal(localize('Success!'), localize('We have just sent you an email with a link to reset your password.'), 'success');
            } else if (data === "expired") {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else {
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var tempPrice = 0;
var getQuotePrice = function() {
    if (inQuoteCall) {
        return;
    } 
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var description = document.getElementById('briefDescription').value;
    var hasExisting = (document.getElementById('existingWebsiteYes').style.display !== 'none');
    var existingUrl = document.getElementById('currentURL').value;
    var hasECommerce = (document.getElementById('eCommerceYes').style.display !== 'none');
    var hasBooking = (document.getElementById('bookingYes').style.display !== 'none');
    var hasLogIn = (document.getElementById('accountsYes').style.display !== 'none');
    var accountDescription = document.getElementById('accountDescription').value;
    var hasUpload = (document.getElementById('filesYes').style.display !== 'none');
    var hasMobile = (document.getElementById('mobileYes').style.display !== 'none');
    var hasUpdates = (document.getElementById('updatesYes').style.display !== 'none');
    var hasSocial = (document.getElementById('socialYes').style.display !== 'none');
    //var hasLead = (document.getElementById('leadYes').style.display !== 'none');
    //var budget = document.getElementById('budgetChoice').options[document.getElementById('budgetChoice').selectedIndex].innerHTML;
    var country = document.getElementById('userCountry').options[document.getElementById('userCountry').selectedIndex].innerHTML;
    
    if (name.length < 1) {
        swal(localize('Uh Oh!'), localize('Please provide your full name or the name of your company.'), 'error');
        inQuoteCall = false;
        return;
    } else if (!validateEmail(email)) {
        swal(localize('Uh Oh!'), localize('The email address you have provided is invalid. Please ensure you have entered it correctly.'), 'error');
        inQuoteCall = false;
        return;
    } else if (description.length < 20) {
        swal(localize('Uh Oh!'), localize('Please be a bit more descriptive about the website you need.'), 'error');
        inQuoteCall = false;
        return;
    } else if (hasExisting && existingUrl.length < 5) {
        swal(localize('Uh Oh!'), localize('You have indicated that you have an existing website but have not provided a link to it.'), 'error');
        inQuoteCall = false;
        return;
    } else if (hasLogIn && accountDescription.length < 20) {
        swal(localize('Uh Oh!'), localize('Please be a bit more descriptive about the functionality needed for the user accounts.'), 'error');
        inQuoteCall = false;
        return;
    }/* else if (budget === 'Choose a range') {
        swal(localize('Uh Oh!'), localize('Please select your budget for this project. Note that there may also be ongoing fees for maintenance and hosting.'), 'error');
        inQuoteCall = false;
        return;
    }*/ else if (country === 'Choose country') {
        swal(localize('Uh Oh!'), localize('Please select the country where you do business.'), 'error');
        inQuoteCall = false;
        return;
    }
    
    appendSpinner();
    
    var rand = Math.random(3, 5);
    setTimeout(function() {
        removeSpinner();
        
        var price = 500;
        if (document.getElementById('eCommerceYes').style.display !== 'none') {
            price += 500;
        }
        
        if (document.getElementById('bookingYes').style.display !== 'none') {
            price += 500;
        }
        
        if (document.getElementById('accountsYes').style.display !== 'none') {
            price += 1000;
        }
        
        if (document.getElementById('filesYes').style.display !== 'none') {
            price += 500;
        }
        
        if (document.getElementById('mobileSection').style.display !== 'none' && document.getElementById('appType').selectedIndex === 0) {
            swal('Choose App Type', 'Please select which type of mobile app you need for your project', 'error');
            return;
        } else if (document.getElementById('appType').selectedIndex === 1 || document.getElementById('appType').selectedIndex === 2) {
            price *= 2;    
        } else if (document.getElementById('appType').selectedIndex === 3) {
            price *= 3;
        }
        
        if (price.toString().length === 4) {
            price = price.toString().substring(0, 1) + ',' + price.toString().substring(1, 4);
        }
        
        swal({
            icon: 'success',
            title: localize("We Can Do That!"),
            text: 'Based on the information you\'ve provided, our quote to build this for you is $' + price.toString() + '.00. We will, however, get in touch with you to verify a few things before beginning work.',
            buttons: {
                cancel: localize('Cancel'),
                submit: {
                    text: localize("Submit"),
                    value: "submit",
                }
            }
        }).then((value) => {
            switch (value) {
                case "submit":
                    submitQuote('', '', '', '', '');
                    break;
                default:
                    break;
            }
        });
    }, rand * 1000);
}

var getQuotePayment = function() {
    var formString = '<div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD HOLDER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-user"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-xs-12">' +
                '<div class="form-group">' +
                    localize('<label for="cardNumber">CARD NUMBER</label>') +
                    '<div class="input-group">' +
                        localize('<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">') +
                        '<span class="input-group-addon"><i class="fa fa-credit-card"></i></span>' +
                    '</div>' +
                '</div>' +                   
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardExpiry"><span class="visible-xs-inline">EXP.</span> DATE</label>') +
                    localize('<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">CVC</label>') +
                    localize('<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">') +
                '</div>' +
            '</div>' +
            '<div style="width: 33%" class="col-xs-4 col-md-4">' +
                '<div class="form-group">' +
                    localize('<label for="cardCVC">ZIP CODE</label>') +
                    localize('<input type="text" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">') +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
    var form = $.parseHTML(formString)[0];

    swal({
        icon: 'info',
        title: localize("1% Desposit"),
        text: localize("Enter your card info to reserve this quote for $" + tempPrice + '.00. Once submitted, we\'ll reach out with a game plan.'),
        buttons: {
            cancel: localize('Cancel'),
            basic: {
                text: localize("Submit"),
                value: "upgrade",
            }
        },
        closeOnClickOutside: false,
        content: form
    }).then((value) => {
        switch (value) {
            case "upgrade":
                var cardNumber = document.getElementById('cardNumber').value;
                var exp = document.getElementById('expDate').value;
                var cvv = document.getElementById('cvc').value;
                currentPurchaseBillingName = document.getElementById('cardName').value;
                currentPurchaseZip = document.getElementById('cardZip').value;

                if (exp.split('/').length !== 2 || exp.length < 4 || exp.length > 7) {
                    swal(localize('Uh Oh!'), localize('Make sure the expiration date on your card is entered in the form MM/YY.'), 'error').then(function() {
                        getQuotePayment();
                    });
                    return;
                } else if (cvv === '' || cardNumber === '') {
                    swal(localize('Uh Oh!'), localize('Please fill out all fields.'), 'error').then(function() {
                        getQuotePayment();
                    });
                    return;
                } else if ((exp.length === 7 || exp.length === 6) && exp.split('/').length === 2) {
                    exp = exp.split("/")[0] + "/" + exp.split("/20")[1];
                }

                submitQuote(cardNumber, exp, cvv, currentPurchaseBillingName, currentPurchaseZip);

                break;
            default:
                break;
        }
    });
}

var inQuoteCall = false;
var submitQuote = function(cardNumber, expDate, cvv, cardName, zip) {
    inQuoteCall = true;    
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var description = document.getElementById('briefDescription').value;
    var hasExisting = (document.getElementById('existingWebsiteYes').style.display !== 'none');
    var existingUrl = document.getElementById('currentURL').value;
    var hasECommerce = (document.getElementById('eCommerceYes').style.display !== 'none');
    var hasBooking = (document.getElementById('bookingYes').style.display !== 'none');
    var hasLogIn = (document.getElementById('accountsYes').style.display !== 'none');
    var accountDescription = document.getElementById('accountDescription').value;
    var hasUpload = (document.getElementById('filesYes').style.display !== 'none');
    var hasMobile = (document.getElementById('mobileYes').style.display !== 'none');
    var hasUpdates = (document.getElementById('updatesYes').style.display !== 'none');
    var hasSocial = (document.getElementById('socialYes').style.display !== 'none');
    //var hasLead = (document.getElementById('leadYes').style.display !== 'none');
    //var budget = document.getElementById('budgetChoice').options[document.getElementById('budgetChoice').selectedIndex].innerHTML;
    var country = document.getElementById('userCountry').options[document.getElementById('userCountry').selectedIndex].innerHTML;
    var mobileType = document.getElementById('appType').options[document.getElementById('appType').selectedIndex].innerHTML;
    
    if (name.length < 1) {
        swal(localize('Uh Oh!'), localize('Please provide your full name or the name of your company.'), 'error');
        inQuoteCall = false;
        return;
    } else if (!validateEmail(email)) {
        swal(localize('Uh Oh!'), localize('The email address you have provided is invalid. Please ensure you have entered it correctly.'), 'error');
        inQuoteCall = false;
        return;
    } else if (description.length < 20) {
        swal(localize('Uh Oh!'), localize('Please be a bit more descriptive about the website you need.'), 'error');
        inQuoteCall = false;
        return;
    } else if (hasExisting && existingUrl.length < 5) {
        swal(localize('Uh Oh!'), localize('You have indicated that you have an existing website but have not provided a link to it.'), 'error');
        inQuoteCall = false;
        return;
    } else if (hasLogIn && accountDescription.length < 20) {
        swal(localize('Uh Oh!'), localize('Please be a bit more descriptive about the functionality needed for the user accounts.'), 'error');
        inQuoteCall = false;
        return;
    }/* else if (budget === 'Choose a range') {
        swal(localize('Uh Oh!'), localize('Please select your budget for this project. Note that there may also be ongoing fees for maintenance and hosting.'), 'error');
        inQuoteCall = false;
        return;
    }*/ else if (country === 'Choose country') {
        swal(localize('Uh Oh!'), localize('Please select the country where you do business.'), 'error');
        inQuoteCall = false;
        return;
    }
    
    appendSpinner();
    $.ajax({
        url: '../php/purchaseQuote.php',
        type: 'POST',
        data: {
            'name': name,
            'email': email,
            //'budget': budget,
            'country': country,
            'description': description,
            'hasExisting': hasExisting,
            'existingURL': existingUrl,
            'hasECommerce': hasECommerce,
            'hasBooking': hasBooking,
            'hasLogIn': hasLogIn,
            'accountDescription': accountDescription,
            'hasUpload': hasUpload,
            'hasMobile': hasMobile,
            'mobileType': mobileType,
            'hasUpdates': hasUpdates,
            'hasSocial': hasSocial,
            //'hasLead': hasLead,
            'cardNumber': cardNumber,
            'cardName': cardName,
            'expDate': expDate,
            'cvv': cvv,
            'zip': zip
        },
        success: function(data) {
            removeSpinner();
            inQuoteCall = false;
            
            if (data === 'success') {
                swal(localize('Success!'), localize('Your request has been submitted successfully! A member of our team will be in touch within 2 business days with a game plan to begin working on your project.'), 'success');
            } else {
                swal('Uh Oh!', data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            inQuoteCall = false;
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}

var postToFacebook = function(domain) {
    FB.ui({
        method: 'share',
        href: 'https://heyleia.com',
        quote: localize('Just built my website using the Leia A.I. website builder! Check it out at ') + domain.toLowerCase(),
        hastag: '#leiawebsitebuilder'
    }, function(response){
        $.ajax({
            url: '../php/setShare.php',
            type: 'POST',
            data: {domain: domain},
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        })
    });
}

var closePaypal = function(id) {
    document.getElementById(id).style.display = 'none';
}

var activateSubscription = function(subscriptionId) {
    appendSpinner();
    
    upgradeDomainType = "none";
    domainName = "none";
    
    if (freeDomain !== '') {
        domainNameType = 'new';
    } else {
        domainNameType = '';
    }
    
    $.ajax({
        url: '../php/upgradePaypal.php',
        type: 'POST',
        data: {'id': currentId, 'type': upgradeType, 'domainName': freeDomain, 'domainType': domainNameType, 'duration': 'annual', 'subscriptionId': subscriptionId},
        success: function(data) {
            if (data === 'success') {
                closePaypal("paypalProSection");
                
                if (upgradeDomainType === "new") {
                    swal(localize('Success!'), localize('Your platform has been upgraded successfully. Please allow a few minutes for the domain name change to appear on the internet. We will also install an SSL certificate on your with within 48 hours.'), 'success').then(function() {
                        window.location.href = "/projects";
                    });
                } else if (upgradeDomainType === "transfer") {
                    removeSpinner();
                    if (signInType === 'none') {
                        swal({
                            icon: 'success',
                            type: 'success',
                            title: localize("Next Steps"),
                            text: localize("You have successfully updated your account and your domain name. In order to make your site appear at the new name, you'll need to point it toward our servers. We can either send you instructions on how to do that, or you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                            buttons: {
                                yes: {
                                    text: localize("Send Instructions"),
                                    value: "manual",
                                },
                                no: {
                                    text: localize("Hire Representative"),
                                    value: "hire",
                                }
                            }
                        }).then((value) => {
                            switch (value) {
                                case "manual":
                                    viewDomainInstructions();
                                    break;
                                case "hire":
                                    //Open instructions to point domain to our server
                                    beginServiceProcess();
                                    break;
                                default:
                                    window.location.href = "/projects";
                                    break;
                            }
                        });
                    } else {
                        removeSpinner();
                        swal(localize('Success!'), localize("You have successfully upgraded your account and updated your domain name. In order for your site to show up at this new name, you'll need to point it toward our servers. We just sent you instructions on how to do that."), 'success').then(function() {
                            swal({
                                icon: 'info',
                                type: 'info',
                                title: localize("Personal Assistance"),
                                text: localize("If you want to follow the instructions on your own, then great! But if you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99."),
                                buttons: {
                                    no: {
                                        text: localize("No Thanks"),
                                        value: "cancel",
                                    },
                                    hire: {
                                        text: localize("Hire Representative"),
                                        value: "hire",
                                    }
                                }
                            }).then((value) => {
                                switch (value) {
                                    case "hire":
                                        //Open instructions to point domain to our server
                                        beginServiceProcess();
                                        break;
                                    default:
                                        window.location.href = "/projects";
                                        break;
                                }
                            });
                        });
                    }
                } else {
                    if (upgradeType === 'noBrain' && currentPaymentType === "brain") {
                        swal(localize('Success!'), localize('Your platform has been downgraded successfully.'), 'success').then(function() {
                            window.location.href = "/projects";
                        });
                    } else {
                        swal(localize('Success!'), localize('Your platform has been upgraded successfully.'), 'success').then(function() {
                            window.location.href = "/projects?type=domain";
                        });
                    }
                }
            } else if (data === 'expired') {
                swal(localize('Uh Oh!'), localize('Your session has expired. Please sign in to make this change.'), 'error').then(function() {
                    window.location.href = "/signIn"; 
                });
            } else if (data === localize("Please ensure that the email you provided is correct, then try again.")) {
                removeSpinner();
                swal(localize('Uh Oh!'), message, 'error').then(function() {
                    askedAboutEmail = false;
                    getUserEmail();
                });
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), data, 'error');
            }
        },
        error: function(err) {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('There appears to be an issue. Please try again in a few minutes.'), 'error');
        }
    });
}