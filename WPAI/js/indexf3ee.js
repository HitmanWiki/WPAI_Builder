var opacity = 0;
var questionIndex = 0;
var indicies = [];
var lastIndex = 0;
var userTotal = 0;
var oldProjectX = 0;
var platformId = '';
var config = null;
var answer = {
    'name': '',
    'domain': '',
    'slogan': '',
    'email': '',
    'features': [],
    'hasStore': 'no',
    'logo': '',
    'photos': [],
    'colors': [],
    'search': '',
    'phrase': '',
    'phone': '',
    'keywords': '',
    'designType': 'neutral',
    'teamSocial': true,
    'contactForm': true,
    'aboutImage': true,
    'testimonialImage': true,
    'numFeatures': 6,
    'numTestimonials': 3,
    'numGalleryImages': 6,
    'numTeamMembers': 4,
    'contactFormItems': ['name', 'email', 'subject', 'message'],
    'captcha': '',
    'answeredFirst': true,
    'answeredSecond': true,
    'device': 'web'
}

$(document).ready(function() {
    if (skipFirst) {
        document.getElementsByClassName('question')[0].parentElement.removeChild(document.getElementsByClassName('question')[0]);
        document.getElementsByClassName('question')[0].parentElement.removeChild(document.getElementsByClassName('question')[0]);
        document.getElementsByClassName('question')[0].parentElement.removeChild(document.getElementsByClassName('question')[0]);
    } 
    
    var top = 0;//document.getElementById('top-bar').offsetHeight;
    $('.question').each(function(idx) {
        $('.question')[idx].id = 'question' + idx.toString(); 
    });
    
    $('#questions-box').css('top', top.toString() + 'px');
    $('#questions-box').css('height', (window.innerHeight - top).toString() + 'px');
    $('#signUpBox').css('height', (window.innerHeight - top).toString() + 'px');
    $('#account-box').css('height', (window.innerHeight - top).toString() + 'px');
    $('#logInDesign').css('top', top.toString() + 'px');
    $('#logInDesign').css('height', (window.innerHeight - top).toString() + 'px');
    
    $('#question0').css('opacity', '0');
    $('#question0').css('display', 'table-cell');
    
    /*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && document.getElementById('pressType')) {
        var pressText = document.createTextNode('press');
        document.getElementById('pressType').removeChild(document.getElementById('pressType').firstChild);
        document.getElementById('pressType').appendChild(pressText);
    }*/
    
    jQuery("#talkIcon").on("touchstart", function() {
        beginRecording();
    });
    
    jQuery("#talkIcon").on("touchend", function() {
        endRecording();
    });
    
    var show = setInterval(function() {
        if (opacity >= 1) {
            clearInterval(show);
        } else {
            opacity += 0.05;
            $('#question0').css('opacity', opacity.toString());
        }
    }, 50);
    
    $('#logoFile').change(function(evt) {
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        answer.logo = "";
        
        if (files && files.length == 0) {
            this.parentElement.removeChild(this.parentElement.firstChild);
            this.parentElement.insertBefore(document.createTextNode('Browse'), this);
            return;
        } else {
            this.parentElement.removeChild(this.parentElement.firstChild);
            this.parentElement.insertBefore(document.createTextNode('Chosen'), this);
        }
        
        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                answer.logo = fr.result;
            };
            fr.readAsDataURL(files[0]);
        } else {
            swal(localize("Uh Oh!"), localize("There was an error. Your browser doesn't seem to support this function."), "error");
        }
    });
    
    $('#photoFile').change(function(evt) {
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        answer.photos = [];
        
        if (files && files.length == 0) {
            this.parentElement.removeChild(this.parentElement.firstChild);
            this.parentElement.insertBefore(document.createTextNode(localize('Browse')), this);
            return;
        } else {
            this.parentElement.removeChild(this.parentElement.firstChild);
            this.parentElement.insertBefore(document.createTextNode(files.length.toString() + localize(' Chosen')), this);
        }
        
        for (var i = 0; i < files.length; i++) {
            // FileReader support
            (function(file) {
                if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    fr.onload = function () {
                        answer.photos.push(fr.result);
                    };
                    fr.readAsDataURL(file);
                } else {
                    swal(localize("Uh Oh!"), localize("There was an error. Your browser doesn't seem to support this function."), "error");
                    return;
                }
            })(files[i]);
        }
    });
    
    /*var apple = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'iPhone', 'iPad', 'iPod'];
    if (apple.indexOf(window.navigator.platform) === -1) {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode("body, #upgrade-box{font-family:'Heebo' !important;} .checkbox{font-family:'Heebo' !important;} .lead, .swal-text, .swal-button, .swal-title, #termsContainer, #closeSlider, .btn-primary.outline, .textInstructions, #instructionsBox p, input, textarea, #sideSection textarea, .lockGrid p{font-weight: bold !important;} textarea{font-family:'Heebo' !important;} #questions-box {font-family:'Heebo' !important;} #signUpBox {font-family:'Heebo' !important;} #account-box {font-family:'Heebo' !important;} #logInDesign{font-family:'Heebo' !important;}"));
        document.body.appendChild(style);
    }*/
});

$(function() {
    $('.multiselect-ui').multiselect({
        includeSelectAllOption: true
    });
});

var viewProjects = function() {
    if (window.location.host === '') {
        window.location.href = '';
    } else if (window.location.host === '') {
        window.location.href = '';
    } else if (window.location.host === '' || window.location.host === '') {
        window.location.href = 'projects';
    } else {
        window.location.href = 'contact.html';
    }
}

var viewSignIn = function(button) {
    if (document.getElementById('signUpBox').style.display === 'none') {
        var newText = document.createTextNode('My Projects');
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        oldProjectX = document.getElementById('questions-box').offsetLeft;
        $('#questions-box').animate({'left': window.innerWidth.toString() + 'px'}, 1000, function() {
            $('#questions-box').css('display', 'none');
            window.scrollTo(0, 0);
        });
        $('#signUpBox').css('display', '');
        $('#signUpBox').css('left', (window.innerWidth * -1).toString() + 'px');
        $('#signUpBox').animate({'left': '0px'}, 1000);
    } else if (document.getElementById('questions-box').style.display === 'none') {
        var newText = document.createTextNode('Sign In');
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        $('#questions-box').css('display', '');
        $('#questions-box').animate({'left': oldProjectX.toString() + 'px'}, 1000);
        $('#signUpBox').animate({'left': (window.innerWidth * -1).toString() + 'px'}, 1000, function() {
            $('#signUpBox').css('display', 'none');
            window.scrollTo(0, 0);
        });
    }
}

var viewAccount = function(button) {
    if (document.getElementById('account-box').style.display === 'none') {
        var newText = document.createTextNode('My Projects');
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        oldProjectX = document.getElementById('questions-box').offsetLeft;
        $('#questions-box').animate({'left': window.innerWidth.toString() + 'px'}, 1000, function() {
            $('#questions-box').css('display', 'none');
            window.scrollTo(0, 0);
        });
        $('#account-box').css('display', '');
        $('#account-box').css('left', (window.innerWidth * -1).toString() + 'px');
        $('#account-box').animate({'left': (window.innerWidth * 0.05).toString() + 'px'}, 1000);
    } else if (document.getElementById('questions-box').style.display === 'none') {
        var newText = document.createTextNode('My Account');
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        $('#questions-box').css('display', '');
        $('#questions-box').animate({'left': oldProjectX.toString() + 'px'}, 1000);
        $('#account-box').animate({'left': (window.innerWidth * -1).toString() + 'px'}, 1000, function() {
            $('#account-box').css('display', 'none');
            window.scrollTo(0, 0);
        });
    }
}

var currentPaymentType;
var currentBilling;
var prepareUpgrade = function(siteId, type, billing) {
    window.location.href = "/upgrade?siteId=" + siteId + "&type=" + type + "&billing=" + billing;
}

var viewUpgrade = function(button, siteId, siteName, siteType) {
    if (document.getElementById('upgrade-box').style.display === 'none') {
        button.onclick = function() {
            viewUpgrade(this, "", "", "");
        }
        
        var siteText = document.createTextNode(siteName);
        if (document.getElementById('siteNameUpgrade').firstChild) {
            document.getElementById('siteNameUpgrade').removeChild(document.getElementById('siteNameUpgrade').firstChild);   
        }
        document.getElementById('siteNameUpgrade').appendChild(siteText);
        
        var typeText = document.createTextNode(siteType);
        if (document.getElementById('siteTypeUpgrade').firstChild) {
            document.getElementById('siteTypeUpgrade').removeChild(document.getElementById('siteTypeUpgrade').firstChild);   
        }
        document.getElementById('siteTypeUpgrade').appendChild(typeText);
        
        var newText = document.createTextNode('My Projects');
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        oldProjectX = document.getElementById('questions-box').offsetLeft;
        $('#questions-box').animate({'left': window.innerWidth.toString() + 'px'}, 1000, function() {
            $('#questions-box').css('display', 'none');
            window.scrollTo(0, 0);
        });
        $('#upgrade-box').css('display', '');
        $('#upgrade-box').css('left', (window.innerWidth * -1).toString() + 'px');
        $('#upgrade-box').animate({'left': (window.innerWidth * 0.05).toString() + 'px'}, 1000);
    } else if (document.getElementById('questions-box').style.display === 'none') {        
        var newText = document.createTextNode('My Account');
        if (signInType === "none") {
            newText = document.createTextNode('Sign In');
            button.onclick = function() {
                viewSignIn(this);
            }
        } else {
            button.onclick = function() {
                viewAccount(this);
            }
        }
        
        button.removeChild(button.firstChild);
        button.appendChild(newText);
        $('#questions-box').css('display', '');
        $('#questions-box').animate({'left': oldProjectX.toString() + 'px'}, 1000);
        $('#upgrade-box').animate({'left': (window.innerWidth * -1).toString() + 'px'}, 1000, function() {
            $('#upgrade-box').css('display', 'none');
            window.scrollTo(0, 0);
        });
    }
}

var hideQuestion = function() {
    var hide = setInterval(function() {
        if (opacity <= 0.1) {
            clearInterval(hide);
            $('#question' + lastIndex.toString()).css('display', 'none');
        } else {
            opacity -= 0.1;
            $('#question' + lastIndex.toString()).css('opacity', opacity.toString());
        }
    }, 50);
}

var showQuestion = function() {
    $('#question' + questionIndex.toString()).css('opacity', opacity.toString());
    $('#question' + questionIndex.toString()).css('display', 'table-cell');
    
    var show = setInterval(function() {
        if (opacity >= 1) {
            if (questionIndex == 0) {
                $('#backButton').css('display', 'none');
            } else {
                $('#backButton').css('display', '');
            }
            clearInterval(show);
        } else {
            opacity += 0.1;
            $('#question' + questionIndex.toString()).css('opacity', opacity.toString());
        }
    }, 50);
}

var nextQuestion = function() {
    if (opacity < 1) {
        return;
    }
    
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex++;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var lastQuestion = function() {
    if (opacity < 1) {
        return;
    }
    
    var tempLastIndex = indicies[indicies.length - 1];
    indicies.splice(-1, 1);
    
    if (tempLastIndex === 2) {
        tempLastIndex = indicies[indicies.length - 1];
        indicies.splice(-1, 1);
    }
    
    lastIndex = questionIndex;
    questionIndex = tempLastIndex;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var listening = "I'm Listening...";
var currentCharacter = 1;
var appendListening = function() {
    var textNode = document.createTextNode(listening.substring(0, currentCharacter));
    var displayElement = document.getElementById('speechDisplay');
    while (displayElement.firstChild) {
        displayElement.removeChild(displayElement.firstChild);
    }
    displayElement.appendChild(textNode);
    currentCharacter++;
    if (currentCharacter <= listening.length) {
        setTimeout(function() {
            appendListening(currentCharacter);
        }, 40);
    } else {
        currentCharacter = 1;
    }
}

//var recognition;
var rec;
var totalSpeech = "";
var globalStream;
var posting = false;
var recorder;
var secondsWaiting = 0;
var beginRecording = function() {
    if (window.event) {
        window.event.preventDefault();
    }
    
    /*if (posting) {
        return;
    } else {
        posting = true;
    }
    
    document.getElementById('speechDisplay').style.height = document.getElementById('speechDisplay').offsetHeight.toString() + 'px';
    document.getElementById('speechDisplay').style.lineHeight = document.getElementById('speechDisplay').offsetHeight.toString() + 'px';
    appendListening();
    
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        talking = true;
        globalStream = stream;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const aCtx = new AudioContext();
        const streamSource = aCtx.createMediaStreamSource(stream);
        rec = new Recorder(streamSource);
        rec.config.mimeType = 'audio/flac';
        rec.config.numChannels = 1;
        rec.record();
    });*/
    
    window.URL = window.URL || window.webkitURL;
    /** 
     * Detecte the correct AudioContext for the browser 
     * */
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    if (!window.AudioContext) {
        swal(localize('Uh Oh!'), localize('Your browser does not support speech to text at this time. Try downloading the free mobile app instead!'), 'error');
        return;
    }
    
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    if (!navigator.getUserMedia) {
        swal(localize('Uh Oh!'), localize('Your browser does not support speech to text at this time. Try downloading the free mobile app instead!'), 'error');
        return;
    }
    
    secondsWaiting = 0;
    var wTimer = setInterval(function() {
        secondsWaiting += 10;
        if (secondsWaiting >= 1500) {
            clearInterval(wTimer);
        }
    }, 10);
    
    recorder = new RecordVoiceAudios();
    recorder.startRecord();
}

var recordIteration = function(file) {
    //rec.exportWAV((blob) => {
        var formData = new FormData();
        /*if (blob) {
            var recording = new Blob([blob], { type: "audio/wav" });
            formData.append("recording", recording);
        }*/
        formData.append('recording', file, 'temponame.mp3');
        
        if (window.location.origin !== 'https://wpai.com' && window.location.origin !== 'https://dev.wpai.com') {
            document.getElementsByClassName('swal-overlay')[0].click();
            appendSpinner();
        } else {
            document.getElementById('backButton').style.display = 'none';
            document.getElementById('backButton').style.top = '-1000px';
        }
  
        $.ajax({
            url :  "/php/audio.php",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                posting = false;
                try {
                    var obj = JSON.parse(data);
                    var newText = obj.results[0].alternatives[0].transcript;
                    if (totalSpeech === "") {
                        totalSpeech = newText.charAt(0).toUpperCase() + newText.slice(1);
                    } else {
                        totalSpeech = totalSpeech + " " + newText;
                    }
            
                    if (window.location.origin === "https://wpai.com" || window.location.origin === "https://dev.wpai.com") {
                        document.getElementById('speechDisplay').style.height = '';
                        document.getElementById('speechDisplay').style.lineHeight = '';
                        answer.phrase = totalSpeech;
                        totalSpeech = "";
                        currentCharacter = 1;
                        lastIndex = questionIndex;
                        indicies.push(lastIndex);
                        
                        if (answer.phrase.length > 0) {
                            questionIndex += 2;
                        } else {
                            questionIndex += 3;
                        }
                        
                        hideQuestion();
                        setTimeout(function() {
                            showQuestion();
                        }, 600);
                    } else {
                        removeSpinner();
                        directUserProperly(obj.direction.intent, obj.direction.message);
                    }
                } catch (err) {
                    console.log(err);
                    if (window.location.origin === "https://wpai.com" || window.location.origin === "https://dev.wpai.com") {
                        nextQuestion();
                        document.getElementById('speechDisplay').style.lineHeight = '';
                        swal(localize('Uh Oh!'), localize('There seems to be an issue with speech recognition at the moment. Please use the keyword box to describe your site.'), 'error');
                    } else {
                        removeSpinner();
                        swal(localize('Uh Oh!'), localize('There seems to be an issue with speech recognition at the moment. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.'), 'error');
                    }
                }
                
                if (window.location.origin === "https://wpai.com" || window.location.origin === "https://dev.wpai.com") {
                    setTimeout(function() {
                        var textNode = document.createTextNode(localize("Please press and hold down the icon below while you describe the website that you want."));
                        var displayElement = document.getElementById('speechDisplay');
                    
                        while (displayElement.firstChild) {
                            displayElement.removeChild(displayElement.firstChild);
                        }
                    
                        displayElement.style.height = '';
                        displayElement.appendChild(textNode);
                        document.getElementById('backButton').style.display = '';
                        document.getElementById('backButton').style.top = '';
                    }, 600);
                }
            },    
            error: function(err) {
                console.log(err);
                posting = false;
                if (window.location.origin === "https://wpai.com" || window.location.origin === "https://dev.wpai.com") {
                    nextQuestion();
                    document.getElementById('speechDisplay').style.lineHeight = '';
                    swal(localize('Uh Oh!'), localize('There seems to be an issue with speech recognition at the moment. Please use the keyword box to describe your site.'), 'error');
                } else {
                    removeSpinner();
                    swal(localize('Uh Oh!'), localize('There seems to be an issue with speech recognition at the moment. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.'), 'error');
                }
            }
        });
    //});
}

var endRecording = function() {
    recorder.stopRecord();
    /*if (rec) {
        nextQuestion();
        setTimeout(function() {
            recordIteration();
        }, 600);
    }*/
}

var skipTalking = function() {
    if (opacity < 1) {
        return;
    }
    
    answer.phrase = '';
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += 2;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var shouldImprovise = function(type) {
    if (type) {
        lastIndex = questionIndex;
        indicies.push(lastIndex);
        questionIndex += 4;
        hideQuestion();
        setTimeout(function() {
            showQuestion();
        }, 600);
    } else {
        nextQuestion();
    }
}

var sld = 'site.live';

var inferAndSubmit = function() {
    answer.answeredFirst = false;
    answer.answeredSecond = false;
    answer.features = ["about", "features", "gallery", "testimonials", "team", "contact"];
    
    if (answer.keywords.length > 0) {
        answer.domain = answer.keywords.split(",")[0].replace(/\W+/g, "").toLowerCase() + "." + sld;
    } else if (answer.phrase.length > 0) {
        answer.domain = answer.phrase.split(" ")[0].replace(/\W+/g, "").toLowerCase() + "." + sld;
    }
    
    if (opacity < 1) {
        return;
    }
    
    var skipNum = 0;
    var stNum = 4;
    
    if (window.location.href.includes("skip=")) {
        stNum = 1;
    }
    
    for (var i = stNum; i < document.getElementsByClassName('question').length; i++) {
        if (document.getElementsByClassName('question')[i].getAttribute('name') === 'lastQ') {
            break;
        } else {
            skipNum++;
        }
    }
    
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += skipNum;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
    
    analytics.track("User Clicks to Answer More Questions or Create Website", {
        'cta-name': 'Just Build My Site',
        'scope': 'Questionnaire Start'
    });
}

var continueQuestions = function() {
    nextQuestion();
    analytics.track("User Clicks to Answer More Questions or Create Website", {
        'cta-name': 'Ask Me Questions',
        'scope': 'Questionnaire Start'
    });
}

var platformType = function(platform) {
    answer.type = platform;
    nextQuestion();
}

var keywordsChosen = function() {
    answer.keywords = document.getElementById('keywords').value;
    if (answer.keywords.length > 0) {
        nextQuestion();
    } else {
        if (opacity < 1) {
            return;
        }
        
        lastIndex = questionIndex;
        indicies.push(lastIndex);
        questionIndex += 2;
        hideQuestion();
        setTimeout(function() {
            showQuestion();
        }, 600);
    }
}

var platformName = function() {
    answer.answeredFirst = true;
    answer.name = document.getElementById('platformName').value;
    document.getElementById('domainName').value = answer.name.replace(/\W+/g, "").toLowerCase();
    nextQuestion();
}

var sloganChosen = function() {
    answer.slogan = document.getElementById('slogan').value;
    nextQuestion();
}

var domainName = function() {
    answer.domain = document.getElementById('domainName').value + '.' + sld;
    nextQuestion();
}

var userYes = function() {
    answer.users = true;
    nextQuestion();
}

var userNo = function() {
    if (opacity < 1) {
        return;
    }
    
    lastIndex = questionIndex;
    questionIndex += 3;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var checkedUserItems = function() {
    nextQuestion();
}

var checkedAfterUserItems = function() {
    nextQuestion();
}

var store = function(type) {
    answer.hasStore = type;
    nextQuestion();
}

var checkedProductItems = function() {
    nextQuestion();
}

var checkedServiceItems = function() {
    nextQuestion();
}

var checkedFeatureItems = function() {
    nextQuestion();
}

var finishLogoUpload = function() {
    answer.logo = document.getElementById('logoFile').value;
    nextQuestion();
}

var finishPhotosUpload = function() {
    answer.photos = document.getElementById('photoFile').value;
    nextQuestion();
}

var chooseColor = function(type) {
    if (type) {
        nextQuestion();
    } else {
        answer.colors = [];
        
        if (opacity < 1) {
            return;
        }
    
        lastIndex = questionIndex;
        indicies.push(lastIndex);
        questionIndex += 2;
        hideQuestion();
        setTimeout(function() {
            showQuestion();
        }, 600);
    }
}

var choseColors = function() {
    answer.colors = [];
    var buttons = document.getElementsByClassName('jscolor');
    for (var i = 0; i < buttons.length; i++) {
        answer.colors.push(buttons[i].style.backgroundColor);
    }
    
    nextQuestion();
}

var setSearchURL = function() {
    answer.search = document.getElementById('searchField').value;
    nextQuestion();
}

var noSearchURL = function() {
    answer.search = '';
    nextQuestion();
}

var skipWhatsApp = function() {
    answer.phone = '';
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += 2;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var setWhatsApp = function() {
    answer.phone = document.getElementById('whatsAppNumber').value;
    nextQuestion();
}

var completeSite = function() {
    if (opacity < 1) {
        return;
    }
    
    answer.answeredFirst = true;
    answer.answeredSecond = false;
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += 11;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var getStarted = function() {
    if (opacity < 1) {
        return;
    }
    
    answer.answeredFirst = true;
    answer.answeredSecond = false;
    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += 3;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
    
    analytics.track("User Clicks to Start Creating a Website", {
        'cta-name': 'Get Started',
        'scope': 'Home'
    });
}

var designType = function(type) {
    answer.answeredSecond = true;
    answer.designType = type;
    var nextChange = 10;
    if (answer.features.indexOf('about') !== -1) {
        nextQuestion();
        return
    } else if (answer.features.indexOf('features') !== -1) {
        nextChange = 2;
    } else if (answer.features.indexOf('gallery') !== -1) {
        nextChange = 3;
    } else if (answer.features.indexOf('testimonials') !== -1) {
        nextChange = 4;
    } else if (answer.features.indexOf('team') !== -1) {
        nextChange = 6;
    } else if (answer.features.indexOf('contact') !== -1) {
        nextChange = 8;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var aboutImage = function(type) {
    answer.aboutImage = type;
    var nextChange = 9;
    if (answer.features.indexOf('features') !== -1) {
        nextQuestion();
        return;
    } else if (answer.features.indexOf('gallery') !== -1) {
        nextChange = 2;
    } else if (answer.features.indexOf('testimonials') !== -1) {
        nextChange = 3;
    } else if (answer.features.indexOf('team') !== -1) {
        nextChange = 5;
    } else if (answer.features.indexOf('contact') !== -1) {
        nextChange = 7;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var checkedNumFeatures = function() {
    var nextChange = 8;
    if (answer.features.indexOf('gallery') !== -1) {
        nextQuestion();
        return;
    } else if (answer.features.indexOf('testimonials') !== -1) {
        nextChange = 2;
    } else if (answer.features.indexOf('team') !== -1) {
        nextChange = 4;
    } else if (answer.features.indexOf('contact') !== -1) {
        nextChange = 6;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var checkedNumImages = function() {
    var nextChange = 7;
    if (answer.features.indexOf('testimonials') !== -1) {
        nextQuestion();
        return;
    } else if (answer.features.indexOf('team') !== -1) {
        nextChange = 3;
    } else if (answer.features.indexOf('contact') !== -1) {
        nextChange = 5;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var testimonialImage = function(type) {
    answer.testimonialImage = type;
    var nextChange = 5;
    if (answer.features.indexOf('team') !== -1) {
        nextQuestion();
        return;
    } else if (answer.features.indexOf('contact') !== -1) {
        nextChange = 3;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var teamSocial = function(type) {
    answer.teamSocial = type;
    var nextChange = 3;
    if (answer.features.indexOf('contact') !== -1) {
        nextQuestion();
        return;
    }
    
    if (opacity < 1) {
        return;
    }

    lastIndex = questionIndex;
    indicies.push(lastIndex);
    questionIndex += nextChange;
    hideQuestion();
    setTimeout(function() {
        showQuestion();
    }, 600);
}

var contactForm = function(type) {
    answer.contactForm = type;
    if (type) {
        nextQuestion();
    } else {
        if (opacity < 1) {
            return;
        }
    
        lastIndex = questionIndex;
        indicies.push(lastIndex);
        questionIndex += 2;
        hideQuestion();
        setTimeout(function() {
            showQuestion();
        }, 600);
    }
}

var alterFeatures = function(name, type) {
    if (type && answer.features.indexOf(name) === -1) {
        answer.features.push(name);
    } else if (!type && answer.features.indexOf(name) !== -1) {
        for (var i = 0; i < answer.features.length; i++) {
            if (answer.features[i] === name) {
                answer.features.splice(i, 1);
                break;
            }
        }
    }
    
    nextQuestion();
}

var canFinish = true;
// var recaptchaCallback = function() {
   // canFinish = true;
//}

var finish = function() {
    if (!canFinish) {
        return;
    } 
    
    nextQuestion();
   // answer.captcha = grecaptcha.getResponse();
    document.getElementById('backButton').style.display = 'none';
    document.getElementById('backButton').style.top = '-1000px';
    
    setTimeout(function() {
        postTheFinish();
    }, 600);
}

var postTheFinish = function() {
    if (document.getElementById('contactEmail').value.length > 5) {
        answer.email = document.getElementById('contactEmail').value
    }
    
    $.ajax({
        url: 'php/build.php',
        type: 'POST',
        timeout: 120000,
        data: {'data': JSON.stringify(answer)},
        success: function(data) {
            if (data.length > 70 && data.split('token').length !== 2) {
                swal(localize('Uh Oh!'), data, 'error');
                if (data === localize("It appears that you have not checked the reCaptcha item in the form. Please ensure that you have done so, then try again.")) {
                    lastQuestion();
                } else {
                    returnToListening();
                }

                return;
            } else {
                platformId = data;
                setTimeout(function() {
                    nextQuestion();
                }, 600);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus === 'timeout') {
                swal('Request Timeout', 'The request timed out, so we are resending your data. Hang tight for another few seconds!', 'error');
                postTheFinish();
            }
        }
    });
}

var returnToListening = function() {
    indicies = [0];
    
    lastIndex = questionIndex;
    questionIndex = 1;
    hideQuestion();
    setTimeout(function() {
        document.getElementById('backButton').style.display = '';
        document.getElementById('backButton').style.top = '';
        showQuestion();
    }, 600);
}

var viewPlatform = function() {
    var url = '' + platformId;
    
    if (platformId.split('token').length === 2) {
        url = '' + platformId.split('token=')[1];
    }
    
    gtag_report_conversion(url);
    analytics.track("User Clicks to View Recently Created Website", {
        'cta-name': 'View It',
        'scope': 'Website Created'
    });
    //window.location.href = 'https://wpai.com/edit?domain=' + platformId;
}

function RecordVoiceAudios() {
    let arrayAudio = [];
    let encoder = null;
    let microphone;
    let isRecording = false;
    var audioContext;
    let processor;
    let config = {
        bufferLen: 4096,
        numChannels: 2,
        mimeType: 'audio/mpeg'
    };

    this.startRecord = function() {
        audioContext = new AudioContext();
        /** 
        * Create a ScriptProcessorNode with a bufferSize of 
        * 4096 and two input and output channel 
        * */
        if (audioContext.createJavaScriptNode) {
            processor = audioContext.createJavaScriptNode(config.bufferLen, config.numChannels, config.numChannels);
        } else if (audioContext.createScriptProcessor) {
            processor = audioContext.createScriptProcessor(config.bufferLen, config.numChannels, config.numChannels);
        } else {
            console.log('WebAudio API has no support on this browser.');
        }

        processor.connect(audioContext.destination);
        /**
        *  ask permission of the user for use microphone or camera  
        * */
        if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(gotStreamMethod)
            .catch(logError);
        } else {
            if (window.location.origin === "" || window.location.origin === "") {
                if (opacity < 1) {
                    return;
                }
            
                lastIndex = questionIndex;
                indicies.push(lastIndex);
                questionIndex += 2;
                hideQuestion();
                setTimeout(function() {
                    showQuestion();
                }, 600);
                
                swal(localize('Uh Oh!'), localize('Your browser doesn\'t seem to support speech recognition. Please use the keyword box to describe your site.'), 'error');
            } else {
                removeSpinner();
                swal(localize('Uh Oh!'), localize('Your browser doesn\'t seem to support speech recognition. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.'), 'error');
            }
        }
    };

    let getBuffers = (event) => {
        var buffers = [];
        for (var ch = 0; ch < 2; ++ch)
            buffers[ch] = event.inputBuffer.getChannelData(ch);
        return buffers;
    }

    let gotStreamMethod = (stream) => {
        if (secondsWaiting >= 1500) {
            return;
        } else {
            secondsWaiting = 1500;
        }
        
        if (window.location.origin === "" || window.location.origin === "") {
            document.getElementById('speechDisplay').style.height = document.getElementById('speechDisplay').offsetHeight.toString() + 'px';
            document.getElementById('speechDisplay').style.lineHeight = document.getElementById('speechDisplay').offsetHeight.toString() + 'px';
            appendListening();
        } else {
            document.getElementsByClassName('swal-text')[0].style.height = document.getElementsByClassName('swal-text')[0].offsetHeight.toString() + 'px';
            appendSwalListening();
        }
        
        config = {
            bufferLen: 4096,
            numChannels: 2,
            mimeType: 'audio/mpeg'
        };
        isRecording = true;

        let tracks = stream.getTracks();
        /** 
        * Create a MediaStreamAudioSourceNode for the microphone 
        * */
        microphone = audioContext.createMediaStreamSource(stream);
        /** 
        * connect the AudioBufferSourceNode to the gainNode 
        * */
        microphone.connect(processor);
        encoder = new Mp3LameEncoder(audioContext.sampleRate, 160);
        /** 
        * Give the node a function to process audio events 
        */
        processor.onaudioprocess = function(event) {
            encoder.encode(getBuffers(event));
        };

        stopBtnRecord = () => {
            if (isRecording) {
                isRecording = false;
                audioContext.close();
                processor.disconnect();
                tracks.forEach(track => track.stop());
                let mp3File = encoder.finish();
                
                if (window.orientation !== undefined) {
                    lastIndex = questionIndex;
                    indicies.push(lastIndex);
                    questionIndex++;
                    hideQuestion();
                    setTimeout(function() {
                        showQuestion();
                    }, 1000);
                    
                    setTimeout(function() {
                        recordIteration(mp3File);
                    }, 1100);   
                } else {
                    nextQuestion();
                    setTimeout(function() {
                        recordIteration(mp3File);
                    }, 700);  
                }
            }
        };
    }

    this.stopRecord = function() {
        stopBtnRecord();
    };

    let logError = (error) => {
        console.log(error);
        if (window.location.origin === "" || window.location.origin === "") {
            if (opacity < 1) {
                return;
            }
        
            lastIndex = questionIndex;
            indicies.push(lastIndex);
            questionIndex += 2;
            hideQuestion();
            setTimeout(function() {
                showQuestion();
            }, 600);
            
            swal(localize('Uh Oh!'), localize('Your browser doesn\'t seem to support speech recognition. Please use the keyword box to describe your site.'), 'error');
        } else {
            removeSpinner();
            swal(localize('Uh Oh!'), localize('Your browser doesn\'t seem to support speech recognition. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.'), 'error');
        }
    }
}

var viewFaqs = function() {
    document.getElementById('faqSection').style.display = 'block';
    document.getElementById('faqSection').style.opacity = '0';
    document.getElementById('faqSection').style.top = ((window.innerHeight - document.getElementById('faqSection').offsetHeight) / 2).toString() + 'px';
    
    setTimeout(function() {
        $("#faqSection").animate({
            opacity: '1'
       }, 800);
    }, 400);
    
    $("#aboutMain").animate({
         opacity: '0'
    }, 800, function() {
        document.getElementById('aboutMain').style.display = 'none';
    });
    
    if (!loadedFaqs) {
        loadFaqs();
    } else {
        showFaqSearch();
    }
}

var viewTestimonials = function() {
    document.getElementById('testimonialsSection').style.display = 'block';
    document.getElementById('testimonialsSection').style.opacity = '0';
    
    if (window.orientation !== undefined) {
        document.getElementById('myCarousel').removeAttribute('data-ride');
        document.getElementById('myCarousel').className = 'carousel';
        document.getElementById('carouselControl').className = '';
        document.getElementById('testimonialsSection').style.top = '0px';
        document.getElementById('testimonialsSection').style.paddingTop = '160px';
        document.getElementById('testimonialsSection').style.height = window.innerHeight.toString() + 'px';
        document.getElementById('testimonialsSection').style.overflowY = 'scroll';
        
        var items = document.getElementsByClassName('testimonial');
        for (var i = 1; i < items.length; i++) {
            var item = items[i];
            item.parentElement.removeChild(item);
            document.getElementById('firstMediaBody').appendChild(item);
        }
        
       document.getElementById('carouselIndicators').style.display = 'none'; document.getElementById('secondMediaRow').parentElement.removeChild(document.getElementById('secondMediaRow'));
    } else {
        var height = document.getElementById('testimonialHeader').offsetHeight + 150 + document.getElementsByClassName('item carousel-item active')[0].offsetHeight;

        document.getElementById('testimonialsSection').style.height = height.toString() + 'px';
        document.getElementById('testimonialsSection').style.top = ((window.innerHeight - document.getElementById('testimonialsSection').offsetHeight) / 2).toString() + 'px';
    }
    
    setTimeout(function() {
        $("#testimonialsSection").animate({
            opacity: '1'
       }, 800);
    }, 400);
    
    $("#aboutMain").animate({
         opacity: '0'
    }, 800, function() {
        document.getElementById('aboutMain').style.display = 'none';
    });
}

var loadedFaqs = false;
var loadFaqs = function() {
    $.ajax({
        url: '../faq.txt',
        type: 'GET',
        success: function(data) {
            parseAnswers(data);
        },
        error: function(err) {
            swal(localize('Uh Oh!'), localize('There was an error loading the FAQ section. Please refresh the page and try again.'), 'error');
        }
    });
}

var qs = [];
var as = [];
var parseAnswers = function(fileString) {
    var groups = fileString.split("\n--\n");
    for (var i = 0; i < groups.length; i++) {
        var questions = groups[i].split("\n\n");
        for (var j = 0; j < questions.length; j++) {
            var question = questions[j].split("\n")[0];
            var answer = questions[j].split("\n")[1];
            qs.push(question);
            as.push(answer);
        }
    }
    
    showFaqSearch();
}

var showFaqSearch = function() {
    document.getElementById('faqSearch').style.display = 'block';
    document.getElementById('faqSearch').style.opacity = '0';
    document.getElementById('faqImage').style.display = 'none';
    document.getElementById('faqSection').style.top = '20px';
    document.getElementById('faqSection').style.height = (window.innerHeight - 20).toString() + 'px';
    document.getElementById('faqResults').style.height = (window.innerHeight - document.getElementById('faqInput').offsetTop - document.getElementById('faqInput').offsetHeight).toString() + 'px';
    
    for (var i = 0; i < qs.length; i++) {
        var div = document.createElement('div');
        var h3 = document.createElement('h3');
        var txt = document.createTextNode(qs[i]);
        
        div.className = 'faqDiv';
        h3.setAttribute('name', i.toString());
        h3.appendChild(txt);
        
        h3.onclick = function() {
            swal(this.innerHTML, as[parseInt(this.getAttribute('name'))], 'info');
        }
        
        div.appendChild(h3);
        document.getElementById('faqResults').appendChild(div);
    }
    
    document.getElementById('faqResults').style.paddingBottom = '300px';
    
    $("#faqSearch").animate({
        opacity: '1'
    }, 800);
}

var filterFaq = function(input) {
    while (document.getElementById('faqResults').firstChild) {
        document.getElementById('faqResults').removeChild(document.getElementById('faqResults').firstChild);
    }
    
    var phraseWords = input.value.toLowerCase().replace("?", " ").replace(",", " ").replace("website", "site").replace(".", " ").replace("  ", " ").split(" ");
    var responses = [];
    
    for (var i = 0; i < qs.length; i++) {
        var score = 0;
        var qString = qs[i].toLowerCase().replace("?", " ").replace(",", " ").replace("website", "site").replace(".", " ").replace("  ", " ");
        var aString = as[i].toLowerCase().replace("?", " ").replace(",", " ").replace("website", "site").replace(".", " ").replace("  ", " ");
        var q = qString.split(" ");
        var a = aString.split(" ");
        
        for (var k = 0; k < phraseWords.length; k++) {
            var word = phraseWords[k];
                
            for (var j = 0; j < q.length; j++) {
                if (q[j] === word) {
                    score += 5;
                    break;
                } else if (q[j].indexOf(word) !== -1) {
                    score += 4;
                    break;
                }
            }
            
            for (var j = 0; j < a.length; j++) {
                if (a[j] === word) {
                    score += 4;
                    break;
                } else if (a[j].indexOf(word) !== -1) {
                    score += 3;
                    break;
                }
            }
        }
        
        if (score < 5 && input.value !== '') {
            continue;
        } else {
            responses.push({
                idx: i,
                score: score
            });
        }
    }
    
    responses.sort(compare);
    
    for (var i = 0; i < responses.length; i++) {
        var div = document.createElement('div');
        var h3 = document.createElement('h3');
        var txt = document.createTextNode(qs[responses[i].idx]);
        
        div.className = 'faqDiv';
        h3.setAttribute('name', i.toString());
        h3.appendChild(txt);
        
        h3.onclick = function() {
            swal(this.innerHTML, as[responses[parseInt(this.getAttribute('name'))].idx], 'info');
        }
        
        div.appendChild(h3);
        document.getElementById('faqResults').appendChild(div);
    }
    
    if (document.getElementById('faqResults').children.length === 0) {
        var div = document.createElement('div');
        var h3 = document.createElement('h3');
        var txt = document.createTextNode(localize("Don't see an answer to your quesiton? Contact us!"));
        
        div.className = 'faqDiv';
        h3.appendChild(txt);
        
        h3.onclick = function() {
            document.getElementById('contactUsButton').click();
        }
        
        div.appendChild(h3);
        document.getElementById('faqResults').appendChild(div);
    }
}

function compare(a, b) {
    if (a.score < b.score)
        return 1;
    if (a.score > b.score)
        return -1;
    return 0;
}

var returnFromFaq = function() {
    document.getElementById('aboutMain').style.display = 'block';
    document.getElementById('aboutMain').style.opacity = '0';
    document.getElementById('aboutMain').style.top = ((window.innerHeight - document.getElementById('aboutMain').offsetHeight) / 2).toString() + 'px';
    
    setTimeout(function() {
        $("#aboutMain").animate({
            opacity: '1'
       }, 800);
    }, 400);
    
    $("#faqSection").animate({
         opacity: '0'
    }, 800, function() {
        document.getElementById('faqSection').style.display = 'none';
    });
}

var returnFromTestimonials = function() {
    document.getElementById('aboutMain').style.display = 'block';
    document.getElementById('aboutMain').style.opacity = '0';
    document.getElementById('aboutMain').style.top = ((window.innerHeight - document.getElementById('aboutMain').offsetHeight) / 2).toString() + 'px';
    
    setTimeout(function() {
        $("#aboutMain").animate({
            opacity: '1'
       }, 800);
    }, 400);
    
    $("#testimonialsSection").animate({
         opacity: '0'
    }, 800, function() {
        document.getElementById('testimonialsSection').style.display = 'none';
    });
}

var learnMore = function() {
    window.location.href = 'https://wpaierc.com/';
}

var getStartedAgain = function() {
    document.getElementById('questions-box').style.opacity = '1';
    
    $('html, body').animate({
        scrollTop: 0
    }, 1000, function() {
        document.body.style.height = window.innerHeight.toString() + 'px';
        document.getElementById('aboutBox').style.display = 'none';
    });
    
    $("#aboutBox").animate({
         top: window.innerHeight.toString() + 'px'
    }, 1000);
}
